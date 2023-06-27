import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { City, Country, State } from 'country-state-city';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Selector } from '@/components/dashboard';

const GetUserData = () => {
  const countryData = Country.getAllCountries();

  const [stateData, setStateData] = useState<any>();
  const [cityData, setCityData] = useState<any>();
  const [country, setCountry] = useState<any>();
  const [state, setState] = useState<any>();
  const [city, setCity] = useState<any>();
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

    // Log the form data
    const formData = {
      firstName: input.firstName,
      lastName: input.lastName,
      address: {
        country: country?.isoCode,
        state: state?.isoCode,
        city: city?.name,
      },
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password'),
    };
    console.log(formData);
    toast.success('User successfully created');
    router.replace('/dashboard');
  };

  return (
    <form
      method="POST"
      onSubmit={onSubmit}
      className="w-full h-full py-10 space-y-10 min-h-screen mx-auto max-w-xl sm:mt-20">
      <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-100">
        This is the last step! Please enter a few more information
      </p>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
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
        {/* <div className="sm:col-span-2 space-y-8">
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-semibold leading-6 text-white-100">
              Country<span className="text-red-500 pl-1">*</span>
            </label>
            <select
              id="country"
              name="country"
              value={country?.isoCode}
              onChange={(e) => {
                const selectedCountry = countryData.find(
                  (c) => c.isoCode === e.target.value
                );
                setCountry(selectedCountry);
              }}
              className="block w-full border-b border-[#C6DE41] px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 ease-linear transition-all duration-150 sm:text-sm sm:leading-6">
              {countryData.map((country) => (
                <option className='' key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            {state && (
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-semibold leading-6 text-white-100">
                  State<span className="text-red-500 pl-1">*</span>
                </label>
                <select
                  id="state"
                  name="state"
                  value={state?.isoCode}
                  onChange={(e) => {
                    const selectedState = stateData?.find(
                      (s: { isoCode: string }) => s.isoCode === e.target.value
                    );
                    setState(selectedState);
                  }}
                  className="block w-full border-b border-[#C6DE41] px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 ease-linear transition-all duration-150 sm:text-sm sm:leading-6">
                  {stateData?.map(
                    (state: {
                      isoCode: React.Key | readonly string[] | null | undefined;
                      name:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | React.PromiseLikeOfReactNode
                        | null
                        | undefined;
                    }) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    )
                  )}
                </select>
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
                <select
                  id="city"
                  name="city"
                  value={city?.name}
                  onChange={(e) => {
                    const selectedCity = cityData?.find(
                      (c: { name: string }) => c.name === e.target.value
                    );
                    setCity(selectedCity);
                  }}
                  className="block w-full border-b border-[#C6DE41] px-3 py-2 text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 ease-linear transition-all duration-150 sm:text-sm sm:leading-6">
                  {cityData?.map(
                    (city: {
                      name:
                        | boolean
                        | React.Key
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.PromiseLikeOfReactNode
                        | null
                        | undefined;
                    }) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
          </div>
        </div> */}
        <div className="sm:col-span-2 mt-2.5 space-y-8">
            <div>
              <label htmlFor="country" className="block text-sm font-semibold leading-6 text-gray-900">
                Country<span className='text-red-500 pl-1'>*</span>
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
                  <label htmlFor="state" className="block text-sm font-semibold leading-6 text-gray-900">
                    State<span className='text-red-500 pl-1'>*</span>
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
                  <label htmlFor="city" className="block text-sm font-semibold leading-6 text-gray-900">
                    City<span className='text-red-500 pl-1'>*</span>
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
          </div>
      </div>
      <div>
        <button
          type="submit"
          className="flex justify-center w-full rounded-md bg-me-green-200 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Register
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default GetUserData;
