import React,{Fragment, useContext,} from 'react'
import  {Menu, Transition} from '@headlessui/react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import { AccountContext } from '@/context/account';
import { UserSideMenuProps } from '@/utils/props/props';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

const UserSideMenu:React.FC<UserSideMenuProps> = ({
    name,
    id
}) => {

    const router = useRouter()
    const {logout} = useContext(AccountContext);

    const SignOut = () => {
    logout();
    };
    
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
                {/* {
                page==='profile' ? ( */}
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
                {/* ):
                ( */}
                <Menu.Item>
                {({ active }) => (
                    <li
                    className={classNames(
                        active ? 'bg-gray-700' : '',
                        'block px-4 py-2 rounded-md text-sm text-black hover:bg-white-200 hover:cursor-pointer'
                    )}
                    onClick={() => router.replace(`/dashboard/profile/${id}`)}
                    >
                    Your Profile
                    </li>
                )}
                </Menu.Item>
                {/* )
                } */}
                <Menu.Item>
                {({ active }) => (
                    <li
                    className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm rounded-md text-black hover:bg-white-200 hover:cursor-pointer'
                    )}
                    onClick={()=>router.replace(`/dashboard/settings/${id}`)}
                    >
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
                </Menu.Items>
            </Transition>
        </Menu>
    </div>
  )
}

export default UserSideMenu