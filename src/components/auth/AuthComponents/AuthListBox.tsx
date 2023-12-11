import React,{ Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react';
import { AuthListBoxProps } from '@/utils/props';

const AuthListBox = ({
  isRequired,
  labelName,
  id,
  data,
  selected,
  setSelected
}:AuthListBoxProps) => {
  return (
    <div className='relative mt-1'>
      <Listbox value={selected} onChange={setSelected} name={id}>
        <div className="cursor-default overflow-hidden text-left">
          <Listbox.Label
            className="block text-sm font-medium leading-6 dark:text-white-100">
            {labelName}
            {
              isRequired && <span className="text-red-500 pl-1">*</span>
            }
          </Listbox.Label>
          <Listbox.Button role='combobox' name={id} aria-required className="flex text-center w-full border border-me-green-200 p-2 text-black dark:text-white-100 bg-transparent rounded text-sm focus:outline-none focus:ring-0 sm:text-sm sm:leading-6">
            {/* <span className="">{value.name||value}</span> */}
            {selected.name}
            <svg xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 ml-auto text-white-200 hover:text-me-green-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </Listbox.Button>
        </div>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white-100 py-1 text-base shadow-lg ring-1 ring-me-green-100 ring-opacity-5 focus:outline-none sm:text-sm">
            {/* <Listbox.Option 
              value={''} 
              defaultChecked={true}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-me-green-100' : 'text-black'
                }`
              }></Listbox.Option> */}
            {
              data.map((location:Record<any,any>, i:number) => 
                (
                <Listbox.Option
                  // refName={id}
                  key={i}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-me-green-100' : 'text-black'
                    }`
                  }
                  value={location}
                >
                  {({ selected, active }) => 
                  (
                    <>
                      <span
                        className={`block truncate text-white-100${
                          selected ? 'font-medium' : 'font-normal'
                        }`}>
                        {location.name}
                      </span>
                      {selected && 
                      (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-black' : 'text-me-green-100/100'
                          }`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </span>
                      ) 
                      }
                    </>
                  )}
                </Listbox.Option>
              ))
            }
          </Listbox.Options>
        </Transition>
      </Listbox>
      {
        // For validating if the user has entered the details or not
        isRequired && 
        <div
        className="isolate opacity-0 select-none" aria-hidden="true" tabIndex={-1}
        style={Object.assign({},
            {"cursor": "pointer"}
        )}
        >
            <div className="absolute z-10 w-full h-[1px] bottom-[15px] opacity-0 left-0" aria-hidden="true" tabIndex={-1}></div>
            <select onClick={() => {}} onChange={()=>{}} tabIndex={-1} value={selected.name} name="" required={isRequired} aria-hidden="true" autoCapitalize="off" autoComplete={"off"} className="w-full z-10 h-[1px] select-none pointer-events-none text-white-100 bg- absolute bottom-[15px] left-0 !outline-none opacity-0 shadow-none appearance-none">
                <option value="" defaultChecked={true} aria-hidden="true"></option>
                {data.map((e: any, i: number) => {
                    return <option key={i} value={e.name} aria-hidden="true">{e.name}</option>
                })}
            </select>
        </div>
      }
    </div>
  )
}

export default AuthListBox