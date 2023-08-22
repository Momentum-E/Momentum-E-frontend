import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';

import GetUserDataComponent from '@/components/auth/GetUserDataComponent'; 

const GetUserData = () => {

  const { theme, setTheme } = useTheme()
  useEffect(()=>{
    setTheme('dark')
  })

  return (
    <>
      <GetUserDataComponent
        heading={'This is the last step'}
        page={'get-user-data'}
        formDiv={`w-full h-full mb-10 space-y-10 min-h-screen mx-auto max-w-xl sm:mt-20`}
        userId={null}
        userEmail={null}
        buttonName={'Update Credentials'}
      />
    </>
  );
};

export default GetUserData;
