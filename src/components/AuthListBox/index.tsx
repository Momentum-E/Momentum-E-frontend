import React,{ Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react';
import { AuthListBoxProps } from '@/utils/props/props';

const AuthListBox = ({
    labelFor,
    isRequired,
    labelName,
    data,
    value,
    OnChange
}:AuthListBoxProps) => {
  return (
    <div className="sm:col-span-2">
      <Listbox value={value} onChange={OnChange}>
        <Listbox.Label
          // htmlFor={labelFor}
          // id={labelFor}
          className="block text-sm font-medium leading-6 dark:text-white-100">
          {labelName}
          {
            isRequired ? 
            <span className="text-red-500 pl-1">*</span>
            :
            null
          }
        </Listbox.Label>
        <div id={labelFor} className="relative mt-2">
            <Listbox.Button role="combobox" aria-required={isRequired} className="relative block w-full border border-[#C6DE41] h-10 px-2 py-2 dark:text-white-100 text-left bg-transparent rounded text-sm group focus:outline-none focus:ring-0 sm:text-sm sm:leading-6">
            <span className="block truncate">{value.type}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-white-200 group:hover:text-me-green-100">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white-100 py-1 text-base shadow-lg ring-1 ring-me-green-100 ring-opacity-5 focus:outline-none sm:text-sm">
              {data.map((owner, typeIdx) => (
                <Listbox.Option
                  key={typeIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-me-green-100' : 'text-black'
                    }`
                  }
                  value={owner}>
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}>
                        {owner.type}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default AuthListBox