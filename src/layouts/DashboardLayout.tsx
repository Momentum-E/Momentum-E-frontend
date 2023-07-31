import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'next-themes';
import { useAppContext } from '@/context/userContext';

import {
  Sidebar,
  DashboardNavbar,
} from '@/components/dashboard/dashboard-components';

const DashboardLayout = ({
  children,
  page,
}: any) => {

  let isTab = useMediaQuery({ query: '(max-width:640px)' });
  const [isOpen, setIsOpen] = useState(isTab ? false : true);
  const {isLoading, userId, vehicleData, name}:any = useAppContext()
  const {theme, setTheme} = useTheme()
  
  useEffect(() => {
    if (isTab) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
    setTheme(theme||'dark')
  }, [isTab,theme]);

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
        // page={page===undefined?'':page}
        page={page}
        theme={theme}
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
          <div className="overflow-auto max-h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
