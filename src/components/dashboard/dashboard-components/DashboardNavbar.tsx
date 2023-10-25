import React from 'react';
import { DashboardNavbarProps } from '@/utils/props';
import { Disclosure,} from '@headlessui/react';
import { UserSideMenu } from './navbar-component';

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  webSocket,
  setIsOpen,
  isOpen,
  page,
  name,
  id,
  userImage,
  isImageLoading,
  setName,
  setVehicleData,
  setUserCity,
  setUserState,
  setUserCountry,
  setUserEmail
}) => {

  return (
    <Disclosure as="nav" className="relative w-full z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="w-full md:w-3/4">
                <div className={`absolute inset-y-0 flex items-center md:hidden`}>
                  <Disclosure.Button
                    className="inline-flex items-center justify-center rounded-md p-2 border border-black dark:border-white-100 text-black dark:text-white-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setIsOpen(true)}>
                    <span className="sr-only">Open main menu</span>
                    {isOpen ? 
                    (
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
                    ) 
                    : 
                    (
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
                    <p className='dark:text-white-100 text-sm hidden md:block'> 
                      <span className='text-gray-400'>
                        Dashboard
                      </span> 
                      {" / " + page}
                    </p>
                    <span className="text-xl md:text-md dark:text-white-100 whitespace-pre flex flex-shrink-0">
                      Dashboard
                    </span>
                  </div>
                </div>
              </div>
              <UserSideMenu 
                webSocket={webSocket}
                userImage={userImage} 
                name={name} 
                id={id}
                isImageLoading={isImageLoading}
                setName={setName}
                setVehicleData={setVehicleData}
                setUserCity={setUserCity}
                setUserState={setUserState}
                setUserCountry={setUserCountry}
                setUserEmail={setUserEmail}
              />
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default DashboardNavbar;