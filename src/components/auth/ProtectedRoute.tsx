import React,{Children, useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import { AccountContext } from './account'

const ProtectedRoute = (Component:any) => {
  const ComponentWithAuth = (props:any) => {
    const { getSession } = useContext(AccountContext);
    const router = useRouter();
    useEffect(() => {
      checkAuthentication();
    }, [getSession, router]);
    const checkAuthentication = async () => {
      try {
        // Check if the user has an active session
        await getSession();
        // router.replace('/dashboard')
      } catch (error) {
        // If there is no active session, redirect to the login page
        router.push('/auth/login');
      }
    };
    return <Component {...props}/>
  }

    return ComponentWithAuth
}

export default ProtectedRoute