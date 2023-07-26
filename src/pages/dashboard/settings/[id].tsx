import React,{useState} from 'react'
import { DashboardLayout } from '@/layouts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context/userContext';
import Pool from '@/context/user-pool/user-pool';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

import AuthInput from '@/components/AuthInput';

const DashboardSettings = () => {
  const {userId}:any = useAppContext()

  const [OldPassword, setOldPassword] = useState<string>('')
  const [NewPassword, setNewPassword] = useState<string>('')

  const changeUserPassword= () => {
    const user = Pool.getCurrentUser();
    // const AwsAccessToken = localStorage.getItem('CognitoIdentityServiceProvider.5anhoi3gpfgvnqsd609smuh0qi.e113adfa-1041-707e-a338-dd09ed225f53.accessToken')
    if (user) {
      const authenticationDetails = new AuthenticationDetails({
        // Username: cognitoUser.getUsername(),
        Username:userId,
        Password: OldPassword,
      });

      const userData = {
        // Username: cognitoUser.getUsername(),
        Username:userId,
        Pool: Pool,
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: () => {
          cognitoUser.changePassword(OldPassword, NewPassword, (err) => {
            if (err) {
              toast.error(err.message)
            } else {
              toast.success('Password changed successfully!')
            }
          });
        },
        onFailure: (err) => {
          toast.error(err.message)
        },
      });
    }
  } 

  return (
    <DashboardLayout page={`settings / ${userId}`}>
      <div className="w-full max-h-full overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300 space-y-10 min-h-screen p-8 ">
        <div className="max-w-lg space-y-4 border border-me-green-200 p-4 rounded-xl">
          <p className='text-black dark:text-white-100'>Change Password</p>
          <AuthInput
            outerDiv=''
            labelName='Old Password'
            labelFor='password'
            isRequired={true}
            inputType='password'
            inputAutocomplete='current-password'
            inputClassname='border-me-green-200'
            inputValue={OldPassword}
            inputOnChange={(e)=>setOldPassword(e.target.value)}
            children={null}
          />
          <AuthInput
            outerDiv=''
            labelName='Last Name'
            labelFor='lastname'
            isRequired={true}
            inputType='password'
            inputAutocomplete='new-password'
            inputClassname='border-me-green-200'
            inputValue={NewPassword}
            inputOnChange={(e)=>setNewPassword(e.target.value)}
            children={null}
          />

          <button
            type="submit"
            onClick={()=>changeUserPassword()}
            className="flex justify-center rounded-md bg-me-green-200 hover:bg-me-green-200/90 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm">
              Change Password
          </button>
        </div>
      </div>
      <ToastContainer/>
    </DashboardLayout>      
  )
}

export default DashboardSettings