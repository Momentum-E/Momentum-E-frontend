import React, { useState } from 'react';
import Pool from '../../context/user-pool/user-pool';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { useRouter } from 'next/router';

import {PagesLayout} from '@/layouts/'
import AuthInput from './AuthComponents/AuthInput';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState('request');
  const router = useRouter();

  var userData = {
    Username: username,
    Pool: Pool,
  };
  const user = new CognitoUser(userData);

  const initiateForgotPassword = async () => {
    // Should add code to implement if the email is present in the database
    // and only then run the code below
    user.forgotPassword({
      onSuccess: function (data) {
        console.log(data);
        toast.success('Code sent to ' + data.CodeDeliveryDetails.Destination);
        setStep('confirm');
      },
      onFailure: function (err) {
        toast.error(err.message || JSON.stringify(err));
      },
    });
  };

  const confirmForgotPassword = async () => {
    user.confirmPassword(confirmationCode, newPassword, {
      onSuccess() {
        toast.success('Password reset confirmed!');
        router.push('/auth/login/');
      },
      onFailure(err) {
        console.log(err);
        toast.error('Password reset not confirmed!');
      },
    });
  };

  return (
    <PagesLayout>
      <section className="relative w-full h-full py-20 min-h-screen">
        <div className="flex min-h-full max-w-lg mx-auto px-6 flex-1 flex-col justify-center py-12 lg:px-8">
          
          {step === 'request' && (
            <>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-white-100">
                  Confirm OTP sent on your email to Register
                </h2>
              </div>
              <AuthInput
                outerDiv='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'
                labelName='Enter your email:'
                labelFor='email'
                isRequired={true}
                inputType='email'
                inputAutocomplete='email'
                inputClassname='border-me-green-200'
                inputValue={username}
                inputOnChange={(e) => setUsername(e.target.value)}
                >
                  <button
                    type="submit"
                    onClick={initiateForgotPassword}
                    className="flex w-full mt-10 justify-center rounded-md bg-me-green-200 hover:bg-me-green-200/90 text-black py-2.5 text-center text-sm font-semibold shadow-sm">
                    Confirm OTP
                  </button>
                </AuthInput>

              
            </>
          )}
          {step === 'confirm' && (
            <form>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-white-100">
                  Confirm OTP sent on your email to Register
                </h2>
              </div>
              
              <div className="mt-10 space-y-7 sm:mx-auto sm:w-full sm:max-w-sm">
                
                <AuthInput
                    outerDiv=''
                    labelName='Confirmation Code:'
                    labelFor='token'
                    isRequired={true}
                    inputType='number'
                    inputAutocomplete='one-time-code'
                    inputClassname={`border-me-green-200`}
                    inputValue={confirmationCode}
                    inputOnChange={(e) => setConfirmationCode(e.target.value)}
                    // children={null}
                  />

                <AuthInput
                    outerDiv=''
                    labelName='New Password:'
                    labelFor='password'
                    isRequired={true}
                    inputType='password'
                    inputAutocomplete='new-password'
                    inputClassname={`border-me-green-200`}
                    inputValue={newPassword}
                    inputOnChange={(e) => setNewPassword(e.target.value)}
                    // children={null}
                  />

                <button
                  type="submit"
                  onClick={confirmForgotPassword}
                  className="flex w-full mt-10 justify-center rounded-md bg-me-green-200 hover:bg-me-green-200/90 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Confirm OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
      <ToastContainer />
    </PagesLayout>
  );
};

export default ForgotPassword;
