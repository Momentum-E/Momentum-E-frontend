import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useTheme } from 'next-themes';

import { ConfirmSignUp } from '@/components/auth';
import GetUserData from './get-user-data';

type ConfirmSignupProps = {
  username:string;
}

const ConfirmSignup = ({ 
  username 
}:ConfirmSignupProps) => {
  
  const { setTheme } = useTheme()
  useEffect(()=>{
      setTheme('dark')
  })

  const [getUserDataProcess, setGetUserDataProcess] = useState(false)

  return (
    <div>
      {
        getUserDataProcess === false ?
        (
          <ConfirmSignUp 
            username={username}
            setGetUserDataProcess={setGetUserDataProcess}
          />
        )
        :
        (
          <GetUserData/>
        )
      }
      <ToastContainer />
    </div>
  );
};
export default ConfirmSignup;
