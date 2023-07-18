import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { City, Country, State } from 'country-state-city';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import AuthListBox from '@/components/AuthListBox'; 
import { Selector } from '@/components/dashboard/dashboard-components';
import AuthInput from '@/components/AuthInput';

const owner_type = [{ type: 'Individual Owner' }, { type: 'Fleet Owner' }];

const GetUserData = () => {
  const countryData = Country.getAllCountries();

  const [stateData, setStateData] = useState<any>();
  const [cityData, setCityData] = useState<any>();
  const [country, setCountry] = useState<any>();
  const [state, setState] = useState<any>();
  const [city, setCity] = useState<any>();
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
        country: country?.name,
        state: state?.name,
        city: city?.name,
      },
      company_name: companyName,
    };

    axios('http://localhost:5000/auth/signup', {
      method: 'POST',
      data: formData,
    })
      .then((res) => {
        console.log(res.data, formData);
        toast.success('User successfully created');
        router.push('/auth/login')
      })
      .catch((err) => {
        console.error(err);
        toast.error(err, );
      });

    // console.log(formData);
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    // router.replace('/auth/login');
  };

  return (
    <>
      <form
        method="POST"
        onSubmit={onSubmit}
        className="w-full h-full mb-10 space-y-10 min-h-screen mx-auto max-w-xl sm:mt-20">
        <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-100">
          This is the last step! Please enter a few more information
        </p>
        <div className="grid grid-cols-1 px-5 gap-x-8 gap-y-6 sm:grid-cols-2">
          <AuthListBox 
            labelFor={'owner_type'}
            isRequired={true}
            labelName={'Type of Owner'}
            data={owner_type} 
            value={ownerType}
            OnChange={setOwnerType}
          />
          {ownerType.type === 'Individual Owner' ? (
            <>
              <AuthInput
                outerDiv=''
                labelName='First Name'
                labelFor='firstname'
                isRequired={true}
                inputType='text'
                inputAutocomplete='given-name'
                inputClassname='border-me-green-200'
                inputValue={input.firstName}
                inputOnChange={onInputChange}
                children={null}
              />
              <AuthInput
                outerDiv=''
                labelName='Last Name'
                labelFor='lastname'
                isRequired={true}
                inputType='text'
                inputAutocomplete='last-name'
                inputClassname='border-me-green-200'
                inputValue={input.lastName}
                inputOnChange={onInputChange}
                children={null}
              />
            </>
          ) : (
          <AuthInput
            outerDiv='sm:col-span-2'
            labelName='Company Name:'
            labelFor='company'
            isRequired={true}
            inputType='text'
            inputAutocomplete='company'
            inputClassname='border-me-green-200'
            inputValue={companyName}
            inputOnChange={(e)=>setCompanyName(e.target.value)}
            children={null}
          />
          )}

          <div className="sm:col-span-2 mt-2.5 space-y-8">
            <div>
              <label
                htmlFor="country"
                className="block text-sm mb-2.5 font-semibold leading-6 text-white-100">
                Country
                <span className="text-red-500 pl-1">*</span>
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
                    State
                    <span className="text-red-500 pl-1">*</span>
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
    </>
  );
};

export default GetUserData;
