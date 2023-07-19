import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AccountContext } from '../../context/account';
import { Login } from '@/pages/auth';

const ProtectedRoute = ({ children }: any) => {
  const { getSession,isAuthenticated } = useContext(AccountContext);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check if the user has an active session
        await getSession();
        router.replace('/dashboard')
      } catch (error) {
        // If there is no active session, redirect to the login page
        router.push('/auth/login')
      }
    };
    checkAuthentication();
  }, [getSession, router]);

  return (
    <>
      {children}
    </>
  )
};

export default ProtectedRoute;
