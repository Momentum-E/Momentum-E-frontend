import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect} from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Switch } from '@headlessui/react'
import { Navigate, } from 'react-router-dom'
import { City, Country, State } from "country-state-city";

import Selector from './../../../src/components/Selector'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Register() {
  // const [UserPassword,setUserPassword] = useState("")  
  // const [UserConfirmPassowrd, setUserConfirmPassowrd] = useState("")
  // const [firstName,setFirstName] = useState("")
  // const [lastName,setLastName] = useState("")
  // const [email,setEmail] = useState("")
  // const [userCity, setUserCity] = useState("")

  
  let countryData = Country.getAllCountries();
  
  const [agreed, setAgreed] = useState(false)
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email:"",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  let user = null
  
  const handleRegister = (user) => {
    console.log(user)
    // try{
    //   user = {user}
    //   localStorage.setItem('user', user);
    //   <Navigate to="dashboard" replace />
    // }catch(error){
    //   user = error
    // }
  }

  return (
    <div className="isolate px-6 py-24 sm:py-32 lg:px-8">



      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sign Up</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          First step towards a statistical approach in understanding your EV battery
        </p>
      </div>

      <form action="#" method="POST" onSubmit={(event) => handleRegister(event)} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-gray-900">
              First name
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="firstName"
                id="firstName"
                required={true}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value ={input.firstName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-gray-900">
              Last name
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="lastName"
                id="lastName"
                required={true}
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value ={input.lastName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email<span className='text-red-500 pl-1'>*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                required={true}
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value ={input.email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
              Password<span className='text-red-500 pl-1'>*</span>
            </label>
            <div className="mt-2.5">
              <input
                type='password'
                name="password"
                id="password"
                required={true}
                autoComplete="password"
                className={`${(input.password != input.confirmPassword) ? `ring-red-500 focus:ring-red-600 focus:ring-2` : `  focus:ring-indigo-600 ring-gray-300`} block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 ring-1 ring-inset focus:ring-2 focus:ring-inset shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                value ={input.password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
              Confirm Password<span className='text-red-500 pl-1'>*</span>
            </label>
            <div className="mt-2.5">
              <input
                type='password'
                name="confirmPassword"
                id="confirmPassword"
                required={true}
                autoComplete="password"
                className={`${(input.password != input.confirmPassword) ? `ring-red-500 focus:ring-red-600 focus:ring-2` : `  focus:ring-indigo-600 ring-gray-300`} block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 ring-1 ring-inset focus:ring-2 focus:ring-inset shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                value={input.confirmPassword}
                onChange={(e) => onInputChange(e)}
                // onBlur={validateInput}
              />
            </div>
          </div>

          {(input.password != input.confirmPassword) && (
            <div className="w-full text-red-500 bg-red-200 opacity-100 flex items-center justify-center">Passwords do not match</div>
          )}

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

          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className={classNames(
                  agreed ? 'bg-indigo-600' : 'bg-gray-200',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? 'translate-x-3.5' : 'translate-x-0',
                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{' '}
              <Link to="/" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </Link>
              .
            </Switch.Label>
          </Switch.Group>
        </div>

        <div className="mt-10">
          <button
            disabled={(input.password === input.confirmPassword )&&agreed ? false : true}
            type="submit"
            className={`${(input.password === input.confirmPassword)&&agreed ? `hover:bg-indigo-500 ` : ` `} block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          >
            Register
          </button>
        </div>

      </form>
    </div>
  )
}

export default Register