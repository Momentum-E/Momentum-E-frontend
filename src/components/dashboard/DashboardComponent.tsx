import React, { useEffect, useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Sidebar, DashboardNavbar, DashboardContent } from '@/components/dashboard';
// import {
//   CognitoUserPool,
//   CognitoUserAttribute,
// } from 'amazon-cognito-identity-js';
// import AWS from 'aws-sdk';


const DashboardComponent = ({accountContext}:any) => {
  
  let isTab = useMediaQuery({ query: '(max-width:768px)' });
  const [isOpen, setIsOpen] = useState(isTab ? false : true);
  
  useEffect(() => {
    if (isTab) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isTab]);

  return (
    <div className="flex ">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isTab={isTab}/>
      {/* main had a class max-w-5xl */}
      <main className="max-w-full flex-1 mx-auto h-screen pb-16 overflow-hidden">
        <DashboardNavbar setIsOpen={setIsOpen} isOpen={isOpen}/>
        {/*  Main Content */}
        <DashboardContent />
      </main>
    </div>
  );
}

export default DashboardComponent