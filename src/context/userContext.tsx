import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { AccountContext } from './AccountContext';
import { SubscriptionContext } from '@/context/subscriptionContext';
import { 
  vehicleDataProps, 
  vehicleCalcultedDataProps, 
  UserContextProps, 
  temperatureDataProps
} from '@/utils/props';
// import { useRouter } from 'next/router';
// import useSWR from 'swr'
import { toast } from 'react-toastify'; 
import { current } from '@reduxjs/toolkit';

const AppContext = createContext({} as UserContextProps);

const AppProvider = ({ children }:any) => {
  // const router = useRouter();
  const { getSession, setIsAuthenticated, IdToken, user } = useContext(AccountContext);
  const { getSubscriptionDetails } = useContext(SubscriptionContext);

  const [userId, setUserId] = useState<string|null>(user);
  const [name, setName] = useState<string>('');
  const [userOwnerType, setOwnerType] = useState<string>("");
  const [userCity, setUserCity] = useState<string>("");
  const [userState, setUserState] = useState<string>("");
  const [userCountry, setUserCountry] = useState<string>("");
  const [userLocation, setUserLocation] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("")
  const [userEmail,setUserEmail] = useState<string>("")
  const [unit, setUnit] = useState<string>('Km')

  const [vehicleData, setVehicleData] = useState<vehicleDataProps[]>([]);
  const [vehicleCalcultedData,setVehicleCalcultedData] = useState<Record<string,vehicleCalcultedDataProps>>()
  const [vehicleIdData, setVehicleIdData] = useState<vehicleDataProps>()
  const [vehicleCalcultedIdData,setVehicleCalcultedIdData] = useState<vehicleCalcultedDataProps>()
  const [isLoading, setIsLoading] = useState(true)
  const [isImageLoading, setIsImageLoading] = useState(true)  
  const [webSocket, setWebSocket] = useState<WebSocket|null>(null);
  const [temperatureData, setTemperatureData] = useState<temperatureDataProps>({
    minTemperature: null,
    maxTemperature: null,
  })

  // Hook for fetching user details from the DB
  useEffect(() => {
    fetchUserDetails();
  }, [userId]);
    
  // Function for getting the temperature data from the DB
  useEffect(()=>{
    getTemperatureData()
  },[userLocation])

  //Hook for fetching user image on any userId change. 
  useEffect(() => {
    if(userId){
      fetchUserImage()
    }
  },[userId])

  /*
    Sets a new a websocket when the component renders
  */
  useEffect(() => {
    if (userId) {
      SettingWebsocket();
    }
  }, [userId,IdToken]);
  
  useEffect(() => {
    if(userId){
      console.log("userId: "+userId)
      console.log(vehicleData)
    } 
  }, [userId])
  
  // Hook for fetching the user details
  const fetchUserDetails =  async () => {
    try {
      if(user !== null){
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/users/${user}`,{
          headers: {
            authorization:`Bearer ${IdToken}`
          }
        });  
        await getSubscriptionDetails(response.data.email)
        setName(response.data.name)
        setOwnerType(response.data.owner_type)
        setUserCity(response.data.city)
        setUserState(response.data.state)
        setUserCountry(response.data.country)
        setUserLocation(`${
          response.data.state === "" ? response.data.country
          :response.data.city === "" ? response.data.state + ", " + response.data.country 
          :response.data.city + ", " + response.data.country
        }`)
        setUserEmail(response.data.email)
        if(userId){
          setVehicleData(response.data.vehicles)
          setVehicleCalcultedData(response.data.vehicles_processed_data)
          // Setting vehicleIdData and vehicleCalcultedIdData as the first vehicle in the list
          // setVehicleIdData(response.data.vehicles[0])
          // setVehicleCalcultedIdData(response.data.vehicles_processed_data[response.data.vehicles[0].id])
        }
        setIsLoading(false)
      }
      else{
        const session:any = await getSession();
        const userid = session.idToken.payload.sub;
        setUserId(userid); 
        console.log('user is null.')
      }
    } 
    catch (error) {
      console.log('Error, no user (userContext):', error);
      setIsAuthenticated(false);
    }
  };

  /*
    Sets a new websocket with the user-credentials 
    returns the new socket
  */
  const SettingWebsocket = async () => {
    if(IdToken){
      try{
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/websocket/generate-token`,{
          headers: {
            authorization: `Bearer ${IdToken}`
          }
        })
        .then((response)=>{
          console.log(response.data)
          let socket = new WebSocket(`wss://ffyvn54l83.execute-api.ap-south-1.amazonaws.com/production?token=${response.data.uniqueToken}`);
          setWebSocket(socket)
    
          socket.onopen = (event) => {
            console.log('Websocket connection established with userId: '+userId+"\n"+event);
          };
      
          socket.onmessage = (event) => {
            const SocketData = JSON.parse(event.data);
            
            // Handle data from the server, including the 'updatedData' field, as needed
            console.log('Received data from the server: \n'+ JSON.stringify(SocketData) 
            +"eventName: \n"+SocketData.eventName+"\n"
            // +"SoH: "+SocketData.updatedData.vehicles_processed_data[vehicleData[0]?.id]?.
            )
      
            setName(SocketData.updatedData.name)
            setUserCountry(SocketData.updatedData.country)
            setOwnerType(SocketData.updatedData.owner_type)
            setUserEmail(SocketData.updatedData.email)
            setUserCity(SocketData.updatedData.city ? SocketData.updatedData.city : "")
            setUserState(SocketData.updatedData.state ? SocketData.updatedData.state : "")
            setVehicleData(SocketData.updatedData.vehicles)
            setVehicleCalcultedData(SocketData.updatedData.vehicles_processed_data)
          };
      
          socket.onerror = async (event:any) => {
            console.error('WebSocket Error:', event);
            
            if(!userId){
              socket.close();
            }
            else {
              switch (event.code){
                case 1000:
                  console.log('error code 1000.')
                break;
                case 1006:
                  await getSession()
                  socket.close()
                  // window.location.reload()
                  console.log('error code 1006.')
                break;
              }
            }
          };
      
          socket.onclose = async (event) => {
            console.log('Websocket connection closed with userId and event: ' + userId, event);

            // You can also handle different close codes and reasons.
            console.log('Trying to reconnect to the websocket')
            if(userId){
              console.log('userId present'+ userId)
              // await UpdateIdToken()
              // window.location.reload()
              setWebSocket(null)
              setTimeout(SettingWebsocket, 5000)
            }
            else{
              setWebSocket(null)
            }
          };
        })
        .catch((error)=>{
          UpdateIdToken();
          console.log("Websocket Error"+error+"\n"+"error_message: "+error.message);
          setWebSocket(null)
          setTimeout(SettingWebsocket, 5000)
          console.log("error.response: " + error.response)
          if(error.response.status === 403){
            console.log('Token expired, refreshing')
            window.location.reload()
          }
        })
      }
      catch(error){
        console.log('In the outer catch websocket error.')
      }
    }
    else{
      setUserId('')
      console.log('No auth token found.')
      // toast.error('Please login again.')
      return 
    }
  };  

  const UpdateIdToken = async () => {
    const session:any = await getSession()
    // const oldToken = localStorage.getItem(`CognitoIdentityServiceProvider.75uahg9l9i6r2u6ikt46gu0qfk.${userId}.idToken`) 
    // if(session.idToken.jwtToken === oldToken){
    //   console.log("Token similar: "+session.idToken.jwtToken === oldToken)
    // }
    // else{
    // setIdToken(session.idToken.jwtToken)
    // }
    localStorage.setItem(`CognitoIdentityServiceProvider.75uahg9l9i6r2u6ikt46gu0qfk.${userId}.accessToken`,session.getAccessToken().getJwtToken());
    localStorage.setItem(`CognitoIdentityServiceProvider.75uahg9l9i6r2u6ikt46gu0qfk.${userId}.refreshToken`,session.getRefreshToken().getToken());
    localStorage.setItem(`CognitoIdentityServiceProvider.75uahg9l9i6r2u6ikt46gu0qfk.${userId}.idToken`,session.getIdToken().getJwtToken())
  }

  /* 
    Sets the temperature according to the useLocation 
    and updates it everyday.
  */
  const getTemperatureData = async () => {
    const storedDate = localStorage.getItem('tempCollectedDate');
    const currentDate = new Date()
    if(userId && userLocation){
      console.log("storedDate:", storedDate);
      if(storedDate){
        const savedDate = new Date(storedDate)
        console.log("savedDate:", savedDate);
        console.log("currentDate:", currentDate);
        if (!savedDate || (savedDate.getDate() < currentDate.getDate() || savedDate.getMonth() < currentDate.getMonth())) {
          console.log({
            Message:"Temperature data not found in local storage. Fetching from server.",
            Stored_Date:storedDate,
            Saved_Date:savedDate,
          })
          // Fetch data from server
          let config = {
            method: 'post',
            url:  `${process.env.NEXT_PUBLIC_SERVER_ROUTE}/user-data/get-temperature`,
            headers: { 
              authorization:`Bearer ${IdToken}`
              // "Content-Type": "application/json"
            },
            data :{
              "userLocation": userState === "" ? userCountry
              :userCity === "" ? userState + ", " + userCountry
              :userCity + ", "+ userState +", " + userCountry
            }
          };
          axios.request(config)
          .then((res)=>{
            const data = {
              minTemperature: res.data.minTemperature,
              maxTemperature: res.data.maxTemperature,
            }
            console.log(data)
            setTemperatureData(data);
            localStorage.setItem('temperatureData', JSON.stringify(data));
            localStorage.setItem('tempCollectedDate', currentDate.toISOString());
          })
          .catch((err)=>{
            console.log("Error in getTemperatureData:"+err)
          })
        } else {
          // Fetch data from local storage
          const storedData  = localStorage.getItem('temperatureData');
          if(storedData){
            setTemperatureData(JSON.parse(storedData));
          }
          else{
            console.log('No temperature data found in local storage.')
            return
          }
        }
      }
      else {
        let config = {
          method: 'post',
          url:  `${process.env.NEXT_PUBLIC_SERVER_ROUTE}/user-data/get-temperature`,
          headers: { 
            authorization:`Bearer ${IdToken}`
            // "Content-Type": "application/json"
          },
          data :{
            "userLocation": userState === "" ? userCountry
            :userCity === "" ? userState + ", " + userCountry
            :userCity + ", "+ userState +", " + userCountry
          }
        };
        axios.request(config)
        .then((res)=>{
          const data = {
            minTemperature: res.data.minTemperature,
            maxTemperature: res.data.maxTemperature,
          }
          console.log(data)
          setTemperatureData(data);
          localStorage.setItem('temperatureData', JSON.stringify(data));
          localStorage.setItem('tempCollectedDate', currentDate.toISOString());
        })
        .catch((err)=>{
          console.log("Error in getTemperatureData:"+err)
        })
      }
    }
  }

  // Function for fetching the user image from the AWS S3 bucket
  const fetchUserImage = async () => {
    console.log('Fetching user image.')
    try{
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/user-data/users/image/${user}`,{
        headers: {
          authorization: `Bearer ${IdToken}`
        }
      })
      .then(async (response) => {
        console.log("fetchUserImageResponse",response);
        
        await axios.get(response.data)
        .then((res) => {
          setUserImage(response.data);
          setIsImageLoading(false)
        })
        .catch((error) => {
          // setUserImage('')
          console.log('URL does not lead to a image in S3: '+error)
          setIsImageLoading(false)
        })
  
      })
      .catch((error) => {
        console.log('fetchUserImage Error: \n'+error)
        setUserImage('')
        setIsImageLoading(false)
        UpdateIdToken()
      })
    }
    catch(error){
      toast.error('Could not fetch image.')
    }
  }

  // Function for convertion of distance between Miles and KiloMeters
  const setDistanceValue = (val:number|null| any) => {
    if (val!==null)
    {
      if(unit==='Mi') 
      return (val/1.609).toFixed(2)
      else
      return val
    }
  }

  return (
    <AppContext.Provider value={{
      // Functions
      fetchUserImage,
      UpdateIdToken,
      setDistanceValue,

      // State Variables
      vehicleData,
      vehicleCalcultedData,
      userId,
      userLocation,
      userEmail,
      userOwnerType,
      userCity,
      userState,
      userCountry,
      userImage,
      isLoading,
      name,
      unit,
      isImageLoading,
      temperatureData,
      webSocket,
      vehicleCalcultedIdData,
      vehicleIdData,

      // State Functions
      setUnit,
      setName,
      setVehicleData,
      setVehicleCalcultedData,
      setVehicleIdData,
      setVehicleCalcultedIdData,
      setUserCity,
      setUserState,
      setUserCountry,
      setUserEmail,
      setUserImage,
      setTemperatureData
      }}>
        {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };