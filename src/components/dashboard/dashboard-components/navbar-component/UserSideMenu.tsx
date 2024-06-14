import React,{ Fragment, useContext } from 'react'
import  { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/router';
import { UserImage } from '@/components/dashboard/profile-components/UserImage';
import { useAccountContext } from '@/context/AccountContext';
import { AppContext } from '@/context/userContext';

import { UserSideMenuProps } from '@/utils/props';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const UserSideMenu:React.FC<UserSideMenuProps> = ({
    name,
    id
}) => {

    const router = useRouter()
    const {logout} = useAccountContext();
    const { 
        userImage,
        isImageLoading,
        webSocket,
        setName,
        setVehicleData,
        setUserCity,
        setUserState,
        setUserCountry,
        setUserEmail
    } = useContext(AppContext);

    const SignOut = () => {
        logout();
        // router.replace('/auth/login')  
        setName("")  
        setVehicleData([])
        setUserCity("")
        setUserState("")
        setUserCountry("")
        setUserEmail('')
        webSocket?.close()
    };
    
    return (
        <div className="absolute md:w-1/4 h-full inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}  
            
            <Menu as="div" className="relative w-full ml-3">
                <div className="flex items-center justify-end">
                    <p className="dark:text-white-100 mr-2 w-[80%] text-sm hidden lg:flex lg:justify-end">
                        <span className='overflow-hidden overflow-ellipsis'>
                            Welcome, {name===""?'User':name}
                        </span>
                    </p>
                    <div className="md:w-[20%]">
                        <Menu.Button className={`${userImage ? '' : 'p-1'} flex justify-end rounded-full focus:outline-none ring-2 ring-gray-700/50`}>
                            <UserImage 
                                userImage={userImage}
                                imageWidth={28}
                                imageHeight={28}
                                imageSize='h-8 w-8'
                                svgClassName='w-full'
                                loaderSize={12}    
                                isLoading={isImageLoading}
                            />
                        </Menu.Button>
                    </div>
                </div>
                <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute right-0 z-50 p-1 w-48 mt-1 origin-top-right rounded-md bg-white-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                        {({ active }) => (
                        <li
                            className={classNames(
                            active ? 'active ' : ' ',
                            'block link px-4 py-2 rounded-md text-sm text-black hover:cursor-pointer'
                            )}
                            onClick={() => router.replace('/')}>
                            Home
                        </li>
                        )}
                        </Menu.Item>
                        <Menu.Item>
                        {({ active }) => (
                            <li
                            className={classNames(
                                active ? 'active ' : '',
                                'block link px-4 py-2 rounded-md text-sm text-black hover:cursor-pointer'
                            )}
                            onClick={() => router.replace('/dashboard/')}>
                            Dashboard
                            </li>
                        )}
                        </Menu.Item>
                        <Menu.Item>
                        {({ active }) => (
                            <li
                            className={classNames(
                                active ? 'active ' : '',
                                'block link px-4 py-2 rounded-md text-sm text-black hover:cursor-pointer'
                            )}
                            onClick={() => router.replace(`/dashboard/profile/${id}`)}
                            >
                            Your Profile
                            </li>
                        )}
                        </Menu.Item>
                        <Menu.Item>
                        {({ active }) => (
                            <li
                            onClick={() => SignOut()}
                            className={classNames( 
                                active ? 'active ' : '',
                                'block link px-4 py-2 text-sm rounded-md text-black hover:cursor-pointer'
                            )}>
                            Sign out
                            </li>
                        )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default UserSideMenu