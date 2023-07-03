import { SignUp } from '@/components/auth';
import React from 'react';
import { Navbar,Footer } from '@/components/shared';

const Register = () => {
  return (
    <>
      <Navbar/>
      <SignUp />
      <Footer/>
    </>
  );
};

export default Register;
