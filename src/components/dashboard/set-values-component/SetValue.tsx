import React, { Fragment, useContext } from 'react'
import { useTheme } from 'next-themes';
import { Popover, Transition } from '@headlessui/react';
import { AppContext } from '@/context/userContext';

const SetValue = () => {

    const { theme, setTheme } = useTheme()
    const {unit, setUnit} = useContext(AppContext)

    return (
        <Popover as="div" className=" absolute right-12 bottom-8 translate-x-1/2 translate-y-1/2">
            <Popover.Button className={`flex items-center justify-center p-1 bg-white-100 dark:bg-gray-900 border border-gray-900 dark:border-white-100 rounded-full md:order-2 `}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
            </Popover.Button>
            <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            >
                <Popover.Panel className="absolute space-y-2 right-0 bottom-10">
                    {/* <Popover.Item> */}
                    <div className="w-24 h-full bg-white-100 p-1 rounded-lg border border-gray-900">
                        <button className="block w-full bg-white-100 link text-black py-1" onClick={()=> setTheme( theme === "dark"? "light": "dark" )}>
                            { theme==="dark"? 
                                <div className='flex flex-row w-full space-x-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                    </svg>
                                    <span>Light</span>
                                </div>
                                : 
                                <div className='flex flex-row w-full space-x-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                    </svg>
                                    <span>Dark</span>
                                </div>
                            }
                        </button>   
                        
                        <button className="flex link w-full py-1 justify-center text-black text-normal" onClick={()=> setUnit( unit === (""||'Km')? "Mi": "Km")}>
                            <span className="">{unit}</span>
                        </button>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
  )
}

export default SetValue