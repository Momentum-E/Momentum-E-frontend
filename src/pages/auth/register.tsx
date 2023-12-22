import React,{useEffect} from 'react';
import { SignUp } from '@/components/auth';
import { PagesLayout } from '@/layouts';
import { useTheme } from 'next-themes';

const Register = () => {
  
  const { setTheme } = useTheme()
  useEffect(()=>{
    setTheme('dark')
  })

  return (
    <PagesLayout>
      <SignUp />
    </PagesLayout>
  );
};

export default Register;
