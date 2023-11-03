import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AccountContext } from './account';
import { 
  vehicleDataProps, 
  vehicleCalcultedDataProps, 
  UserContextProps, 
  temperatureDataProps
} from '@/utils/props';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify'; 

const AppContext = createContext({} as UserContextProps);

const AppProvider = ({ children }:any) => {
  const router = useRouter();
  const { getSession } = useContext(AccountContext);

  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState<string>('');
  const [userOwnerType, setOwnerType] = useState<string>("");
  const [userCity, setUserCity] = useState<string>("");
  const [userState, setUserState] = useState<string>("");
  const [userCountry, setUserCountry] = useState<string>("");
  const [userLocation, setUserLocation] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("")
  const [userEmail,setUserEmail] = useState<string>("")
  const [vehicleData, setVehicleData] = useState<vehicleDataProps[]>([]);
  const [vehicleCalcultedData,setVehicleCalcultedData] = useState<Record<string,vehicleCalcultedDataProps>>()
  // const [vehicleIdData, setVehicleIdData] = useState<vehicleDataProps>()
  // const [vehicleCalcultedIdData,setVehicleCalcultedIdData] = useState<vehicleCalcultedDataProps>()
  const [unit, setUnit] = useState<string>('Km')
  const [isLoading, setIsLoading] = useState(true)
  const [isImageLoading, setIsImageLoading] = useState(true)  
  const [webSocket, setWebSocket] = useState<WebSocket|null>(null);
  const [temperatureData, setTemperatureData] = useState<temperatureDataProps>({
    minTemperature: null,
    maxTemperature: null,
  });

  // Hook for fetching the user details
  useEffect(() => {
    const fetchUserDetails =  async () => {
      try {
        const session:any = await getSession();
        const userid = session.idToken.payload.sub;
        setUserId(userid); 
        const response = await axios.get(
          `http://localhost:5000/auth/users/${userid}`
          );  
        setName(response.data.name)
        setOwnerType(response.data.owner_type)
        setUserCity(response.data.city)
        setUserState(response.data.state)
        setUserCountry(response.data.country)
        setUserLocation(`${
          response.data.state === ""||undefined ? response.data.country
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
      catch (error) {
        console.error('Error, no user (userContext):', error);
      }
    };
    // if(userId){
    fetchUserDetails();
    // }
  }, [userId]);

  // useEffect(()=>{
  //   if(userId){
  //     if(name===""||userOwnerType===""||userCountry===""){
  //       router.replace(`/dashboard/profile/${userId}`)
  //       // toast.info('Please fill your details first.')
  //     }
  //   }
  // },[])

  /*
    Sets a new websocket with the user-credentials 
    returns the new socket
  */
  const SettingWebsocket = async () => {

    const authToken = localStorage.getItem(`CognitoIdentityServiceProvider.75uahg9l9i6r2u6ikt46gu0qfk.${userId}.idToken`);
    
    if(authToken){
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/websocket/generate-token`,{
        headers: {
          authorization: `Bearer ${authToken}`
        }
      })

      console.log(response.data)
      const socket = new WebSocket(`wss://gav5fur5v0.execute-api.ap-south-1.amazonaws.com/development?token=${response.data.uniqueToken}`);
      setWebSocket(socket)

      socket.onopen = (event) => {
        console.log('Websocket connection established with userId: '+userId+"\n"+event);
      };
  
      socket.onmessage = (event) => {
        const SocketData = JSON.parse(event.data);
        
        // Handle data from the server, including the 'updatedData' field, as needed
        console.log('Received data from the server: \n'+ JSON.stringify(SocketData) 
        +"eventName: \n"+SocketData.eventName+"\n"
        +"SoH: "+SocketData.updatedData.vehicles_processed_data[vehicleData[0]?.id]?.chargeRateData.totalEnergyConsumed
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
  
      socket.onerror = (event:any) => {
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
              socket.close()
              SettingWebsocket();
              // setWebSocket(newSocket)
              console.log('error code 1006.')
            break;
          }
        }
      };
  
      socket.onclose = async (event) => {
        console.log('Websocket connection closed with userId and event: ' + userId, event);
  
        // Optionally, you can attempt to reopen the connection here.
        // You can also handle different close codes and reasons.
        console.log('Trying to reconnect to the websocket')
        if(userId){
          console.log('userId present'+ userId)
          SettingWebsocket();
        }
        else{
          setWebSocket(null)
        }
      };
    }
    else{
      toast.error('No authToken found, please login again.')
      return 
    }
  };  
  
  /*
    Sets a new a websocket when the component renders
  */
  useEffect(() => {
    if (userId) {
      SettingWebsocket();
    }
  }, [userId]);

  /* 
    Sets the temperature according to the useLocation 
    and updates it everyday.
  */

  const getTemperatureData = async () => {
    const storedDate = localStorage.getItem('tempCollectedDate');
    const currentDate = new Date().toISOString();
    if(userLocation){
      if (!storedDate || (storedDate <= currentDate)) {
        // Fetch data from the API
        // const res = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=4b950044e17b4d2683693010232807&q=${userLocation?.split(',')[0].replace(" ","+")}`)
        let config = {
          method: 'post',
          url:  `${process.env.NEXT_PUBLIC_SERVER_ROUTE}/userData/get-temperature`,
          headers: { 
            "Content-Type": "application/json"
          },
          data : JSON.stringify({
            "userLocation": userLocation
          })
        };
        axios.request(config)
        .then((res)=>{
          const data = {
            minTemperature: res.data.forecast.forecastday[0].day.mintemp_c,
            maxTemperature: res.data.forecast.forecastday[0].day.maxtemp_c,
          }
          setTemperatureData(data);
          localStorage.setItem('temperatureData', JSON.stringify(data));
          localStorage.setItem('tempCollectedDate', currentDate);
        })
        .catch((err)=>{
          console.log("Error in getTemperatureData:"+err)
        })
        // .then((data) => {
  
          // Update local storage with new data and current date
        // });
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
  }
  
  useEffect(()=>{
    getTemperatureData()
  },[userLocation])

  //Hook for fetching user image on any userId change. 
  useEffect(() => {
    if(userId){
      fetchUserImage()
    }
  },[userId])

  // Function for fetching the user image from the AWS S3 bucket
  const fetchUserImage = async () => {
    console.log('Fetching user image.')
    axios.get(`http://localhost:5000/user-data/users/image/${userId}`)
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
      toast.error('Could not fetch image.')
      setIsImageLoading(false)
    })
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

  useEffect(() => {
    if(userId){
      console.log("userId: "+userId)
      // console.log("vId: "+JSON.stringify(vehicleIdData?.information.vin))
      console.log(vehicleData)
      // console.log("mintemp: "+JSON.stringify(temperatureData))
      // console.log(vehicleCalcultedIdData)
    } 
  }, [userId])


  return (
    <AppContext.Provider value={{
      // Functions
      // filteredVehicleData,
      fetchUserImage,
      setDistanceValue,

      // State Variables
      vehicleData,
      // vehicleIdData,
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
      // vehicleCalcultedIdData,
      name,
      unit,
      isImageLoading,
      temperatureData,
      webSocket,

      // State Functions
      setUnit,
      setName,
      setVehicleData,
      setVehicleCalcultedData,
      // setVehicleIdData,
      // setVehicleCalcultedIdData,
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