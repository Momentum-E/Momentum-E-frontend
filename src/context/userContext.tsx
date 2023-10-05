// @ts-nochec
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AccountContext } from './account';
import { vehicleDataProps, vehicleCalcultedDataProps } from '@/utils/props';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

type UserContextProps = {
  // Functions
  filteredVehicleData:(v_id: string|string|string[] | undefined) => void;
  fetchUserImage:() => Promise<void>;

  // State Variables 
  vehicleData:vehicleDataProps[];
  vehicleIdData:vehicleDataProps|undefined;
  userEmail:string;
  userOwnerType:string;
  userCity:string|undefined;
  userState:string|undefined;
  userCountry:string|undefined;
  userLocation:string;
  userId:string;
  userImage:string;
  isLoading:boolean;
  vehicleCalcultedIdData: Record<string,vehicleCalcultedDataProps>|undefined;
  name:string;
  unit:string;
  isImageLoading:boolean;
  MaxTemp:string|undefined|null;
  MinTemp:string|undefined|null;

  // State Functions
  setVehicleData:React.Dispatch<React.SetStateAction<vehicleDataProps[]>>
  setVehicleIdData: React.Dispatch<React.SetStateAction<vehicleDataProps | undefined>>;
  setUnit:React.Dispatch<React.SetStateAction<string>>;
  setDistanceValue:(val: number|undefined) => string | number | undefined;
  setName:React.Dispatch<React.SetStateAction<string>>;
  setUserCity:React.Dispatch<React.SetStateAction<string>>;
  setUserState:React.Dispatch<React.SetStateAction<string>>;
  setUserCountry:React.Dispatch<React.SetStateAction<string>>;
  setuserEmail:React.Dispatch<React.SetStateAction<string>>;
  setUserImage:React.Dispatch<React.SetStateAction<string>>;
  setMaxTemp:React.Dispatch<React.SetStateAction<string|undefined|null>>;
  setMinTemp:React.Dispatch<React.SetStateAction<string|undefined|null>>;
}

const AppContext = createContext({} as UserContextProps);

const AppProvider = ({ children }:any) => {
  const router = useRouter();
  const { getSession }:any = useContext(AccountContext);

  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState<string>('');
  const [userOwnerType, setOwnerType] = useState<string>("");
  const [userCity, setUserCity] = useState<string>("");
  const [userState, setUserState] = useState<string>("");
  const [userCountry, setUserCountry] = useState<string>("");
  const [userLocation, setUserLocation] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("")
  const [userEmail,setuserEmail] = useState<string>("")
  const [vehicleData, setVehicleData] = useState<vehicleDataProps[]>([]);
  const [vehicleIdData, setVehicleIdData] = useState<vehicleDataProps>()
  const [vehicleCalcultedIdData,setVehicleCalcultedIdData] = useState<Record<string,vehicleCalcultedDataProps>>()
  const [unit, setUnit] = useState<string>('Km')
  const [isLoading, setIsLoading] = useState(true)
  const [isImageLoading, setIsImageLoading] = useState(true)  
  const [MaxTemp,setMaxTemp]=useState<string|undefined|null>()
  const [MinTemp,setMinTemp]=useState<string|undefined|null>()

  // Hook for fetching the user details (name, location, email)
  useEffect(() => {
    const fetchuserdetails = async () => {
      try {
        const session = await getSession();
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
        setuserEmail(response.data.email)
        if(userId){
          setVehicleData(response.data.vehicles)
          setVehicleIdData(response.data.vehicles[0])
          setVehicleCalcultedIdData(response.data.vehicles_processed_data[response.data.vehicles[0].id])
          setIsLoading(false)
        }
      } 
      catch (error) {
        console.error('Error, no user (userContext):', error);
      }
    };
    fetchuserdetails();
  }, [userId]);

  // useEffect(()=>{
  //   if(userId){
  //     if(name===""||userOwnerType===""||userCountry===""){
  //       router.replace(`/dashboard/profile/${userId}`)
  //       // toast.info('Please fill your details first.')
  //     }
  //   }
  // },[userId])
  
  // let [count,setCount]=useState(0)

  useEffect(()=>{
    // We need to refresh this everyday or when userLocation changes
    const max_temp = localStorage.getItem('maxTemp')
    const min_temp = localStorage.getItem('minTemp')
    console.log(max_temp)
    console.log(min_temp)
    if(max_temp===null || max_temp==="" || min_temp===null || max_temp===""){
      if(userLocation){
        // setCount(count+1)
        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=4b950044e17b4d2683693010232807&q=${userLocation?.split(',')[0].replace(" ","+")}`)
        .then((res)=>{
          setMaxTemp(res.data.forecast.forecastday[0].day.maxtemp_c)
          setMinTemp(res.data.forecast.forecastday[0].day.mintemp_c)
          localStorage.setItem('maxTemp',res.data.forecast.forecastday[0].day.maxtemp_c)
          localStorage.setItem('minTemp',res.data.forecast.forecastday[0].day.mintemp_c)
        })
      }
      // console.log("count:"+count)
      // console.log("mintemp:"+min_temp)
      // console.log("maxtemp:"+max_temp)
    }
  },[userLocation,userId])
  
  useEffect(() => {
    if(userId){
      fetchUserImage()
    }
  },[userId])

  const fetchUserImage = async () => {
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

  // Function for getting data of a particular vehicle_Id

  const filteredVehicleData = (v_id:string|string[] | undefined) => {
    if(vehicleData.length > 0){
      axios.get(`http://localhost:5000/user-data/users/${userId}/${v_id}`)
      .then((res) => {
        console.log(res.data)
        setVehicleIdData(res.data.vehicleData)
        setVehicleCalcultedIdData(res.data.processedData)
      })
      .catch((err) => {
        console.log("Error in filteredVehicleData: "+err)
      })
    }
    else{
      console.log('No vehicles added.')
    }
  }

  // Function for convertion of distance between Miles and KiloMeters
  const setDistanceValue = (val:number | any) => {
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
      console.log("vId: "+JSON.stringify(vehicleIdData?.information.vin))
      console.log(vehicleData)
      console.log(JSON.stringify(vehicleCalcultedIdData))
    } 
  }, [userId])


  return (
    <AppContext.Provider value={{
      // Functions
      filteredVehicleData,
      fetchUserImage,

      // State Variables
      vehicleData,
      vehicleIdData,
      userId,
      userLocation,
      userEmail,
      userOwnerType,
      userCity,
      userState,
      userCountry,
      userImage,
      isLoading,
      vehicleCalcultedIdData,
      name,
      unit,
      isImageLoading,
      MaxTemp,
      MinTemp,

      // State Functions
      setVehicleIdData,
      setUnit,
      setDistanceValue,
      setName,
      setVehicleData,
      setUserCity,
      setUserState,
      setUserCountry,
      setuserEmail,
      setUserImage,
      setMaxTemp,
      setMinTemp,
      }}>
        {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within the AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };