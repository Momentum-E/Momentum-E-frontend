// @ts-nocheck
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AccountContext } from './account';
import { useRouter } from 'next/router';
import { vehicleDataProps } from '@/utils/props/props';

type VendorCountProp = {
  vendor:string;
  count:number;
}[]

type UserContextProps = {
  addVehicle:() => void;
  vehicleData:vehicleDataProps[];
  vehicleIdData:vehicleDataProps|undefined;
  setVehicleIdData: React.Dispatch<React.SetStateAction<vehicleDataProps | undefined>>;
  filteredVehicleData:(v_id: string|undefined) => void;
  VendorCounts:VendorCountProp;
  userEmail:string;
  userLocation:string|undefined;
  userId:string|null;
  isLoading:boolean;
  name:string;
  unit:string;
  setUnit:React.Dispatch<React.SetStateAction<string>>;
  setDistanceValue:(val: number|null) => string | number | undefined;
}

const AppContext = createContext<UserContextProps>();

const AppProvider = ({ children }:any) => {
    const { getSession }:any = useContext(AccountContext);

    const [userId, setUserId] = useState<string|null>('');
    const [userLocation, setUserLocation] = useState<string>();
    const [name, setName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true)
    const [vehicleData, setVehicleData] = useState<vehicleDataProps[]>([]);
    const [VendorCounts, setVendorCounts] = useState<VendorCountProp[]>([])
    const [vehicleIdData, setVehicleIdData] = useState<vehicleDataProps>()
    const [unit, setUnit] = useState<string>('Km')
    const [userEmail,setuserEmail] = useState<string>('')
    const [isVehicleDataLoading,setVehicleDataLoading]=useState(true)

   const router = useRouter()

  useEffect(() => {
    // if(userId){
    const fetchuserdetails = async () => {
      try {
        const session = await getSession();
        const userid = session.idToken.payload.sub;
        setUserId(userid); 
        console.log('userid(fetch statement):',userid)
        const response = await axios.get(
            `http://localhost:5000/auth/users/${userid}`
        );
            // setName(response.data.firstName+" "+response.data.lastName);
            setName(response.data.name)
            setUserLocation(`${response.data.city}, ${response.data.country}`);
            setuserEmail(response.data.email)
          } 
        catch (error) {
            console.error('Error, no user (userContext):', error);
        }
    };
    fetchuserdetails();
    // }
  }, [userId]);
  
  useEffect(()=>{
    if(userId){
      const getUserVehicleData = async () => {
          axios
          .get('http://localhost:5000/vehicles/get-vehicles', {
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

   useEffect(() => {
    const counts = [];
     // Create an array of vendor counts
     vehicleData.forEach((vehicle) => {
       const vendor = vehicle.vendor;

       // Check if the vendor already exists in the array
       const existingVendor = counts.find((item) => item.vendor === vendor);

       if (existingVendor) {
         // Increment the count if the vendor exists
         existingVendor.count++;
       } else {
         // Add a new entry for the vendor
         counts.push({ vendor, count: 1 });
       }
     });
    //  return ()=>{
      // setVendorCounts(VendorCounts)
    //  }
    setVendorCounts(counts);
   }, [vehicleData])

   const filteredVehicleData = (v_id:string|undefined) =>{
    if(userId){
      axios.get(`http://localhost:5000/vehicles/get-vehicles/${v_id}`)
        // headers:{
        //   "user-id":userId,
        // },
      .then((res)=>{
        setVehicleIdData(res.data)
        setVehicleDataLoading(false)
        router.replace(`/dashboard/vehicles/${res.data.id}`)
        console.log('userId present')
      }).catch((err)=>{
        console.log(err)
      })
    }
    else{
    console.log('userId not present')
    }
  }

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
      // console.log("userId: "+userId)
      // console.log("vId: "+vehicleIdData)
      console.log("vehicleData: "+ JSON.stringify(vehicleData))
      console.log(VendorCounts)
      // console.log("name,email: ", name,userEmail)
    }
  }, [vehicleData,userId])


  return (
    <AppContext.Provider value={{
      vehicleData,
      vehicleIdData,
      setVehicleIdData,
      filteredVehicleData,
      VendorCounts,
      userEmail,
      userLocation,
      userId,
      isLoading,
      name,
      unit,
      setUnit,
      setDistanceValue,
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