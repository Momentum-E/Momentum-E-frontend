import { useState } from 'react';
import Link from 'next/link';
import { useAccountContext } from '@/context/AccountContext';

import { SidebarLightLogo } from '@/utils/sidebar_icons';

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  
  const {isAuthenticated} = useAccountContext()
  
  return (
    <nav className="w-full shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        {/* <div> */}
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <h2 className="text-2xl font-bold text-white-100">
                <figure>
                  <SidebarLightLogo/>
                </figure>
              </h2>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}>
                {
                navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white-100"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) 
                : 
                (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        {/* </div> */}

        {/* Navbar in mobile mode */}
        {/* <div> */}
          <div className={`justify-self-center pb-3 md:hidden mt-8 md:pb-0 md:mt-0 ${navbar ? 'block' : 'hidden'}`}>
            <ul className="items-center justify-center space-y-5 md:flex md:space-x-6 md:space-y-0">
              <li>
                <Link 
                  href="/"
                  className="px-4 py-2 text-white-100 hover:text-indigo-200">
                  Home
                </Link>
              </li>
            {
              !isAuthenticated ?
              (
                <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                  <Link
                    // data-testid="pricing-nav"
                    href="/pricing"
                    className="px-4 py-2 text-white-100 hover:text-indigo-200">
                    Pricing
                  </Link>
                  <Link
                    // data-testid="login-nav"
                    href="/auth/login"
                    className="inline-block w-full px-4 py-2 text-center text-white-100 rounded-md shadow hover:bg-gray-700/4">
                    Log In
                  </Link>
                  <Link
                    // data-testid="register-nav"
                    href="/auth/register"
                    className="inline-block w-full px-4 py-2 text-center text-white-100 rounded-md shadow bg-gray-700/40">
                    Sign Up
                  </Link>
                </div>
              ):
              (
                <div className="">
                  <Link
                    // data-testid="dashboard-nav"
                    href="/dashboard/"
                    className="inline-block w-full px-4 py-2 text-center text-white-100 bg-gray-600 rounded-md shadow hover:bg-gray-700/40">
                    Dashboard
                  </Link>
                </div>
              )
            }
            </ul>
          </div>
        {/* </div> */}

        {/* Navbar in desktop mode */}
        <div className="hidden md:flex rounded-2xl space-x-5 mx-5 justify-center bg-gray-800/30">
          <Link
            data-testid="home-nav"
            href="/"
            className="px-4 py-3 text-white-100 shadow rounded-s-xl hover:border-b-2 hover:border-me-green-200">
            Home
          </Link>
          {/* <Link
            href="/#aboutus"
            className="px-4 py-2 text-white-100 shadow hover:border-b-2 hover:border-me-green-200">
            About Us
          </Link> */}
          {
            !isAuthenticated ?
            (
              <>
                <Link
                  data-testid="login-nav"
                  href="/auth/login"
                  className="px-4 py-3 text-white-100 shadow hover:border-b-2 hover:border-me-green-200">
                  Log In
                </Link>
                <Link
                  data-testid="register-nav"
                  href="/auth/register"
                  className="px-4 py-3 text-white-100 shadow hover:border-b-2 hover:border-me-green-200">
                  Sign Up
                </Link>
                <Link
                  data-testid="pricing-nav"
                  href="/pricing"
                  className="ease-in-out duration-300 flex items-center justify-center px-4 py-3 group text-white-100 shadow bg-[#1B1C1E] hover:bg-me-green-200 rounded-xl">
                  <span className="flex flex-row items-center justify-around group-hover:text-[#1B1C1E]">
                    Pricing
                    <span className="bg-me-green-200 group-hover:bg-[#1B1C1E] rounded-full ml-2 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ease-in-out duration-300 group-hover:rotate-45 group-hover:text-white-100 text-[#1B1C1E] ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </>
            ):
            ( 
              <>
                <Link
                  data-testid="pricing-nav"
                  href="/pricing"
                  className="px-4 py-3 text-white-100 shadow  hover:border-b-2 hover:border-me-green-200">
                  Pricing
                </Link>
                <Link
                  data-testid="dashboard-nav"
                  href="/dashboard"
                  className="ease-in-out duration-300 flex items-center justify-center px-4 py-3 group text-white-100 shadow bg-[#1B1C1E] hover:bg-me-green-200 rounded-xl">
                  <span className="flex flex-row items-center justify-around group-hover:text-[#1B1C1E]">
                    Dashboard
                    <span className="bg-me-green-200 group-hover:bg-[#1B1C1E] rounded-full ml-2 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ease-in-out duration-300 group-hover:rotate-45 group-hover:text-white-100 text-[#1B1C1E] ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </>
            )
          }
        </div>
      </div>
    </nav>
  )
}
