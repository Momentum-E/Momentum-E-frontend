import { SignUp } from '@/components/auth';
import React from 'react';
import { Navbar,Footer } from '@/components/shared';
import { PagesLayout } from '@/layouts';

const Register = () => {
  return (
    <PagesLayout>
      <SignUp />
    </PagesLayout>
  );
};

export default Register;
