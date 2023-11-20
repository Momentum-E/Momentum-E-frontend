import React, { useState } from 'react';
import { useAccountContext } from '@/context/account';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from '@/context/user-pool/user-pool';
import 'react-toastify/dist/ReactToastify.css';

import ConfirmSignup from '@/pages/auth/confirmSignup';
import AuthInput from '@/components/auth/AuthComponents/AuthInput';

const SignIn = () => {
  const { setIsAuthenticated } = useAccountContext();
  
  const router = useRouter();
  const [userConfirmed, setUserConfirmed] = useState(true)
  const [Input, setInput] = useState<{
    email:string;
    password:string;
  }>({
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
    if (err.code === 'NotAuthorizedException') {
      const errorMessage = err.message || 'An unknown error occurred.';
      toast.error(errorMessage);
    }
    if (err.code === 'UserNotConfirmedException') {
      const errorMessage = err.message + 'Please verify your email.';
      toast.error(errorMessage);
      setUserConfirmed(false)
    }
    else {
      console.error(err);
    }
  };


  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // const authenticate = async (Username:string, Password:string) => {
    const user = new CognitoUser({ Username:Input.email, Pool });
    const authDetails = new AuthenticationDetails({ Username:Input.email, Password:Input.password });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log('onSuccess: ', data);
        setIsAuthenticated(true);

        window.history.replaceState({
          fromHashChange: true
        },null, '/dashboard');
        // router.replace('/dashboard','/dashboard')
        window.location.reload()
      },
      onFailure: (err) => {
        console.error('onFailure: ', err);
        handleAWSError(err)
        setIsAuthenticated(false);
      },
      newPasswordRequired: (data) => {
        console.log('newPasswordRequired: ', data);
        alert('New password required, kindly change your password.')
      },
    });
    // };
    
    // authenticate(input.email, input.password)
    // .then((data: any) => {
    //   // check is the email is verified
    //     console.log(data)
    //   })
    //   .catch((err: any) => {
    //     handleAWSError(err);
    //   });
  };

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
                    inputValue={Input.email}
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
                    inputValue={Input.password}
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
        <ConfirmSignup username={Input.email}/>
      )
    }
    <ToastContainer />
    </>
  );
};

export default SignIn;
