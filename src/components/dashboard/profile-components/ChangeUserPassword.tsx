import React, { useState } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from '@/context/user-pool/user-pool';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthInput} from '@/components/auth/AuthComponents';

type ChangeUserPasswordProps = {
  userId:string|null;
}

const ChangeUserPassword:React.FC<ChangeUserPasswordProps>  = ({
  userId
}) => {

    const [OldPassword, setOldPassword] = useState<string>('')
    const [NewPassword, setNewPassword] = useState<string>('')

    const changeUserPassword = (event:any) => {
        event.preventDefault()
        const user = Pool.getCurrentUser();
        // const AwsAccessToken = localStorage.getItem('CognitoIdentityServiceProvider.5anhoi3gpfgvnqsd609smuh0qi.e113adfa-1041-707e-a338-dd09ed225f53.accessToken')
        if (user&&userId) {
          const authenticationDetails = new AuthenticationDetails({
            Username:userId,
            Password: OldPassword,
          });
    
          const userData = {
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
                  setOldPassword('')
                  setNewPassword('')
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
        <form onSubmit={(e)=>changeUserPassword(e)} className="space-y-4 border border-me-green-200 p-4 rounded-xl w-full" >
            <p className='text-center text-xl  leading-9  text-black dark:text-white-100'>Change Password</p>
            <AuthInput
              outerDiv='hidden'
              labelName='name'
              labelFor='name'
              isRequired={true}
              inputType='text'
              inputAutocomplete='name'
              inputClassname='border-me-green-200'
              inputValue={OldPassword}
              inputOnChange={(e)=>(e.target.value)}
              // children={null}
            />
            <AuthInput
              outerDiv=''
              labelName='Old Password'
              labelFor='oldPassword'
              isRequired={true}
              inputType='password'
              inputAutocomplete='current-password'
              inputClassname='border-me-green-200'
              inputValue={OldPassword}
              inputOnChange={(e)=>setOldPassword(e.target.value)}
              // children={null}
            />
            <AuthInput
              outerDiv=''
              labelName='New Password'
              labelFor='newPassword'
              isRequired={true}
              inputType='password'
              inputAutocomplete='new-password'
              inputClassname='border-me-green-200'
              inputValue={NewPassword}
              inputOnChange={(e)=>setNewPassword(e.target.value)}
              // children={null}
            />
            <div className="w-full flex justify-center">
              <button
                  type="submit"
                  // onClick={changeUserPassword}
                  className="flex justify-center rounded-md bg-me-green-200 hover:bg-me-green-200/90 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm">
                  Change Password
              </button>
            </div>
        </form>
  )
}

export default ChangeUserPassword