// @ts-nocheck
import React, { useEffect, useState } from 'react'
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
        className="w-full h-full py-10 space-y-10 min-h-screen mx-auto max-w-xl sm:mt-20"
        >
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
                        onChange={(e) => onInputChange(e)}
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
                        onChange={(e) => onInputChange(e)}
                    />
                    </div>
                </div>
                <div className="sm:col-span-2 space-y-8">
                    <div>
                    <label
                        htmlFor="country"
                        className="block text-sm font-semibold leading-6 text-white-100">
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
                    <ToastContainer />
                </div>
            </div>
        </form>
    )
}

export default getUserData