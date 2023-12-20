import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AccountContext } from '@/context/AccountContext';
// import { AppContext } from '@/context/userContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
}

const ProtectedRoute = ({
   children,
  }:ProtectedRouteProps) => {
  const { getSession } = useContext(AccountContext);
  // const { setIdToken } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check if the user has an active session
        const session = await getSession();
      } catch (error) {
        // If there is no active session, redirect to the login page
        console.log("No active session, redirecting to login")
        router.replace('/auth/login')
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