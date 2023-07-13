import React, { useContext, useEffect, useState } from 'react';
import { DashboardNavbarProps } from '@/utils/props/props';
import { Disclosure,} from '@headlessui/react';
import { AccountContext } from '@/context/account';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserSideMenu } from './navbar-component';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  setIsOpen,
  isOpen,
  page,
  name,
  id,
}) => {

  // const { getSession } = useContext(AccountContext);
  // const [user, setUser] = useState(null);
  // const [name, setName] = useState<string>('');
  // const [id, setId] = useState<string>('');

  
  // useEffect(() => {
  //   const fetchuserdetails = async () => {
    //     try {
  //       const session = await getSession();
  //       const userId = session.idToken.payload.sub;
  //       const response = await axios.get(
    //         `http://localhost:5000/auth/users/${userId}`
    //       );
    //       console.log(response.data);
    //       setName(response.data.firstName);
    //       setId(response.data.userId);
    //       setUser(response.data);
    //     } catch (error) {
      //       console.error('Error:', error);
      //     }
      //   };
      
      //   fetchuserdetails();
      // }, []);

  const router = useRouter();
  const { vehicleId } = router.query;

  return (
    <Disclosure as="nav" className="relative w-full z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="w-full md:w-3/4">
                <div className={`absolute inset-y-0 left-0 flex items-center md:hidden`}>
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
                <div className="flex flex-1 pt-0 md:pt-3 items-center justify-center md:items-stretch md:justify-start">
                  <div className="flex flex-col flex-shrink-0">
                    <p className='text-white-100 text-sm hidden md:block'> 
                      <span className='text-gray-400'>Dashboard</span> / {vehicleId||page}
                    </p>
                    <span className="text-xl md:text-md text-white-100 whitespace-pre flex flex-shrink-0">Dashboard</span>
                  </div>
                </div>
              </div>
              <UserSideMenu name={name} page={page} id={id}/>

            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default DashboardNavbar;