// @ts-nochec
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AccountContext } from './account';
import { vehicleDataProps, vehicleCalcultedDataProps } from '@/utils/props/props';
import { useRouter } from 'next/router';

type UserContextProps = {
  filteredVehicleData:(v_id: string | string[]) => void;
  fetchUserImage:() => Promise<void>;
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
  vehicleCalcultedData: Record<string,vehicleCalcultedDataProps>|undefined;
  vehicleCalcultedIdData: Record<string,vehicleCalcultedDataProps>;
  name:string;
  unit:string;
  // vehicleDataLoading:boolean;
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
  const [vehicleCalcultedData,setVehicleCalcultedData] = useState<Record<string,vehicleCalcultedDataProps>>()
  const [vehicleCalcultedIdData,setVehicleCalcultedIdData] = useState<Record<string,vehicleCalcultedDataProps>>()
  const [unit, setUnit] = useState<string>('Km')
  const [isLoading, setIsLoading] = useState(true)

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
          setVehicleCalcultedData(response.data.vehicles_processed_data)
          setVehicleIdData(response.data.vehicles[0])
          // setVehicleCalcultedIdData(response.data.vehicles_processed_data[vehicleIdData.id])
          setIsLoading(false)
          // setVehicleDataLoading(false)
        }
      } 
      catch (error) {
        console.error('Error, no user (userContext):', error);
      }
    };
    fetchuserdetails();
  }, [userId]);

  useEffect(()=>{
    if(userId){
      if(name===""||userOwnerType===""||userCountry===""){
        router.replace(`/dashboard/profile/${userId}`)
        // toast.info('Please fill your details first.')
      }
    }
  },[userId])
  
  useEffect(() => {
    if(userId){
      fetchUserImage()
    }
  },[userId])

  const fetchUserImage = async () => {
    axios.get(`http://localhost:5000/auth/users/image/${userId}`)
    .then((response) => {
      setUserImage(response.data);
      console.log("fetchUserImageResponse",response);
    })
    .catch((error) => {
      console.log(error)
      setUserImage('')
    })
  }

  // Hook for getting all the vehicle Data for a particular user
  // useEffect(()=>{
  //   if(userId){
  //     const getUserVehicleData = async () => {
  //         axios.get('http://localhost:5000/vehicles/get-vehicles', {
  //           headers: {
  //             'user-id': userId,
  //         },
  //       })
  //       .then((res) => {
  //           setVehicleData(res.data.data)
  //           setIsLoading(false)
  //           setVehicleIdData(res.data[0])
  //       })
  //       .catch((err) => {
  //           console.error(err);
  //           setIsLoading(false)
  //       });
  //     }
  //     getUserVehicleData();
  //   }
  // },[userId])

  // Function for getting data of a particular vehicle_Id

  const filteredVehicleData = (v_id:string) =>{
    // if(userId){
    //   axios.get(`http://localhost:5000/vehicles/get-vehicles/${v_id}`)
    //   .then((res)=>{
    //     setVehicleIdData(res.data)
    //     // setVehicleDataLoading(false)
    //     console.log('userId present')
    //   }).catch((err)=>{
    //     console.log(err)
    //   })
    // }
    // else{
    // console.log('userId not present')
    // }

    // Getting vehicle from db instead of enode
    setVehicleIdData(vehicleData.filter((item:any)=>item.id===v_id)[0])
    setVehicleCalcultedIdData(vehicleCalcultedData[v_id])
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
      console.log(userImage)
    } 
  }, [userId,vehicleCalcultedIdData])


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
      name,
      unit,
      vehicleCalcultedData,
      // vehicleDataLoading,
      

      // State Functions
      setVehicleIdData,
      setUnit,
      setDistanceValue,
      setName,
      setVehicleData,
      setUserCity,
      setUserState,
      setUserCountry,
      setUserImage,
      setuserEmail
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