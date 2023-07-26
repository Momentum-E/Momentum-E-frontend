import React,{useEffect} from 'react';
import { SignUp } from '@/components/auth';
import { PagesLayout } from '@/layouts';
import { useTheme } from 'next-themes';

const Register = () => {
  
  const { theme, setTheme } = useTheme()
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
