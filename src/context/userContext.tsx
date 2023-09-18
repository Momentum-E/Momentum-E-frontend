// @ts-nocheck
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AccountContext } from './account';
import { useRouter } from 'next/router';
import { vehicleDataProps,VendorCountProp } from '@/utils/props/props';

type UserContextProps = {
  addVehicle:() => void;
  filteredVehicleData:(v_id: string | string[] | undefined) => void;
  vehicleData:vehicleDataProps[];
  vehicleIdData:vehicleDataProps|undefined;
  userEmail:string;
  userLocation:string|undefined;
  userId:string|null;
  isLoading:boolean;
  name:string;
  unit:string;
  setVehicleIdData: React.Dispatch<React.SetStateAction<vehicleDataProps | undefined>>;
  setUnit:React.Dispatch<React.SetStateAction<string>>;
  setDistanceValue:(val: number|undefined) => string | number | undefined;
  setName:React.Dispatch<React.SetStateAction<string>>;
  setVehicleData:React.Dispatch<React.SetStateAction<vehicleDataProps[] | undefined>>
  setUserLocation:React.Dispatch<React.SetStateAction<string>>;
  setuserEmail:React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<UserContextProps>();

const AppProvider = ({ children }:any) => {
  const { getSession }:any = useContext(AccountContext);

  const [userId, setUserId] = useState<string|null>('');
  const [userLocation, setUserLocation] = useState<string>();
  const [name, setName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true)
  const [vehicleData, setVehicleData] = useState<vehicleDataProps[]>([]);
  const [vehicleIdData, setVehicleIdData] = useState<vehicleDataProps>()
  const [unit, setUnit] = useState<string>('Km')
  const [userEmail,setuserEmail] = useState<string>('')
  const [isVehicleDataLoading,setVehicleDataLoading]=useState(true)

  const router = useRouter()

  // Hook for fetching the user details (name, location, email)
  useEffect(() => {
    const fetchuserdetails = async () => {
      try {
          const session = await getSession();
          const userid = session.idToken.payload.sub;
          setUserId(userid); 
          // console.log('userid(fetch statement):',userid)
          const response = await axios.get(
              `http://localhost:5000/auth/users/${userid}`
          );
          setName(response.data.name)
          setUserLocation(`${response.data.city===''?response.data.state:response.data.city}, ${response.data.country}`);
          setuserEmail(response.data.email)
      } 
      catch (error) {
        console.error('Error, no user (userContext):', error);
      }
    };
    fetchuserdetails();
  }, [userId]);
  
  // Hook for getting all the vehicle Data for a particular user
  useEffect(()=>{
    if(userId){
      const getUserVehicleData = async () => {
          axios.get('http://localhost:5000/vehicles/get-vehicles', {
            headers: {
              'user-id': userId,
          },
        })
        .then((res) => {
            setVehicleData(res.data.data)
            setIsLoading(false)
            setVehicleIdData(res.data[0])
        })
        .catch((err) => {
            console.error(err);
            setIsLoading(false)
        });
      }
      getUserVehicleData();
    }
  },[userId])

  // Function for getting data of a particular vehicle_Id
  const filteredVehicleData = (v_id) =>{
    if(userId){
      axios.get(`http://localhost:5000/vehicles/get-vehicles/${v_id}`)
        // headers:{
        //   "user-id":userId,
        // },
      .then((res)=>{
        setVehicleIdData(res.data)
        setVehicleDataLoading(false)
        // router.replace(`/dashboard/vehicles/${res.data.id}`)
        console.log('userId present')
      }).catch((err)=>{
        console.log(err)
      })
    }
    else{
    console.log('userId not present')
    }
  }

  // Function for convertion of distance between Miles and KiloMeters
  const setDistanceValue = (val:number|null) => {
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
      // console.log("vehicleData: "+ vehicleData)
      console.log("vId: "+JSON.stringify(vehicleIdData?.information.vin))
      // console.log("name,email: ", name,userEmail)
    }
  }, [userId])


  return (
    <AppContext.Provider value={{
      // Functions
      filteredVehicleData,

      // State Variables
      vehicleData,
      vehicleIdData,
      userEmail,
      userLocation,
      userId,
      isLoading,
      name,
      unit,
      isVehicleDataLoading,

      // State Functions
      setVehicleIdData,
      setUnit,
      setDistanceValue,
      setName,
      setVehicleData,
      setUserLocation,
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