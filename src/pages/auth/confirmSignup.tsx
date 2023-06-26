// @ts-nochec
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import userPool from '../../components/user-pool/user-pool';
import { useRouter } from 'next/router';

const confirmSignup = ({username}:any) => {
  
  const router = useRouter();
  const [OTP, setOTP] = useState('')
  const verifyAccount = (e:any) => {
    e.preventDefault();
    const user = new CognitoUser({
      Username: username,
      Pool: userPool,
    });
    console.log(user);
    user.confirmRegistration(OTP, true, (err, data) => {
      if (err) {
        console.log(err);
        toast.error("Couldn't verify account");
      } else {
        console.log(data);
        toast.success('Account verified successfully');
        router.replace('/GetUserData')
      }
    });
  };

  return (
    <main>
      <section className="relative w-full h-full py-32 min-h-screen">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-white-100">
              Confirm OTP sent on your email to Register
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={(event) => verifyAccount(event)}>
              <div>
                <label
                  htmlFor="OTP"
                  className="block text-sm font-medium leading-6 text-white-100">
                  Confirm OTP
                </label>
                <div className="mt-2">
                  <input
                    id="OTP"
                    name="otp"
                    type="text"
                    pattern="[0-9]*"
                    inputMode='numeric'
                    required={true}
                    autoComplete="email"
                    className="block border-b border-[#C6DE41] px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150 sm:text-sm sm:leading-6"
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-me-green-200 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Confirm OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </main>
  );
};
export default confirmSignup;
