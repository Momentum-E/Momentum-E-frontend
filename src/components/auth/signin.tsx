import React, { useState, useContext } from 'react';
import { AccountContext } from './account';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const SignIn = () => {
  const router = useRouter();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  // const [errorData, setErrorData] = useState();

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
      // setErrorData(errorMessage);
      //AWS error message with a toast message
      toast.error(errorMessage);
    }
    else {
      console.error(err);
    }
  };

  const { authenticate } = useContext(AccountContext);

  const handleLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    authenticate(input.email, input.password)
      .then((data: any) => {
        router.replace('/dashboard');
      })
      .catch((err: any) => {
        console.error('error', err);
        handleAWSError(err);
      });
  };

  return (
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
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white-100">
                  Email address<span className="text-red-500 pl-1">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required={true}
                    autoComplete="email"
                    className="border-b border-[#C6DE41] px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150 sm:text-sm sm:leading-6"
                    value={input.email}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={'password'}
                    className="block text-sm font-medium leading-6 text-white-100">
                    Password<span className="text-red-500 pl-1">*</span>
                  </label>
                  <div className="text-sm">
                    <Link
                      href="/"
                      className="font-semibold text-white-200 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id={'password'}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required={true}
                    className="border-b border-[#C6DE41] px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150 sm:text-sm sm:leading-6"
                    value={input.password}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex justify-center w-full rounded-md bg-me-green-200 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Log In
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-white-100">
              Not a member?{' '}
              <Link
                href="/auth/register"
                className="font-semibold leading-6 text-white-200 hover:text-indigo-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
      <ToastContainer />
    </main>
  );
};

export default SignIn;
