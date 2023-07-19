import React, { useEffect, useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Sidebar,
  DashboardNavbar,
} from '@/components/dashboard/dashboard-components';
import { AccountContext } from '@/context/account';
import axios from 'axios';


const DashboardLayout = ({children,page}: any) => {

  let isTab = useMediaQuery({ query: '(max-width:640px)' });
  const [isOpen, setIsOpen] = useState(isTab ? false : true);
  const { getSession } = useContext(AccountContext);
 
  const [vehicleData, setVehicleData] = useState([]);
  const [user, setUser] = useState(null);
  const [name, setName] = useState<string>('');
  const [userId, setUserId] = useState<string|null>('');
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (isTab) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isTab]);

  useEffect(() => {
    const fetchuserdetails = async () => {
      try {
        const session = await getSession();
        const userid = session.idToken.payload.sub;
        setUserId(userid);
        const response = await axios.get(
          `http://localhost:5000/auth/users/${userid}`
        );
        setName(response.data.firstName+" "+(response.data.lastName||""));
        setUser(response.data);
        console.log(response.data);
      } 
      catch (error) {
        console.error('Error:', error);
      }
    };
    fetchuserdetails();
  }, []);


  useEffect(()=>{
    if(userId){
      const getUserVehicleData = async () => {
          // ! Get all vehicle details
          // const _id = localStorage.getItem(
          // 'CognitoIdentityServiceProvider.5anhoi3gpfgvnqsd609smuh0qi.LastAuthUser'
          // );
          // setUserId(_id);
          axios
          .get('http://localhost:5000/vehicles/get-vehicles', {
            headers: {
              // this only accepts _id as the header and not userId from the state
              'user-id': userId,
          },
        })
        .then((res) => {
        setVehicleData(res.data);
        console.log(userId)
        setIsLoading(false)
        // console.log(vehicleData)
        })
        .catch((err) => {
          console.error(err);
        });
      }
      getUserVehicleData();
    }
  },[userId])

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
