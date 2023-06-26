// @ts-nocheck
import React, { useEffect, useState } from 'react'
import userPool from '../components/user-pool/user-pool';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { City, Country, State } from 'country-state-city';
import { Selector } from '@/components/dashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const getUserData = () => {
    const router = useRouter();
    let countryData = Country.getAllCountries();

    const [stateData, setStateData] = useState();
    const [cityData, setCityData] = useState();
    const [country, setCountry] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [input, setInput] = useState({
        firstName:'',
        lastName:'',
    })

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

    const onSubmit = (e: { preventDefault: () => void }) => {

    }


    return (
        <form 
        action="#" 
        method='POST' 
        onSubmit={(event) => onSubmit(event)}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                    <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold leading-6 text-gray-900">
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
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={input.firstName}
                        onChange={(e) => onInputChange(e)}
                    />
                    </div>
                </div>
                <div>
                    <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold leading-6 text-gray-900">
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
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={input.lastName}
                        onChange={(e) => onInputChange(e)}
                    />
                    </div>
                </div>
                <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="mt-2 text-lg leading-8 text-white-100">
                            Please enter a few more details for us 
                        </p>
                    </div>
                    <div className="sm:col-span-2 space-y-8">
                        <div>
                        <label
                            htmlFor="country"
                            className="block text-sm font-semibold leading-6 text-gray-900">
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
                                className="block text-sm font-semibold leading-6 text-gray-900">
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
                                className="block text-sm font-semibold leading-6 text-gray-900">
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
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default getUserData