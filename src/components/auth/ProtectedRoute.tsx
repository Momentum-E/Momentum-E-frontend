import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AccountContext } from '../../context/account';

const ProtectedRoute = ({ children }: any) => {
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
    checkAuthentication();
  }, [getSession]);

  return (
    <div>
      {children}
    </div>
  )
};

export default ProtectedRoute;