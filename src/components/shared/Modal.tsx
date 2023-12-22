import React,{ Fragment }  from 'react'
import { Dialog, Transition } from '@headlessui/react'

type ModalProps = {
    isOpen:boolean;
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>;
    title:string;
    content:string;
    buttonClass:string;
    modalFunction:() => void;
}

const Modal = ({
    isOpen,
    setIsOpen,
    title,
    content,
    buttonClass,
    modalFunction,
}:ModalProps) => {

    function onClickFunction(){
        modalFunction()
        setIsOpen(false)
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[9999]" onClose={()=>setIsOpen(false)}>
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
                        <Dialog.Panel className="w-full border-2 border-me-green-200 bg-white-100 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg text-center font-medium text-black leading-6"
                            >
                                {title}
                            </Dialog.Title>
                            <div className="mt-2 text-medium text-center text-gray-600 leading-6">
                                {content}
                            </div>

                            <div className="mt-4 w-full flex justify-around">
                                <button
                                    type="button"
                                    className={`w-24 `+ buttonClass}
                                    onClick={()=>onClickFunction()}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    className={`w-24 px-2 border text-black bg-me-green-200 hover:bg-me-green-100 p-1 rounded-lg`}
                                    onClick={()=>setIsOpen(false)}
                                >
                                    No
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
    )
}

export default Modal