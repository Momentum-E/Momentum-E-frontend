import React, { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { SelectorProps } from '@/utils/props';

const Selector: React.FC<SelectorProps> = ({
  data,
  selected,
  setSelected,
  id,
}) => {
  const [query, setQuery] = useState('');

  const filteredLocation =
    query === '' ? data : 
      data.filter((value:string|any) =>
        (value.name||value)
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      );


  return (
    <Combobox aria-required value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <div className="relative cursor-default overflow-hidden text-left">
          <Combobox.Input
            required
            autoComplete={'id'}
            id={id}
            className="block w-full border border-me-green-200 p-2 text-black dark:text-white-100 bg-transparent rounded text-sm focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
            displayValue={(value:string|any) => value.name||value}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-white-200 hover:text-me-green-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}>
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white-100 py-1 text-base shadow-lg ring-1 ring-me-green-100 ring-opacity-5 focus:outline-none sm:text-sm">
            {
              (filteredLocation.length === 0 && query !== '') 
              ? 
              (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) 
              : 
              (
                filteredLocation.map((location:string|any, i:number) => (
                  <Combobox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-me-green-100' : 'text-black'
                      }`
                    }
                    value={location}>
                    {
                    ({ selected, active }) => 
                    (
                      <>
                        <span
                          className={`block truncate text-white-100${
                            selected ? 'font-medium' : 'font-normal'
                          }`}>
                          {location.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-black' : 'text-me-green-100/100'
                            }`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                          </span>
                        ) 
                        : 
                        null
                        }
                      </>
                    )}
                  </Combobox.Option>
                ))
              )
            }
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default Selector;
