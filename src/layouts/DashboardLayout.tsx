import React, { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'next-themes';
import { AppContext } from '@/context/userContext';
import { AccountContext } from '@/context/AccountContext';
import { SubscriptionContext } from '@/context/subscriptionContext';

import {
  Sidebar,
  DashboardNavbar,
} from '@/components/dashboard/dashboard-components';
import { DashboardLayoutProps } from '@/utils/props';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SetValue from '@/components/dashboard/set-values-component/SetValue';

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
    name
  } = useContext(AppContext)
  const { subscriptionData } = useContext(SubscriptionContext)
  const { IdToken } = useContext(AccountContext)
  const {theme, setTheme} = useTheme()
  
  useEffect(() => {
    isTab ? 
      setIsOpen(false)
    :
      setIsOpen(true)
  }, [isTab]);
  
  useEffect(() => {
    setTheme(theme||'dark')
  },[theme])

  return (
    <ProtectedRoute>
      <div className='relative flex'>
        <Sidebar 
          NumberVehiclePaid={subscriptionData?.quantity}
          idToken={IdToken}
          id={userId}
          isLoading={isLoading}
          vehicleData={vehicleData||[]} 
          isOpen={isOpen} 
          setIsOpen={setIsOpen} 
          isTab={isTab}
          page={page}
          theme={theme}
        />
        <div className="max-w-full flex-1 h-screen overflow-hidden">
          <DashboardNavbar 
            isTab={isTab}
            name={name} 
            id={userId}
            page={page===undefined ? '' : page}
            setIsOpen={setIsOpen} 
            isOpen={isOpen} 
          />
            {children}
            <SetValue/> 
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
