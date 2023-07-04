import React, { useEffect, useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Sidebar,
  DashboardNavbar,
  // DashboardContent,
} from '@/components/dashboard';
import { AccountContext } from '../auth/account';
import { useRouter } from 'next/router';
// import {Navbar} from '@/components/shared';
// import DashboardContent from '@/pages/dashboard/vehicles/[dashboardContent]';
import {VehicleDashboardContent} from '@/pages/dashboard/vehicles';

const DashboardLayout = ({children}: any) => {

  const router = useRouter()
  const { query } = router;

  // Check if a specific vehicle ID is present in the query parameters
  const vehicleId = query.vehicleId || '';
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
        {children}
        {/* <VehicleDashboardContent vehicleId={router.query.vehicleId} /> */}
      </main>
    </div>
  );
};

export default DashboardLayout;
