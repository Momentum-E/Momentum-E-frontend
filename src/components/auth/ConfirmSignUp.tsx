// @ts-nocheck
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import userPool from "../../context/user-pool/user-pool";
// import { useRouter } from 'next/router';
import { useAccountContext } from "@/context/AccountContext";

type ConfirmSignUpProps = {
  password?: string;
  username: string;
  // handleLogin:(event: {
  //     preventDefault: () => void;
  // }) => Promise<void>
};

const ConfirmSignUp = ({ password, username }: ConfirmSignUpProps) => {
  const { setIsAuthenticated } = useAccountContext();
  // const router = useRouter();
  const [OTP, setOTP] = useState("");
  // const [getUserDataProcess, setGetUserDataProcess] = useState(false)

//   console.log(
//     "Cognito User Pool ID:",
//     process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID
//   );
//   console.log("Cognito Client ID:", process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID);

  if (!username || !userPool) {
    console.error("Username or userPool is not defined");
    return null;
  }

  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  const handleAWSError = (err: any) => {
    if (err.code === "NotAuthorizedException") {
      const errorMessage = err.message || "An unknown error occurred.";
      toast.error(errorMessage);
    }
    if (err.code === "UserNotConfirmedException") {
      const errorMessage = err.message + "Please verify your email.";
      toast.error(errorMessage + " " + "Could not verify email");

      //setUserConfirmed(false)
    } else {
      console.error(err);
    }
  };

  const verifyAccount = (e: any) => {
    e.preventDefault();
    console.log(user);
    user.confirmRegistration(OTP, true, async (err, data) => {
      if (err) {
        console.log(err);
        toast.error(err.message);
      } else {
        console.log(data);
        toast.success("Account verified successfully");
        // setGetUserDataProcess(true)
        console.log("Confirm SignUp: ", username);
        // router.replace(`/auth/get-user-data?price_id=${price_id}?email=${username}`)
        if (password) {
          console.log("Logging In....");
          // const user = new CognitoUser({ Username:username, Pool });
          const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
          });

          user.authenticateUser(authDetails, {
            onSuccess: (data) => {
              console.log("onSuccess: ", data);
              setIsAuthenticated(true);

              window.history.replaceState(
                {
                  fromHashChange: true,
                },
                null,
                "/dashboard"
              );
              window.location.reload();
            },
            onFailure: (err) => {
              console.error("onFailure: ", err);
              handleAWSError(err);
              setIsAuthenticated(false);
            },
            newPasswordRequired: (data) => {
              console.log("newPasswordRequired: ", data);
              alert("New password required, kindly change your password.");
            },
          });
        } else {
          console.log("No Password Present");
        }
        // router.replace('/dasboard')
      }
    });
  };

  const resendConfirmationCode = () => {
    user.resendConfirmationCode(function (err, result) {
      if (err) {
        // alert(err.message || JSON.stringify(err));
        toast.success("Error occured in sending the code.");
        return;
      }
      console.log("call result: " + result);
      toast.success("A new code has been sent.");
    });
  };

  return (
    // <>
    // {
    //     getUserDataProcess === false ?
    //     (
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
            onSubmit={(event) => verifyAccount(event)}
          >
            <div>
              <label
                htmlFor="OTP"
                className="block text-sm font-medium leading-6 text-white-100"
              >
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
              type="button"
              className="block text-sm font-medium leading-6 text-white-200 hover: hover:underline"
              onClick={resendConfirmationCode}
            >
              Resend Cofirmation Code
            </button>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-me-green-200 hover:bg-me-green-200/90 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Confirm OTP
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
    //     )
    //     :
    //     (
    //     <GetUserData/>
    //     )
    // }
    // <ToastContainer />
    // </>
  );
};

export default ConfirmSignUp;
