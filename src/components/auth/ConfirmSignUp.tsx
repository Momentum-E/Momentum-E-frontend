import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '../../context/user-pool/user-pool';
import axios from 'axios';

type ConfirmSignUpProps ={
    username:string;
    setGetUserDataProcess:React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmSignUp = ({
    username,
    setGetUserDataProcess
}:ConfirmSignUpProps) => {
      
    const [OTP, setOTP] = useState('');

    const user = new CognitoUser({
        Username: username,
        Pool: userPool,
      });

    const verifyAccount = (e: any) => {
        e.preventDefault();
        // console.log(user);
        // user.confirmRegistration(OTP, true, (err, data) => {
        // if (err) {
        //     console.log(err);
        //     toast.error(err.message);
        // } else {
        //     console.log(data);
        //     toast.success('Account verified successfully');
        //     setGetUserDataProcess(true)
        // }
        // })
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/users/confirm`,{
        headers:{
                OTP:OTP,
                userId:username
            }
        })
        .then((res) => {
            console.log(res.data)
            toast.success('Account verified successfully');
            setGetUserDataProcess(true)
        })
        .catch((err) => {
            toast.error(err.message);
        })
    }
    
    const resendConfirmationCode = () => {
        // user.resendConfirmationCode(function(err, result) {
        //     if (err) {
        //         // alert(err.message || JSON.stringify(err));
        //         toast.success('Error occured in sending the code.')
        //         return;
        //     }
        //     console.log('call result: ' + result);
        //     toast.success('Kindly check your email for the new code.')
        // });
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/users/resend`,{
            headers:{
                userId:username
            }
        })
        .then((res) => {
            console.log(res.data)
            toast.success('Kindly check your email for the new code.')
        })
        .catch((err) => {
            toast.error(err.message);
            toast.error('Error occured in sending the code.')
        })
    }

    return (
        <div className="relative w-full h-full py-32 min-h-screen">
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
                        inputMode="numeric"
                        required={true}
                        autoComplete="email"
                        className="block border-b border-[#C6DE41] px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150 sm:text-sm sm:leading-6"
                        value={OTP}
                        onChange={(e) => setOTP(e.target.value)}
                    />
                    </div>
                </div>
                <button
                    type='button'
                    className='block text-sm font-medium leading-6 text-white-200 hover: hover:underline'
                    onClick={resendConfirmationCode}
                >
                    Resend Cofirmation Code
                </button>
                <div>
                    <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-me-green-200 hover:bg-me-green-200/90 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Confirm OTP
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default ConfirmSignUp