import { SignIn, Status } from '@/components/auth';
import { Navbar, Footer } from '@/components/shared';
import { Account } from '@/components/auth/account';
import React from 'react';

const Login = ({isAuthenticated}:any) => {
  return (
    <Account>
      {/* <Status /> */}
      <Navbar/>
      <SignIn />
      <Footer/>
    </Account>
  );
};

export default Login;
