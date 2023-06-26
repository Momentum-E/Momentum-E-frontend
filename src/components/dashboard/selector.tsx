//! TODO: Change this
//@ts-nocheck
import React, { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { SelectorProps } from '@/utils/props/selector-props';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const Selector: React.FC<SelectorProps> = ({
  data,
  selected,
  setSelected,
  id,
}) => {
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? data
      : //@ts-ignore
        data.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <Combobox value={selected} onChange={setSelected} required>
      <div className="relative mt-1">
        <div className="relative cursor-default overflow-hidden text-left">
          <Combobox.Input
            required
            autoComplete={'id'}
            id={id}
            className="block w-full border border-[#C6DE41] px-2 py-2 text-white-100 bg-transparent rounded text-sm focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
            displayValue={(person) => person.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-white-200 hover:text-me-green-100"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}>
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white-100 py-1 text-base shadow-lg ring-1 ring-me-green-100 ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredPeople.map((person, i) => (
                <Combobox.Option
                  key={i}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-me-green-100' : 'text-black'
                    }`
                  }
                  value={person}>
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}>
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-black' : 'text-me-green-100/100'
                          }`}>
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default Selector;
