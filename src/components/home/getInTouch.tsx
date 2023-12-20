import React from 'react'
// , {Fragment, useState }
// import { Dialog, Transition } from '@headlessui/react';

const getInTouch = () => {

    // let [isOpen, setIsOpen] = useState(false) 
    // const [name, setName] = useState("")
    // const [email, setEmail] = useState("")
    // const [message, setMessage] = useState("")
    
    // const onMessageSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault()
    //   setIsOpen(false)
    // }

    return (
    <>
      <div id='Get_In_Touch' className="relative flex flex-row mx-auto space-x-5 rounded-lg py-4 px-4 my-16 max-w-xl bg-white-100">
        <div className="absolute -translate-y-1/3 -translate-x-12 rounded-full w-[400px] h-[400px] bg-me-green-100/30 blur-[120px]"></div>
        <div className="flex flex-1 flex-col space-y-5 justify-between h-full w-full text-sm text-[#060E02]">
          <h2 className='text-black text-xl font-bold text-left'>GET IN TOUCH WITH US</h2>
          <p className=''>
            Get in touch with us to enquire about our product
          </p>
        </div>
        <div className='flex items-center justify-center'>
          {/* <button
          type="button"
          onClick={()=>setIsOpen(true)}
          className="rounded-md bg-me-green-200 px-4 py-2 font-medium text-white hover:bg-me-green-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#060E02]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button> */}
          <a href="mailto:info@momentum-e.com" className="group rounded-md bg-me-green-200 px-4 py-2 font-medium text-white hover:bg-me-green-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#060E02] group-hover:rotate-45">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>
      </div>
    </>
    // <Transition appear show={isOpen} as={Fragment}>
    //   <Dialog as="div" className="relative z-10" onClose={()=>setIsOpen(false)}>
    //     <Transition.Child
    //       as={Fragment}
    //       enter="ease-out duration-300"
    //       enterFrom="opacity-0"
    //       enterTo="opacity-100"
    //       leave="ease-in duration-200"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <div className="fixed inset-0 bg-black bg-opacity-25" />
    //     </Transition.Child>

    //     <div className="fixed inset-0 overflow-y-auto">
    //       <div className="flex min-h-full items-center justify-center p-4 text-center">
    //         <Transition.Child
    //           as={Fragment}
    //           enter="ease-out duration-300"
    //           enterFrom="opacity-0 scale-95"
    //           enterTo="opacity-100 scale-100"
    //           leave="ease-in duration-200"
    //           leaveFrom="opacity-100 scale-100"
    //           leaveTo="opacity-0 scale-95"
    //         >
    //           <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white-100 p-6 text-left align-middle shadow-xl transition-all">
    //               <div className="w-full lg:pt-0">
    //                   <div className="flex w-full">
    //                       <div className="flex flex-col flex-auto lg:p-10 min-w-0 break-words w-full">
    //                           <form action="" method="post" onSubmit={(e)=>onMessageSubmit(e)}>
    //                             <div className="space-y-4 text-black">
    //                               <div className="relative w-full">
    //                                   <label
    //                                     className="block uppercase text-xs font-bold pb-2"
    //                                     htmlFor="full-name">
    //                                     Full Name
    //                                     <span className="text-red-500 pl-1">*</span>
    //                                   </label>
    //                                   <input
    //                                     id='full-name'
    //                                     type="text"
    //                                     required={true}
    //                                     autoComplete='name'
    //                                     value={name}
    //                                     onChange={(e)=>setName(e.target.value)}
    //                                     className="border-b border-[#C6DE41] px-3 py-2 text-white bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150"
    //                                   />
    //                               </div>

    //                               <div className="relative w-full mb-3">
    //                                 <label
    //                                   className="block uppercase text-xs font-bold pb-2"
    //                                   htmlFor="email"
    //                                 >
    //                                   Email
    //                                   <span className="text-red-500 pl-1">*</span>
    //                                 </label>
    //                                 <input
    //                                   id='email'
    //                                   type="email"
    //                                   required={true}
    //                                   value={email}
    //                                   onChange={(e)=>setEmail(e.target.value)}
    //                                   autoComplete='email'
    //                                   className="border-b border-[#C6DE41] px-3 py-2 text-white bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150"
    //                                 />
    //                               </div>

    //                               <div className="relative w-full mb-3">
    //                                 <label
    //                                   className="block uppercase text-xs font-bold pb-4"
    //                                   htmlFor="message"
    //                                 >
    //                                   Message
    //                                   <span className="text-red-500 pl-1">*</span>
    //                                 </label>
    //                                 <textarea
    //                                   id='message'
    //                                   rows={4}
    //                                   cols={80}
    //                                   required={true}
    //                                   className="border border-[#C6DE41] px-3 py-3 bg-transparent rounded text-sm focus:outline-none focus:ring-0 w-full"
    //                                   placeholder="Type a message..."
    //                                   value={message}
    //                                   onChange={(e)=>setMessage(e.target.value)}
    //                                 />    
    //                               </div>

    //                               <div className="text-right mt-6">
    //                                 <button
    //                                 className=" hover:bg-white bg-[#C6DE41] text-black active:bg-[#C6DE4180] text-xs font-semibold uppercase px-2 py-2 rounded-lg hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
    //                                 type="submit"
    //                                 >
    //                                   Send Message
    //                                 </button>
    //                               </div>
    //                             </div>
    //                           </form>
    //                       </div>
    //                   </div>
    //               </div>                
    //           </Dialog.Panel>
    //         </Transition.Child>
    //       </div>
    //     </div>
    //   </Dialog>
    // </Transition> 
  )
}

export default getInTouch