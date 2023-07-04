import React, { useEffect, useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Sidebar,
  DashboardNavbar,
  // DashboardContent,
} from '@/components/dashboard';
import { AccountContext } from '../auth/account';
// import {Navbar} from '@/components/shared';
import DashboardContent from '@/pages/dashboard/vehicles/[dashboardContent]';

const DashboardComponent = ({ 
   
}: any) => {
  let isTab = useMediaQuery({ query: '(max-width:768px)' });
  const [isOpen, setIsOpen] = useState(isTab ? false : true);
  const {isAuthenticated} = useContext(AccountContext)

  useEffect(() => {
    if (isTab) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isTab,isAuthenticated]);

  return (
    <div className="flex ">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isTab={isTab} />
      {/* main had a class max-w-5xl */}
      <main className="max-w-full flex-1 mx-auto h-screen pb-16 overflow-hidden">
        <DashboardNavbar page='dashboard' setIsOpen={setIsOpen} isOpen={isOpen} />
        {/*  Main Content */}
        <DashboardContent />
      </main>
    </div>
  );
};

export default DashboardComponent;
