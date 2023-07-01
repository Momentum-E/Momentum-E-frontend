import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { City, Country, State } from 'country-state-city';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Selector } from '@/components/dashboard';
import { Listbox, Transition } from '@headlessui/react';
import axios from 'axios';

const owner_type = [{ type: 'Individual Owner' }, { type: 'Fleet Owner' }];

const GetUserData = () => {
  const countryData = Country.getAllCountries();

  const [stateData, setStateData] = useState<any>();
  const [cityData, setCityData] = useState<any>();
  const [country, setCountry] = useState<any>('');
  const [state, setState] = useState<any>('');
  const [city, setCity] = useState<any>('');
  const [ownerType, setOwnerType] = useState(owner_type[0]);
  const [companyName, setCompanyName] = useState('');
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
  });

  const router = useRouter();

  useEffect(() => {
    return setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    return setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      userId: localStorage.getItem('userId'),
      email: localStorage.getItem('email'),
      firstName: input.firstName,
      lastName: input.lastName,
      owner_type: ownerType.type,
      address: {
        country: country?.isoCode,
        state: state?.isoCode,
        city: city?.name,
      },
      company_name: companyName,
    };

    axios('http://localhost:5000/auth/signup', {
      method: 'POST',
      data: formData,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // console.log(formData);
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    toast.success('User successfully created');
    router.replace('/auth/login');
  };

  return (
    <form
      method="POST"
      onSubmit={onSubmit}
      className="w-full h-full mb-10 space-y-10 min-h-screen mx-auto max-w-xl sm:mt-20">
      <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-100">
        This is the last step! Please enter a few more information
      </p>
      <div className="grid grid-cols-1 px-5 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="country"
            className="block text-sm font-semibold leading-6 text-white-100">
            Type of Owner<span className="text-red-500 pl-1">*</span>
          </label>
          <Listbox value={ownerType} onChange={setOwnerType}>
            <div className="relative mt-2">
              <Listbox.Button className="relative block w-full border border-[#C6DE41] px-2 py-2 text-white-100 text-left bg-transparent rounded text-sm group focus:outline-none focus:ring-0 sm:text-sm sm:leading-6">
                <span className="block truncate">{ownerType.type}</span>
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
                  {owner_type.map((owner, typeIdx) => (
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
        {ownerType.type === 'Individual Owner' ? (
          <>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold leading-6 text-white-100">
                First name
                <span className="text-red-500 pl-1">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required={true}
                  autoComplete="given-name"
                  className="block w-full border-b border-[#C6DE41] px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 ease-linear transition-all duration-150 sm:text-sm sm:leading-6"
                  value={input.firstName}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold leading-6 text-white-100">
                Last name
                <span className="text-red-500 pl-1">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required={true}
                  autoComplete="family-name"
                  className="block w-full border-b border-[#C6DE41] px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 ease-linear transition-all duration-150 sm:text-sm sm:leading-6"
                  value={input.lastName}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold leading-6 text-white-100">
              Company Name:
              <span className="text-red-500 pl-1">*</span>
            </label>
            <input
              type="text"
              name="company"
              id="company"
              required={true}
              autoComplete="company"
              className="block w-full mt-2.5 border-b border-[#C6DE41] px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 ease-linear transition-all duration-150 sm:text-sm sm:leading-6"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        )}

        <div className="sm:col-span-2 mt-2.5 space-y-8">
          <div>
            <label
              htmlFor="country"
              className="block text-sm mb-2.5 font-semibold leading-6 text-white-100">
              Country<span className="text-red-500 pl-1">*</span>
            </label>
            <Selector
              id={'country'}
              data={countryData}
              selected={country}
              setSelected={setCountry}
            />
          </div>

          <div>
            {state && (
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-semibold leading-6 text-white-100">
                  State<span className="text-red-500 pl-1">*</span>
                </label>
                <Selector
                  id={'state'}
                  data={stateData}
                  selected={state}
                  setSelected={setState}
                />
              </div>
            )}
          </div>

          <div>
            {city && (
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-semibold leading-6 text-white-100">
                  City<span className="text-red-500 pl-1">*</span>
                </label>
                <Selector
                  id={'city'}
                  data={cityData}
                  selected={city}
                  setSelected={setCity}
                />
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="flex justify-center sm:col-span-2 w-full rounded-md bg-me-green-200 hover:bg-me-green-200/90 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Register
            </button>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </form>
  );
};

export default GetUserData;
