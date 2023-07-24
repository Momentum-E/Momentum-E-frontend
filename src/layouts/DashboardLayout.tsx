import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Sidebar,
  DashboardNavbar,
} from '@/components/dashboard/dashboard-components';
import { useAppContext } from '@/context/userContext';


const DashboardLayout = ({
  children,
  page,
}: any) => {

  let isTab = useMediaQuery({ query: '(max-width:640px)' });
  const [isOpen, setIsOpen] = useState(isTab ? false : true);
  const {isLoading, userId, vehicleData, name}:any = useAppContext()
  
  useEffect(() => {
    if (isTab) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isTab]);


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
        page={page===undefined?'':page}
        // theme={theme}
        />
        <div className="max-w-full flex-1 h-screen overflow-hidden">
          <DashboardNavbar 
            name={name} 
            id={userId}
            page={page===undefined?'':page}
            isTab={isTab} 
            setIsOpen={setIsOpen} 
            isOpen={isOpen} 
          />
          <>
            {children}
          </>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
