import React, { Fragment, useContext, useEffect, useState } from 'react';
import { DashboardNavbarProps } from '@/utils/props/props';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { AccountContext } from '../auth/account';
import Image from 'next/image';
import logo from '../../assets/logos/logo_white_nocap.png';
import axios from 'axios';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  setIsOpen,
  isOpen,
}) => {
  const { getSession, logout } = useContext(AccountContext);
  const [user, setUser] = useState(null);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const fetchuserdetails = async () => {
      try {
        const session = await getSession();
        const userId = session.idToken.payload.sub;
        const response = await axios.get(
          `http://localhost:5000/auth/users/${userId}`
        );
        console.log(response.data);
        setName(response.data.firstName);
        setUser(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchuserdetails();
  }, []);

  const SignOut = () => {
    logout();
  };

  return (
    <Disclosure as="nav" className="relative w-full z-10 bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button
                  className="inline-flex items-center justify-center rounded-md p-2 text-white-100 hover:bg-gray-700 hover:text-white-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsOpen(true)}>
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="block h-6 w-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="block w-6 h-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className="block h-10 w-auto lg:hidden"
                    src={logo}
                    alt="Momentum-E"
                  />
                  <Image
                    className="hidden h-10 w-auto lg:block"
                    src={logo}
                    alt="Momentum-E"
                  />
                </div>
              </div>
              <div className="absolute h-full inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div className="flex justify-center p-1 overflow-hidden text-ellipsis">
                    <span className="text-white-100 mr-2 overflow-hidden text-ellipsis hidden lg:flex lg:items-end">
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
                      <Menu.Item as={'ul'}>
                        {({ active }) => (
                          <li
                            className={classNames(
                              active ? 'bg-gray-700' : '',
                              'block px-4 py-2 rounded-md text-sm text-black hover:bg-white-200'
                            )}>
                            Your Profile
                          </li>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <li
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm rounded-md text-black hover:bg-white-200 '
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
                              'block px-4 py-2 text-sm rounded-md text-black hover:bg-white-200'
                            )}>
                            Sign out
                          </li>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default DashboardNavbar;
