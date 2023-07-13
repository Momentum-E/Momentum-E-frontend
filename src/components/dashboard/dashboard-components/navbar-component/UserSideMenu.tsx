import React,{Fragment, useContext,} from 'react'
import  {Menu, Transition} from '@headlessui/react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import { AccountContext } from '@/context/account';
import { UserSideMenuProps } from '@/utils/props/props';
import { useTheme } from 'next-themes';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

const UserSideMenu:React.FC<UserSideMenuProps> = ({
    name,
    page,
    id
}) => {

    const router = useRouter()
    const {logout} = useContext(AccountContext);

    const SignOut = () => {
    logout();
    };

    const { theme, setTheme } = useTheme()
    
    return (
    <div className="absolute md:w-1/4 h-full inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {/* Profile dropdown */}  
        
        <Menu as="div" className="relative w-full ml-3">
            <div className="flex justify-end items-center p-1 overflow-hidden text-ellipsis">
            <span className="text-white-100 mr-2 h-[50%] overflow-hidden text-ellipsis hidden lg:flex lg:justify-center">
                Hello, {name}
            </span>
            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <Image
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Image of the person"
                width={100}
                height={100}
                />
            </Menu.Button>
            </div>
            <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items className="absolute right-0 z-10 p-1 w-48 mt-1 origin-top-right rounded-md bg-white-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                    {({ active }) => (
                    <li
                        className={classNames(
                        active ? 'bg-gray-700' : '',
                        'block px-4 py-2 rounded-md text-sm text-black hover:bg-white-200 hover:cursor-pointer'
                        )}
                        onClick={() => router.push('/')}>
                        Home
                    </li>
                    )}
                </Menu.Item>
                {
                page==='profile' ? (
                    <Menu.Item>
                    {({ active }) => (
                        <li
                        className={classNames(
                            active ? 'bg-gray-700' : '',
                            'block px-4 py-2 rounded-md text-sm text-black hover:bg-white-200 hover:cursor-pointer'
                        )}
                        onClick={() => router.replace('/dashboard/')}>
                        Dashboard
                        </li>
                    )}
                    </Menu.Item>
                ):
                (
                    <Menu.Item>
                    {({ active }) => (
                        <li
                        className={classNames(
                            active ? 'bg-gray-700' : '',
                            'block px-4 py-2 rounded-md text-sm text-black hover:bg-white-200 hover:cursor-pointer'
                        )}
                        onClick={() => router.replace('/dashboard/profile/' + id)}>
                        Your Profile
                        </li>
                    )}
                    </Menu.Item>
                )
                }
                <Menu.Item>
                {({ active }) => (
                    <li
                    className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm rounded-md text-black hover:bg-white-200 hover:cursor-pointer'
                    )}>
                    Settings
                    </li>
                )}
                </Menu.Item>
                <Menu.Item>
                {({ active }) => (
                    <li
                    onClick={() => SignOut()}
                    className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm rounded-md text-black hover:bg-white-200 hover:cursor-pointer'
                    )}>
                    Sign out
                    </li>
                )}
                </Menu.Item>
                <Menu.Item>
                {({ active }) => (
                    <li
                    onClick={() => SignOut()}
                    className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm rounded-md text-black hover:bg-white-200 hover:cursor-pointer'
                    )}>
                    <p className="">
                        Theme:
                    </p>
                    <div className="bg-white-100 absolute z-[999] bottom-0 right-0 -translate-x-1/2 -translate-y-1/2 rounded-full dark:bg-gray-900">
                        <div className="flex flex-wrap items-center justify-between">
                            <div className="flex md:order-2">
                                <ul className="flex flex-row p-2 md:space-x-8 md:mt-0 md:text-sm md:font-medium">            
                                <li>
                                    <button className="block rounded md:p-0" onClick={()=> setTheme( theme === "dark"? "light": "dark" )}>
                                    { theme==="dark"? 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                    </svg>
                                    : 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                    </svg>
                                    }
                                    </button>
                                </li>
                                </ul>
                            </div>
                        </div>
                    </div>
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