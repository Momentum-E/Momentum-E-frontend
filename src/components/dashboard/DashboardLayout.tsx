import React, { useEffect, useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Sidebar,
  DashboardNavbar,
  // DashboardContent,
} from '@/components/dashboard';
import { AccountContext } from '../auth/account';
import { useRouter } from 'next/router';
import axios from 'axios';

const DashboardLayout = ({children,...props}: any) => {

  let isTab = useMediaQuery({ query: '(max-width:768px)' });
  const [isOpen, setIsOpen] = useState(isTab ? false : true);
  const {isAuthenticated} = useContext(AccountContext)
  const router = useRouter();
  
  const { getSession, logout } = useContext(AccountContext);
  const [user, setUser] = useState(null);
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');

  useEffect(() => {
    if (isTab) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isTab,isAuthenticated]);



  useEffect(() => {
    const fetchuserdetails = async () => {
      try {
        const session = await getSession();
        const userId = session.idToken.payload.sub;
        const response = await axios.get(
          `http://localhost:5000/auth/users/${userId}`
        );
        console.log(response.data);
        setName(response.data.firstName);
        setId(response.data.userId);
        setUser(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchuserdetails();
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isTab={isTab} />
        {/* main had a class max-w-5xl */}
        <main className="max-w-full flex-1 mx-auto h-screen pb-16 overflow-hidden">
          <DashboardNavbar name={name} id={id} page='dashboard' setIsOpen={setIsOpen} isOpen={isOpen} />
          {/*  Main Content */}
          {children}
          {/* <VehicleDashboardContent vehicleId={router.query.vehicleId} /> */}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
