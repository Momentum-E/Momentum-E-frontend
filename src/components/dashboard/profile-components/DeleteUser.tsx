import React,{useContext, useState} from 'react';
import { AccountContext } from '@/context/account';

import { Modal } from '@/components/shared';

const DeleteUser = ({userId}:string|any) => {
    const {DeleteUserAccount} = useContext(AccountContext);
    const [Password,setPassword] = useState('')
    let [isOpen, setIsOpen] = useState(false)
    const [enterPassword, setEnterPassword] = useState(false)

    function DeleteUser() {
        setIsOpen(false)
        DeleteUserAccount(userId,Password)
    }

    function onButtonClick(){
        if(Password != ""){
            setEnterPassword(false)
            setIsOpen(true)
        }
        else{
            setEnterPassword(true)
        }
    }

    return (
        <div className="space-y-2 border border-me-green-200 p-4 rounded-xl">
            <p className='mt-2 text-center text-xl leading-9 text-black dark:text-white-100'>
                Delete Your Account 
                {/* <span className='text-base text-gray-400'>{" ( "+ name +" )"}</span> */}
            </p>
            <p className="text-gray-400">
                This will permanently delete your Momentum-E user account. 
                <br />
                Enter your password to delete account: 
            </p>
            <input 
                className={`border ${enterPassword ? 'border-red-600' : 'border-me-green-200 '} rounded-lg px-3 py-2 text-black dark:text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 active:outline-none w-full ease-linear transition-all duration-150 sm:text-sm sm:leading-6 `}
                type="password" 
                name="password" 
                id="password"
                value={Password}
                required={true}
                onChange={(e)=>setPassword(e.target.value)} 
            />
            <button
            // onClick={DeleteUserAccount(userId,Password)}
            type='submit'
            id='password'
            onClick={()=>onButtonClick()}
            className='p-1 rounded-lg border border-red-600 text-red-600'
            >
                Delete User
            </button>
            <Modal 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                title={`Confirm delete Momentum-e account`}
                content={'By clicking yes all including your account all your vehicles data will also be deleted '}
                buttonClass={`p-1 rounded-lg border border-red-600 text-red-600`} 
                modalFunction={DeleteUser} 
            />
        </div>
    )
}

export default DeleteUser