import React,{useState} from 'react'
import Pool from '../user-pool/user-pool'
// import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { ToastContainer,toast } from 'react-toastify';
// import AWS from 'aws-sdk';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { useRouter } from 'next/router';

const ForgotPassword = () => {
    // AWS.config.update({ region: 'ap-south-1' });    
    const [username, setUsername] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState('request');
    // const [errorMessage, setErrorMessage] = useState('');
    // const [success, setSuccess] = useState('');
    const router = useRouter()
    
    var userData = {
        Username: username,
        Pool: Pool,
    };
    const user = new CognitoUser(userData);

    const initiateForgotPassword = async () => {
        // const cognitoClient = new CognitoIdentityServiceProvider();
        // try {
        // await cognitoClient.forgotPassword({
        //     ClientId: '5anhoi3gpfgvnqsd609smuh0qi',
        //     Username: username,
        // }).promise();
        // setStep('confirm');
        // toast.success('email present')
        // } catch (error:any) {
        //     console.log('err:' + error.message);
        //     toast.error(error.message + '. Email not present')
        // }
        
        user.forgotPassword({
            onSuccess: function(data) {
                console.log(data)
                toast.success('Code sent to:' + data)
                setStep('confirm');
            },
            onFailure: function(err) {
                toast.error(err.message || JSON.stringify(err))
            },
        });
    };

  const confirmForgotPassword = async () => {
    // const cognitoClient = new CognitoIdentityServiceProvider();

    // try {
    //   await cognitoClient.confirmForgotPassword({
    //     ClientId: 'YOUR_APP_CLIENT_ID',
    //     ConfirmationCode: confirmationCode,
    //     Password: newPassword,
    //     Username: username,
    //   }).promise();

    //   console.log('Password reset successfully!');
    //   toast.success('Password reset successfully!')
    // } catch (error:any) {
    //     console.log(error.message);
    //     toast.error(error.message)
    // }
    
    user.confirmPassword(confirmationCode, newPassword, {
        onSuccess() {
            console.log('Password confirmed!');
            toast.success('Password confirmed!')
            router.push('/auth/login/')
        },
        onFailure(err) {
            console.log('Password not confirmed!');
            toast.error('Password not confirmed!')
        },
    });
  };

    return (
        <div className='relative w-full h-full py-20 min-h-screen'>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                {step === 'request' && (
                    <div>
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-white-100">
                                Confirm OTP sent on your email to Register
                            </h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-white-100">
                            Enter your email:
                        </label>
                        <div className="mt-2">
                            <input
                            id="email"
                            name="email"
                            type="text"
                            required={true}
                            autoComplete="email"
                            className="block border-b border-[#C6DE41] px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150 sm:text-sm sm:leading-6"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            onClick={initiateForgotPassword}
                            className="flex w-full mt-10 justify-center rounded-md bg-me-green-200 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Confirm OTP
                        </button>
                        </div>
                    </div>
                )}
                {step === 'confirm' && (
                  
                    <div>
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-white-100">
                                Confirm OTP sent on your email to Register
                            </h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <label
                                htmlFor="token"
                                className="block text-sm font-medium leading-6 text-white-100">
                                Confirmation Code:
                            </label>
                            <div className="">
                                <input
                                type="number" 
                                name="token" 
                                id="token" 
                                required={true}
                                autoComplete="email"
                                className="block border-b border-[#C6DE41] px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150 sm:text-sm sm:leading-6"
                                value={confirmationCode} 
                                onChange={(e) => setConfirmationCode(e.target.value)}
                                />
                            </div>
                            
                            <label
                                htmlFor="password"
                                className="block text-sm mt-3 font-medium leading-6 text-white-100">
                                New Password:
                            </label>
                            <div className="">
                                <input
                                id="password"
                                name="password"
                                type="text"
                                required={true}
                                autoComplete="email"
                                className="block border-b border-[#C6DE41] px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150 sm:text-sm sm:leading-6"
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                />
                            </div>

                            <button
                                type="submit"
                                onClick={confirmForgotPassword}
                                className="flex w-full mt-10 justify-center rounded-md bg-me-green-200 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Confirm OTP
                            </button>
                        </div>
                    </div>
                )}
            </div>
        <ToastContainer/>
        </div>
    );
}

export default ForgotPassword