// @ts-nocheck
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AccountContext } from './account';
import { useRouter } from 'next/router';
import { vehicleDataProps } from '@/utils/props/props';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const { getSession } = useContext(AccountContext);

    const [userLocation, setUserLocation] = useState<string>();
    const [name, setName] = useState<string>('');
    const [userId, setUserId] = useState<string|null>('');
    const [isLoading, setIsLoading] = useState(true)
    const [vehicleData, setVehicleData] = useState<vehicleDataProps>([]);
    const [vehicleIdData, setVehicleIdData] = useState<vehicleDataProps>()

   const router = useRouter()

    useEffect(() => {
        const fetchuserdetails = async () => {
            try {
            const session = await getSession();
            const userid = session.idToken.payload.sub;
            setUserId(userid);
            const response = await axios.get(
                `http://localhost:5000/auth/users/${userid}`
            );
                setName(response.data.firstName+" "+response.data.lastName);
                setUserLocation(`${response.data.address.city}, ${response.data.address.country}`);
            } 
            catch (error) {
                console.error('Error:', error);
            }
        };
        fetchuserdetails();
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
            setVehicleData(res.data);
            setIsLoading(false)
        })
        .catch((err) => {
            console.error(err);
            setIsLoading(false)
        });
      }
      getUserVehicleData();
    }
   },[userId])

   const filteredVehicleData = (v_id) =>{
    axios.get(`http://localhost:5000/vehicles/get-vehicles/${v_id}`,{
      headers:{
        "user-id":userId,
      },
    }).then((res)=>{
      setVehicleIdData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
   }

   const addVehicle = () => {
    axios
      .get(`http://localhost:5000/vehicles/users/${userId}/link`)
      .then((res) => {
        console.log(res.data);
        const linkUrl = res.data.linkUrl;
        router.push(linkUrl);
      })
      .catch((err) => console.error(err));
  };


  //  useEffect(()=>{
  //       console.log(userId)
  //       console.log(vehicleData)
  //       console.log(router.pathname)
  //  },[userId])
  
  // useEffect(() => {
  //   console.log("Id: "+userId)
  //   console.log("vId: "+vehicleId)
  //   console.log(userId)
  //   console.log("vehicleIdData: "+ vehicleIdData)
  // }, [])


  return (
    <AppContext.Provider value={{
      addVehicle, 
      vehicleData,
      vehicleIdData,
      filteredVehicleData,
      userLocation,
      userId,
      isLoading,
      name 
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