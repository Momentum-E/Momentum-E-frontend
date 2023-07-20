import React, { useEffect, useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Sidebar,
  DashboardNavbar,
} from '@/components/dashboard/dashboard-components';
import { AccountContext } from '@/context/account';
import axios from 'axios';
import { useAppContext } from '@/context/userContext';
import { vehicleDataProps } from '@/utils/props/props';
import { useRouter } from 'next/router';


const DashboardLayout = ({
  children,
  page,

}: any) => {

  let isTab = useMediaQuery({ query: '(max-width:640px)' });
  const [isOpen, setIsOpen] = useState(isTab ? false : true);

  // const { getSession } = useContext(AccountContext);
  // const [vehicleData, setVehicleData] = useState<vehicleDataProps>([]);
  // const [user, setUser] = useState(null);
  // const [name, setName] = useState<string>('');
  // const [userId, setUserId] = useState<string|null>('');
  // const [isLoading, setIsLoading] = useState(true)

  const {isLoading, userId, vehicleData, name} = useAppContext()
  
  useEffect(() => {
    if (isTab) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isTab]);

  // useEffect(() => {
  //   return ()=>{
  //     const fetchuserdetails = async () => {
  //       try {
  //         const session = await getSession();
  //         const userid = session.idToken.payload.sub;
  //         setUserId(userid);
  //         const response = await axios.get(
  //           `http://localhost:5000/auth/users/${userid}`
  //         );
  //         setName(response.data.firstName+" "+(response.data.lastName||""));
  //         // setUser(response.data);
  //       } 
  //       catch (error) {
  //         console.error('Error:', error);
  //       }
  //     };
  //     fetchuserdetails();
  //   }
  // }, [userId]);
  
  // useEffect(()=>{
  //   if(userId){
  //     const getUserVehicleData = async () => {
  //         axios
  //         .get('http://localhost:5000/vehicles/get-vehicles', {
  //           headers: {
  //             'user-id': userId,
  //         },
  //       })
  //       .then((res) => {
  //       setVehicleData(res.data);
  //       setIsLoading(false)
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         setIsLoading(false)
  //       });
  //     }
  //     getUserVehicleData();
  //   }
  //  },[userId])

  //  const router = useRouter()
  //  useEffect(()=>{
  //     console.log(userId)
  //     console.log(vehicleData)  
  //     console.log(router.pathname)
  //  },[userId, vehicleData,router.pathname])

  return (
    <div className='relative'>
      <div className='flex'>
        <Sidebar 
        id={userId}
        isLoading={isLoading}
        vehicle_data={vehicleData} 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        isTab={isTab}
        />
        <div className="max-w-full flex-1 h-screen overflow-hidden">
          <DashboardNavbar 
            name={name} 
            id={userId}
            page={page}
            isTab={isTab} 
            setIsOpen={setIsOpen} 
            isOpen={isOpen} 
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
