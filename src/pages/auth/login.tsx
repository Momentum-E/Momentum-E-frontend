import { SignIn, Status } from '@/components/auth';
import { Account } from '@/components/auth/account';
import React from 'react';

const Login = () => {
  return (
    <Account>
      {/* <Status /> */}
      <SignIn />
    </Account>
  );
};

export default Login;
