import React,{useEffect} from 'react';
import { SignIn } from '@/components/auth';
import { Account } from '@/context/account';
import { PagesLayout } from '@/layouts';
import { useTheme } from 'next-themes';

const Login = () => {

  const { theme, setTheme } = useTheme()
  useEffect(()=>{
    setTheme('dark')
  })

  return (
    <Account>
      {/* <Status /> */}
      <PagesLayout>
        <SignIn />
      </PagesLayout>
    </Account>
  );
};

export default Login;
