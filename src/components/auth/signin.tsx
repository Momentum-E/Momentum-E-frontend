// @ts-nocheck
import React, { useState } from 'react';
import { useAccountContext } from '@/context/account';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ConfirmSignup from '@/pages/auth/confirmSignup';
import AuthInput from '@/components/auth/AuthComponents/AuthInput';
import axios from 'axios';

const SignIn = () => {
  const { setIsAuthenticated,setAccessToken } = useAccountContext();
  
  const [userConfirmed, setUserConfirmed] = useState(true)
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
  const handleAWSError = (err:any) => {
    if (err === 'NotAuthorizedException') {
      toast.error('Incorrect Email or Password');
    }
    if (err === 'UserNotConfirmedException') {
      //AWS error message with a toast message
      toast.error('Please verify your email.');
      setUserConfirmed(false)
    }
    if(err === 'PasswordResetRequiredException'){
      toast.error('Password reset required for your account.');
    }
    else {
      console.error(err);
    }
  };


  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let data = JSON.stringify({
      "password": input.password,
      "email": input.email
    })  

    let config = {
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/login`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios.request(config)
    .then((res)=>{
      console.log(res.status)
      if(res.status === 200){
        setAccessToken(res.data.AuthenticationResult.AccessToken)
        localStorage.setItem('AccessToken',res.data.AuthenticationResult.AccessToken)
        localStorage.setItem('RefreshToken',res.data.AuthenticationResult.RefreshToken)
        localStorage.setItem("IdToken",res.data.AuthenticationResult.IdToken)
        // console.log(res.data)
        
        window.history.replaceState({
          fromHashChange: true
        },null, '/dashboard');
        
        window.location.reload()
        setIsAuthenticated(true);
      }
      else{
        handleAWSError(res.data);
      }
    })
    .catch((err)=>{
      console.log(err)
      // console.log("autherror: "+err.response.data.name)
      handleAWSError(err.response.data.name);
    })
  }

  return (
    <>
    {
      userConfirmed ? 
      (
        <main>
          <section className="relative w-full h-full py-20 min-h-screen">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-100">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                  className="space-y-6"
                  action="#"
                  method="POST"
                  onSubmit={(event) => handleLogin(event)}>

                  <AuthInput
                    outerDiv=''
                    labelName='Email'
                    labelFor='email'
                    isRequired={true}
                    inputType='email'
                    inputAutocomplete='email'
                    inputClassname='border-me-green-200'
                    inputValue={input.email}
                    inputOnChange={(e) => onInputChange(e)}
                    children={null}
                  />

                  <AuthInput
                    outerDiv=''
                    labelName='Password'
                    labelFor='password'
                    isRequired={true}
                    inputType='password'
                    inputAutocomplete='password'
                    inputClassname={`border-me-green-200`}
                    inputValue={input.password}
                    inputOnChange={(e) => onInputChange(e)}
                    children={null}
                  />

                  <button
                    type="submit"
                    className="flex justify-center w-full rounded-md bg-me-green-200 hover:bg-me-green-200/90 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm">
                    Log In
                  </button>
                </form>
                
                <div className="flex justify-between mt-6">
                  <Link
                    href="/auth/forgot-password"
                    className="font-base text-sm text-white-200 hover:underline">
                    Forgot password?
                  </Link>
                  <p className="text-center text-sm text-white-100">
                    Not a member?{' '}
                    <Link
                      href="/auth/register"
                      className="font-semibold leading-6 text-white-200 hover:underline">
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      ):
      (
        <ConfirmSignup username={input.email}/>
      )
    }
    <ToastContainer />
    </>
  );
};

export default SignIn;
