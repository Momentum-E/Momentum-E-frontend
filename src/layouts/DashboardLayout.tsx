import React, { useContext, useEffect, useState } from 'react';
import { DashboardLayoutProps } from '@/utils/props';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'next-themes';
import { AppContext } from '@/context/userContext';
import SetValue from '@/components/dashboard/set-values-component/SetValue';

import ProtectedRoute from '@/components/auth/ProtectedRoute';

import {
  Sidebar,
  DashboardNavbar,
} from '@/components/dashboard/dashboard-components';

const DashboardLayout = ({
  children,
  page,
}:DashboardLayoutProps) => {
  const isTab = useMediaQuery({ query: '(max-width:767px)' });
  const [isOpen, setIsOpen] = useState(isTab ? false : true);
  const {
    isLoading,
    userId, 
    vehicleData,
    name, 
    userImage, 
    isImageLoading,
    setName,
    setVehicleData,
    setUserCity,
    setUserState,
    setUserCountry,
    setUserEmail
  } = useContext(AppContext)
  const {theme, setTheme} = useTheme()
  
  useEffect(() => {
    isTab ? 
      setIsOpen(false)
    :
      setIsOpen(true)
    // console.log(isTab)
  }, [isTab]);

  useEffect(() => {
    setTheme(theme||'dark')
  },[theme])

  return (
    <ProtectedRoute>
      <div className='relative'>
        <div className='flex'>
          <Sidebar 
          id={userId}
          isLoading={isLoading}
          vehicle_data={vehicleData||[]} 
          isOpen={isOpen} 
          setIsOpen={setIsOpen} 
          isTab={isTab}
          page={page}
          theme={theme}
          />
          <div className="max-w-full flex-1 h-screen overflow-hidden">
            <DashboardNavbar 
              name={name} 
              id={userId}
              page={page===undefined ? '' : page}
              isTab={isTab} 
              setIsOpen={setIsOpen} 
              isOpen={isOpen} 
              userImage={userImage}
              isImageLoading={isImageLoading}
              setName={setName}
              setVehicleData={setVehicleData}
              setUserCity={setUserCity}
              setUserState={setUserState}
              setUserCountry={setUserCountry}
              setUserEmail={setUserEmail}
            />
              {children}
              <SetValue/> 
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
