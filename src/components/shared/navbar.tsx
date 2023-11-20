import { useState } from 'react';
import Link from 'next/link';
import { useAccountContext } from '@/context/account';

import { SidebarLightLogo } from '@/utils/sidebar_icons';

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  
  const {isAuthenticated} = useAccountContext()
  
  return (
    <nav className="w-full shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-6xl md:items-center md:flex md:px-8">
        <div>
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
        </div>

        {/* Navbar in mobile mode */}
        <div>
          <div
            className={`justify-self-center pb-3 md:hidden mt-8 md:pb-0 md:mt-0 ${
              navbar ? 'block' : 'hidden'}`}
          >
            <ul className="items-center justify-center space-y-5 md:flex md:space-x-6 md:space-y-0">
              <li>
                <Link 
                  href="/"
                  className="px-4 py-2 text-white-100 hover:text-indigo-200">
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  className="px-4 py-2 text-white-100 hover:text-indigo-200"
                  href="/about-us">
                  About Us
                </Link>
              </li>
            {
              !isAuthenticated ?
              (
                <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                  <Link
                    href="/pricing"
                    className="px-4 py-2 text-white-100 hover:text-indigo-200">
                    Pricing
                  </Link>
                  <Link
                    href="/auth/login"
                    className="inline-block w-full px-4 py-2 text-center text-white-100 rounded-md shadow hover:bg-gray-700/4">
                    Log In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="inline-block w-full px-4 py-2 text-center text-white-100 rounded-md shadow bg-gray-700/40">
                    Sign Up
                  </Link>
                </div>
              ):
              (
                <div className="">
                  <Link
                  href="/dashboard/"
                  className="inline-block w-full px-4 py-2 text-center text-white-100 bg-gray-600 rounded-md shadow hover:bg-gray-700/40">
                  Dashboard
                </Link>
                </div>
              )
            }
            </ul>
          </div>
        </div>

        {/* Navbar in desktop mode */}
        <div className="hidden space-x-2 md:inline-block">
          <Link
            href="/"
            className="px-4 py-2 text-white-100 shadow hover:border-b-2 hover:border-me-green-200">
            Home
          </Link>
          <Link
            href="/#aboutus"
            className="px-4 py-2 text-white-100 shadow hover:border-b-2 hover:border-me-green-200">
            About Us
          </Link>
          {
            !isAuthenticated ?
            (
              <>
                <Link
                  href="/pricing"
                  className="px-4 py-2 text-white-100 shadow hover:border-b-2 hover:border-me-green-200">
                  Pricing
                </Link>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-white-100 shadow hover:border-b-2 hover:border-me-green-200">
                  Log In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 text-white-100 shadow border-b-2 border-gray-700 hover:border-me-green-200">
                  Sign Up
                </Link>
              </>
            ):
            (
              <Link
                href="/dashboard/"
                className="px-4 py-2 text-white-100 shadow hover:border-b-2 hover:border-me-green-200">
                Dashboard
              </Link>
            )
          }
        </div>
      </div>
    </nav>
  )
}
