import React, {Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react';

const getInTouch = () => {

    let [isOpen, setIsOpen] = useState(false) 
    let [userMessage, setUserMessage] = useState({
        name:'',
        email:'',
        message:''
    })

    const onInputChange = (e:any) => {
        const { name, value } = e.target;
        setUserMessage((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    const onMessageSubmit = () => {
        ()=>setIsOpen(false)
    }
    return (
    <>
        <div className="flex flex-row mx-auto space-x-5 rounded-lg  py-4 px-4 max-w-xl bg-white-100">
            <div className="flex flex-1 flex-col space-y-5 justify-between h-full w-full text-sm text-[#060E02]">
            <h2 className='text-black text-xl font-bold text-left'>GET IN TOUCH WITH US</h2>
            <p className='h-full'>
                <span className='text-center'>
                Get in touch with us to enquire about our product
                </span>
            </p>
            </div>
            <div className='flex items-center justify-center'>
            <button
            type="button"
            onClick={()=>setIsOpen(true)}
            className="rounded-md bg-me-green-200 px-4 py-2 font-medium text-white hover:bg-me-green-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#060E02]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
            </button>
            </div>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white-100 p-6 text-left align-middle shadow-xl transition-all">
                    <div className="w-full lg:pt-0">
                        <div className="flex w-full">
                            <div className="flex flex-col flex-auto lg:p-10 min-w-0 break-words w-full">
                                {/* <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                                Complete this form and we will get back to you in 24 hours.
                                </p> */}
                                <div className="space-y-4">
                                    <div className="relative w-full">
                                        <label
                                        className="block uppercase text-xs font-bold pb-2"
                                        htmlFor="full-name">
                                        Full Name
                                        </label>
                                        <input
                                        id='full-name'
                                        type="text"
                                        autoComplete='name'
                                        value={userMessage.name}
                                        onChange={(e)=>onInputChange(e)}
                                        className="border-b border-[#C6DE41] px-3 py-2 text-white bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150"
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label
                                        className="block uppercase text-xs font-bold pb-2"
                                        htmlFor="email">
                                        Email
                                        </label>
                                        <input
                                        id='email'
                                        type="email"
                                        value={userMessage.email}
                                        onChange={(e)=>onInputChange(e)}
                                        autoComplete='email'
                                        className="border-b border-[#C6DE41] px-3 py-2 text-white bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150"
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label
                                        className="block uppercase text-xs font-bold pb-4"
                                        htmlFor="message"
                                        >
                                        Message
                                        </label>
                                        <textarea
                                        id='message'
                                        rows={4}
                                        cols={80}
                                        value={userMessage.message}
                                        onChange={(e)=>onInputChange(e)}
                                        className="border border-[#C6DE41] px-3 py-3 text-white bg-transparent rounded text-sm focus:outline-none focus:ring-0 w-full"
                                        placeholder="Type a message..."
                                        />    
                                    </div>

                                    <div className="text-right mt-6">
                                        <button
                                        className=" hover:bg-white bg-[#C6DE41] text-black active:bg-[#C6DE4180] text-xs font-normal uppercase px-2 py-2 rounded-lg hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={()=>onMessageSubmit()}
                                        >
                                        Send Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default getInTouch