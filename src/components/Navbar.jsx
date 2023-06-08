import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logos/logo_white_nocap.png' 

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    // </Disclosure>
    <Disclosure as="nav" className="relative z-10 bg-gray-800">
      {
      ({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* expanded image */}
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src={logo}
                    alt="Momentum-E"
                  />
                  {/* reduced image */}
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src={logo}
                    alt="Momentum-e"
                  />
                </div>
                <div className="hidden lg:mx-auto sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link
                      to="/"
                      className={'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                      }
                    >
                      Home
                    </Link>
                    <a
                      href="#aboutus"
                      className={'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                      }
                    >
                      About Us
                    </a>
                    <Link
                      to='/login'
                      className={'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                      }
                    >
                      Login
                    </Link>
                    <Link
                      to='/register'
                      className={'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                      }
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Disclosure.Button>
                <Link
                  to='/'
                  className={classNames(
                    'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                  )}>
                    Home
                </Link>
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#aboutus"
              >
                <span className={classNames(
                  'text-gray-300 w-1/5 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                )}>
                  About Us
                </span>
              </Disclosure.Button>
              <Disclosure.Button>
                <Link
                  to="/login"
                  className={classNames(
                    'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  >
                    Login
                </Link>
              </Disclosure.Button>
              <Disclosure.Button>
                <Link
                  to='/register'
                  className={classNames(
                    'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  Register
                </Link>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}