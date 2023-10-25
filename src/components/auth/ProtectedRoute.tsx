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
  const { getSession } = useContext(AccountContext);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check if the user has an active session
        await getSession();
      } catch (error) {
        // If there is no active session, redirect to the login page
        router.replace('/auth/login/')
      }
    };
    // window.location.reload()
    checkAuthentication();
  }, [getSession]);

  return (
    <>
      {children}
    </>
  )
};

export default ProtectedRoute;