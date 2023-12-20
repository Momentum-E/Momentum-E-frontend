import React,{useContext, useState} from 'react';
import { AccountContext } from '@/context/AccountContext';

import { Modal } from '@/components/shared';

type DeleteUserProps = {
    userId:string|null;
}

const DeleteUser:React.FC<DeleteUserProps>  = ({
    userId
}) => {
    const {DeleteUserAccount} = useContext(AccountContext);
    // const [email, ] = useState<string>("")
    const [Password,setPassword] = useState<string>('')
    let [isOpen, setIsOpen] = useState(false)
    const [enterField, setEnterField] = useState({
        // email: false,
        password: false
    })

    function DeleteUser() {
        setIsOpen(false)
        if(userId){
            DeleteUserAccount(userId,Password)
        }
    }

    function onButtonClick(){
        // && email !== ""
        if(Password !== ""){
            // setEnterField({
            //     email: false,
            //     password: false
            // })
            setIsOpen(true)
        }
        // else if(email === ""){
        //     setEnterField({
        //         email: true,
        //         password: false
        //     })
        // }
        else if(Password === ""){
            setEnterField({
                // email: false,
                password: true
            })
        }
        else{
            setEnterField({
                // email: true,
                password: true
            })
        }
    }

    return (
        <div className="space-y-2 border border-me-green-200 p-4 rounded-xl w-full">
            <p className='mt-2 text-center text-xl leading-9 text-black dark:text-white-100'>
                Delete Your Account 
                {/* <span className='text-base text-gray-400'>{" ( "+ name +" )"}</span> */}
            </p>
            <p className="text-gray-400">
                This will permanently delete your Momentum-E user account. 
                {/* <br />
                Enter your email:  */}
            </p>
            {/* <input 
                className={`border ${enterField.email ? 'border-red-600' : 'border-me-green-200 '} rounded-lg px-3 py-2 text-black dark:text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 active:outline-none w-full ease-linear transition-all duration-150 sm:text-sm sm:leading-6 `}
                type="text" 
                name="email" 
                id="email"
                value={email}
                required={true}
                onChange={(e)=>setEmail(e.target.value)} 
            /> */}

            <p className="text-gray-400 pt-4">
                Enter your password: 
            </p>
            <input 
                className={`border ${enterField.password ? 'border-red-600' : 'border-me-green-200 '} rounded-lg px-3 py-2 text-black dark:text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 active:outline-none w-full ease-linear transition-all duration-150 sm:text-sm sm:leading-6 `}
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
                buttonClass={`p-1 rounded-lg border border-red-600 text-red-600 hover:bg-red-600 hover:text-white-100`} 
                modalFunction={DeleteUser} 
            />
        </div>
    )
}

export default DeleteUser