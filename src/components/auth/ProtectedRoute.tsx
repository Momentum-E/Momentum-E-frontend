import React,{useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import { AccountContext } from './account'

const ProtectedRoute = ({Component,accountContext}:any) => {
  const { getSession } = useContext(AccountContext);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check if the user has an active session
        await getSession();
        router.replace('/dashboard')
      } catch (error) {
        // If there is no active session, redirect to the login page
        router.replace('/auth/login');
      }
    };
    checkAuthentication();
  }, [getSession, router]);

    return (
      <Component accountContext={accountContext}/>
    );
}

export default ProtectedRoute