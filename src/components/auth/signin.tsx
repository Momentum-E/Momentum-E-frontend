import React, { useState, useContext } from 'react';
import { AccountContext } from '../../context/account';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useRouter } from 'next/router';
import ConfirmSignup from '@/pages/auth/confirmSignup';
import AuthInput from '@/components/auth/AuthComponents/AuthInput';

const SignIn = () => {
  const { authenticate } = useContext(AccountContext);
  
  // const router = useRouter();
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
    if (err.code === 'NotAuthorizedException') {
      const errorMessage = err.message || 'An unknown error occurred.';
      toast.error(errorMessage);
    }
    if (err.code === 'UserNotConfirmedException') {
      const errorMessage = err.message + 'Please verify your email.';
      //AWS error message with a toast message
      toast.error(errorMessage);
      setUserConfirmed(false)
    }
    else {
      console.error(err);
    }
  };


  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    
    authenticate(input.email, input.password)
    .then((data: any) => {
      // check is the email is verified
        console.log(data)
      })
      .catch((err: any) => {
        handleAWSError(err);
      });
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
