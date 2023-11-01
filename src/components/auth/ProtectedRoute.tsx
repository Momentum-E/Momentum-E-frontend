import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AccountContext } from '@/context/account';
// import socket from '@/configs/webSockets/WebSockets';

type ProtectedRouteProps = {
  children: React.ReactNode;
}

const ProtectedRoute = ({
    children,
  }:ProtectedRouteProps) => {
  const { isAuthenticated,checkAuthentication,getSession } = useContext(AccountContext);
  const router = useRouter();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        // Check if the user has an active session
        await getSession();
        // await checkAuthentication()
        console.log("User has an active session")
      } 
      catch (error) {
        // If there is no active session, redirect to the login page
        console.log(error)
        router.replace('/auth/login/')
      }
    };
    // window.location.reload()
    checkUserAuthentication();
  }, [isAuthenticated]);

  return (
    <>
      {children}
    </>
  )
};

export default ProtectedRoute;