import React,{useEffect} from 'react';
import { SignIn } from '@/components/auth';
import { PagesLayout } from '@/layouts';
import { useTheme } from 'next-themes';

const Login = () => {

  const { setTheme } = useTheme()
  useEffect(()=>{
    setTheme('dark')
  })

  return (
    <PagesLayout>
      <SignIn />
    </PagesLayout>
  );
};

export default Login;
