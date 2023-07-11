import React, { useEffect, useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Sidebar,
  DashboardNavbar,
  // DashboardContent,
} from '@/components/dashboard/dashboard-components';
import { AccountContext } from '@/context/account';
import { useRouter } from 'next/router';
import axios from 'axios';

const DashboardLayout = ({children,...props}: any) => {

  let isTab = useMediaQuery({ query: '(max-width:640px)' });
  const [isOpen, setIsOpen] = useState(isTab ? false : true);
  const {isAuthenticated} = useContext(AccountContext)
  const router = useRouter();
  const {vehicle_Id} = router.query
  
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
  }, [isTab]);



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
    <div className='flex '>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isTab={isTab} />
      <div className="max-w-full flex-1 h-screen overflow-hidden">
        <DashboardNavbar name={name} id={id} page='dashboard' isTab={isTab} setIsOpen={setIsOpen} isOpen={isOpen} />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
