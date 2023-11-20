import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
// import { useRouter } from 'next/router';
import { GetUserDataComponent } from '@/components/auth/'; 

const GetUserData = () => {
  // const router = useRouter()
  // const {email,userId,price_id} = router.query
  const { setTheme } = useTheme()
  useEffect(()=>{
    setTheme('dark')
  })

  return (
    <GetUserDataComponent
      isRequired={true}
      heading={'This is the last step'}
      page={'get-user-data'}
      formDiv={`w-full h-full mb-10 space-y-10 min-h-screen mx-auto max-w-xl sm:mt-20`}
      userId={null}
      userEmail={null}
      buttonName={'Submit Credentials'}
    />
    );
};

export default GetUserData;
