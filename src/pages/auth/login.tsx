import { SignIn, Status } from '@/components/auth';
import { Account } from '@/context/account';
import React from 'react';
import { PagesLayout } from '@/layouts';

const Login = ({isAuthenticated}:any) => {
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
