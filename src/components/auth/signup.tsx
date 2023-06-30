// @ts-nocheck
import React, { useState, useEffect } from 'react';
import userPool from '../user-pool/user-pool';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Switch } from '@headlessui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ConfirmSignUp from '@/pages/auth/confirmSignup';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Signup = () => {
  // router can be used to redirect to dashboard
  const router = useRouter();

  const [agreed, setAgreed] = useState(false);
  const [errorData, setErrorData] = useState<undefined | any>();
  const [verifyProcess, setVerifyProcess] = useState(false);
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAWSError = (err: any) => {
    if (err.code === 'InvalidPasswordException') {
      const errorMessage = err.message || 'An unknown error occurred.';
      setErrorData(errorMessage);
      //AWS error message with a toast message
      toast.error(errorData);
    }
    if (err.code === 'UsernameExistsException') {
      const errorMessage = err.message || 'User already present.';
      setErrorData(errorMessage);
      //AWS error message with a toast message
      toast.success(errorData);
    } else {
      console.error(err);
    }
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // const attributeList = [];
    // attributeList.push(
    //   new CognitoUserAttribute({
    //     Name: 'email',
    //     Value: input.email,
    //   })
    // );
    userPool.signUp(input.email, input.password, [], null, (err, data) => {
      if (err) {
        // console.log(err)
        handleAWSError(err);
      } else {
        // router.replace('/auth/confirmSignup');
        console.log(data);
        setVerifyProcess(true);
        toast.success('Please confirm your email to continue');
      }
    });
    localStorage.setItem('password', input.password);
    localStorage.setItem('email', input.email);
  };

  return (
    <div className="">
      {verifyProcess === false ? (
        <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl pb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white-100 sm:text-4xl">
              Sign Up
            </h2>
            <p className="mt-2 text-lg leading-8 text-white-100">
              First step towards a statistical approach in understanding your EV
              battery
            </p>
          </div>

          <form
            action="#"
            method="POST"
            onSubmit={(event) => onSubmit(event)}
            className="mx-auto max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {/* <div className="sm:col-span-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold leading-6 text-white-100">
                  Username<span className="text-red-500 pl-1">*</span>
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required={true}
                    autoComplete="username"
                    className="border-b border-[#C6DE41] px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150 sm:text-sm sm:leading-6"
                    value={input.username}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div> */}
              
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-white-100">
                  Email<span className="text-red-500 pl-1">*</span>
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required={true}
                    autoComplete="email"
                    className="border-b border-[#C6DE41] px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150 sm:text-sm sm:leading-6"
                    value={input.email}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold leading-6 text-white-100">
                  Password<span className="text-red-500 pl-1">*</span>
                </label>
                <div className="mt-2.5">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required={true}
                    autoComplete="password"
                    className={`${
                      input.password != input.confirmPassword
                        ? `border-b border-red-500`
                        : `border-me-green-200`
                    } border-b  px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150`}
                    value={input.password}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold leading-6 text-white-100">
                  Confirm Password<span className="text-red-500 pl-1">*</span>
                </label>
                <div className="mt-2.5">
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    required={true}
                    autoComplete="password"
                    className={`${
                      input.password != input.confirmPassword
                        ? `border-b border-red-500`
                        : `border-me-green-200`
                    } border-b  px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150`}
                    value={input.confirmPassword}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="sm:col-span-2 space-y-2">
                {/* Matching Password Error */}
                {input.password != input.confirmPassword && (
                  <div className="w-full text-sm font-semibold leading-6 text-red-500 bg-red-200 opacity-100 flex items-center justify-center">
                    Passwords do not match
                  </div>
                )}

                {/* AWS Cognito Password Authentication */}
                {/* <div className="w-full text-sm font-semibold leading-6 text-red-500 bg-red-200 opacity-100 flex items-center justify-center">
                    {errorData}
                  </div> */}

                <div className="text-xs font-semibold text-white-100">
                  <ul>
                    <li>Password must be minimum of 8 characters.</li>
                    <li>Password must have uppercase characters</li>
                    <li>Password must have numbers.</li>
                    <li>Password must have symbol characters</li>
                  </ul>
                </div>
              </div>

              <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <Switch
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                    className={classNames(
                      agreed ? ' bg-me-green-100 ' : 'bg-white-100 ',
                      'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-white-200 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-white-100'
                    )}>
                    <span className="sr-only">Agree to policies</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        agreed
                          ? 'translate-x-3.5 bg-white-100 '
                          : 'translate-x-0 bg-me-green-100 ',
                        'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-white-100/5 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </div>
                <Switch.Label
                  htmlFor={'policy_agreement'}
                  className="text-sm leading-6 text-white-100">
                  By selecting this, you agree to our{' '}
                  <Link href="/" className="font-semibold text-indigo-600">
                    privacy&nbsp;policy
                  </Link>
                  .
                </Switch.Label>
              </Switch.Group>
            </div>

            <div className="mt-10">
              <button
                disabled={
                  input.password === input.confirmPassword && agreed
                    ? false
                    : true
                }
                type="submit"
                className={`${
                  input.password === input.confirmPassword && agreed
                    ? `hover:bg-me-green-100 `
                    : ` `
                } block w-full rounded-md bg-me-green-200 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                Register
              </button>
            </div>
          </form>
        </div>
      ) : (
        <ConfirmSignUp username={input.email} password={(input.password)}/>
      )}
      <ToastContainer />
    </div>
  );
};

export default Signup;
