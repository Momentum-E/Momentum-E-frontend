import React, { useState,useEffect } from 'react';
import userPool from '../../context/user-pool/user-pool';
import Link from 'next/link';
import { Switch } from '@headlessui/react';
import axios from 'axios';
// import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { City, Country, State } from 'country-state-city';

import { 
  AuthInput, 
  AuthListBox 
} from './AuthComponents';
import ConfirmSignUp from '@/pages/auth/confirm-signup';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
// const subscription_type = [{ type: 'Monthly' }, { type: 'Yearly' }];

const Signup = () => {
  // const router = useRouter()
  // const {payment_status,result,email} = router.query
  const countryData = Country.getAllCountries();

  const [agreed, setAgreed] = useState(false);
  const [inputType,setInputType] = useState<'text'|'password'>('password')
  const [confirmInputType,setConfirmInputType] = useState('password')
  const [verifyProcess, setVerifyProcess] = useState(false);
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [Name, setName] = useState('');
  
  // const [subscriptionType, setSubscriptionType] = useState<{type:string}>(
  //   (priceId === subscription_type[0].type)?
  //   subscription_type[0]
  //   :
  //   (priceId === subscription_type[1].type)?
  //   subscription_type[1]
  //   :
  //   subscription_type[0]
  // )

  // Setting the data for the particular country
  const [stateData, setStateData] = useState<any>();
  const [cityData, setCityData] = useState<any>();

  // Setting the data of the user Location 
  const [country, setCountry] = useState<string|any>("");
  const [state, setState] = useState<string|any>("");
  const [city, setCity] = useState<string|any>("");

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

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setInputType('password')
    setConfirmInputType('password')

    axios(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/is-valid-email`, {
      method: 'POST',
      data: {
        email: input.email,
      },
    })
    .then((res) => {
      console.log(res.data)
      if(res.data.isValidEmail){
        console.log(input.email + "is Valid" + res.data.isValidEmail)
        // changed the 4th parameter to [] from null
        userPool.signUp(input.email, input.password, [], [], (err:any, data) => {
          if (err) {
            if (err.code === 'InvalidPasswordException') {
              const errorMessage = err.message || 'An unknown error occurred.';
              toast.error(errorMessage);
            }
            if (err.code === 'UsernameExistsException') {
              const errorMessage = err.message || 'User already present.';
              toast.success(errorMessage);
            } else {
              console.error(err);
            }
          } 
          else {
            console.log(data);
            if(data){
              localStorage.setItem('userId', data?.userSub);
              // setUserId(data?.userSub)
              localStorage.setItem('email', input.email);
              toast.success('Please confirm your email to continue');
              setVerifyProcess(true);
      
              const formData = {
                userId: data?.userSub,
                email: input.email,
                // owner_type: ownerType?.type,
                country: country?.name,
                state: state?.name===undefined?'':state.name,
                city: city?.name===undefined?'':city.name,
                name: Name,
                vehicles:[],
              };
          
              axios(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/signup`, {
                method: 'POST',
                data: formData,
              })
              .then(async (res) => {
                console.log(res.data, formData);
                localStorage.removeItem('email');
                localStorage.removeItem('userId');
                localStorage.removeItem('password')

                // Go to the user payment portal and redirect to the login page.
                // if(subscriptionType.type === subscription_type[0].type){
                //   await PaymentGateway(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY);
                // }
                // else if(subscriptionType.type === subscription_type[1].type) {
                //   await PaymentGateway(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY);
                // }
              })
              .catch((err) => {
                console.error(err);
                toast.error(err);
              });
            } 
          }
        });
      }
      else{
        toast.info(`There is no active subscription for ${input.email}. Please pay and then register.`)
      }
    })
    .catch((err) => {
      console.log("Sign Up Error: "+err)
    })
  };
  
  return (
    <>
      {
        verifyProcess === false ? 
        (
          <section id='sign_up' className="isolate px-6 py-24 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-2xl pb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white-100 sm:text-4xl">
                Sign Up
              </h2>
              <p className="mt-2 text-lg leading-8 text-white-100">
                First step towards a statistical approach in understanding your EV
                battery
              </p>
            </div>

            <form
              data-testid="register-form"
              autoComplete='off'
              action="#"
              method="POST"
              onSubmit={(event) => onSubmit(event)}
              className="mx-auto max-w-xl mt-20 md:mt-5"
            >    
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                {/* Email Input Field */}
                <AuthInput
                  outerDiv='sm:col-span-2'
                  labelName='Email'
                  labelFor='email'
                  isRequired={true}
                  inputType='email'
                  inputAutocomplete='email'
                  inputClassname='border-me-green-200'
                  inputValue={input.email}
                  inputOnChange={(e) => onInputChange(e)}
                >
                  <div className="pt-2 text-xs font-semibold text-white-100">
                    <ul>
                      <li>Kindly sign up with the same email as used during payment.</li>
                    </ul>
                  </div>
                </AuthInput>
                
                
                {/* Password Input Field */}
                <div className="flex">
                  <AuthInput
                    outerDiv='w-full'
                    labelName='Password'
                    labelFor='password'
                    isRequired={true}
                    inputType={inputType}
                    inputAutocomplete='off'
                    inputClassname={`${
                      input.password != input.confirmPassword
                        ? `border-red-500`
                        : `border-me-green-200`
                    }`}
                    inputValue={input.password}
                    inputOnChange={(e) => onInputChange(e)}
                    // children={null}
                  />

                  <button className='focus:outline-none focus:border-none' type='button' onClick={()=>setInputType(inputType === 'text' ? 'password': 'text')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  
                      strokeWidth={1.5} stroke="currentColor" 
                      className={`w-4 h-4 focus:outline-none focus:border-none ${inputType === 'text' ? 'hidden' : 'flex'}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 focus:outline-none focus:border-none ${inputType === 'password' ? 'hidden' : 'flex'}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  </button>
                </div>
                
                {/* Confirm Password Input Field  */}
                <div className="flex w-full">
                  <AuthInput
                    outerDiv='w-full'
                    labelName='Confirm Password'
                    labelFor='confirmPassword'
                    isRequired={true}
                    inputType={confirmInputType}
                    inputAutocomplete='off'
                    inputClassname={`${
                      input.password != input.confirmPassword
                        ? `border-b border-red-500`
                        : `border-me-green-200`
                    }`}
                    inputValue={input.confirmPassword}
                    inputOnChange={(e) => onInputChange(e)}
                    // children={null}
                  />
                  <button className='focus:outline-none focus:border-none' type='button' onClick={()=>setConfirmInputType(confirmInputType === 'text' ? 'password': 'text')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  
                      strokeWidth={1.5} stroke="currentColor" 
                      className={`w-4 h-4 ${confirmInputType === 'text' ? 'hidden' : 'flex'}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${confirmInputType === 'password' ? 'hidden' : 'flex'}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  </button>
                </div>

                <div className="sm:col-span-2">
                  {/* Matching Password Error */}
                  {input.password != input.confirmPassword && (
                    <div className="w-full text-sm font-semibold leading-6 text-red-500 flex items-center justify-center">
                      Passwords do not match
                    </div>
                  )}

                  <div className="text-xs font-semibold text-white-100">
                    <ul>
                      <li>Password must be minimum of 8 characters.</li>
                      <li>Password must have uppercase characters</li>
                      <li>Password must have numbers.</li>
                      <li>Password must have symbol characters</li>
                    </ul>
                  </div>

                </div>
                
                {/* <AuthListBox 
                  isRequired={true}
                  labelName={'Subscription Type'}
                  labelFor={'subscription_type'}
                  data={subscription_type} 
                  value={subscriptionType}
                  OnChange={setSubscriptionType}
                /> */}
              
                <AuthInput
                  outerDiv='sm:col-span-2'
                  labelName='Company Name:'
                  labelFor='company'
                  isRequired={true}
                  inputType='text'
                  inputAutocomplete='company'
                  inputClassname='border-me-green-200'
                  inputValue={Name}
                  inputOnChange={(e)=>setName(e.target.value)}
                  // children={null}
                />

                <div className="sm:col-span-2 mt-2.5 space-y-8">
                  <div>
                    <AuthListBox
                      isRequired={true}
                      id={'country'}
                      labelName='Country'
                      data={countryData}
                      selected={country}
                      setSelected={setCountry}
                    />
                  </div>

                  <div>
                    {(state) && (
                      <div>
                        <AuthListBox
                          isRequired={true}
                          id={'state'}
                          labelName='State'
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
                        <AuthListBox
                          isRequired={true}
                          id={'city'}
                          labelName='City'
                          data={cityData}
                          selected={city}
                          setSelected={setCity}
                        />
                      </div>
                    )}
                  </div>
                  <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                    <div className="flex h-6 items-center">
                      <Switch
                        id={'policy_agreement'}
                        checked={agreed}
                        onChange={() => setAgreed(!agreed)}
                        className={classNames(
                          agreed ? ' bg-me-green-100 ring-1 ring-white-200' : 'bg-white-100 ring-1 ring-red-500',
                          'flex w-8 flex-none cursor-pointer rounded-full p-px ring-inset transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-white-100'
                        )}>
                        <span className="sr-only">Agree to policies</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            agreed
                              ? 'translate-x-3.5 bg-white-100 '
                              : 'translate-x-0 bg-me-green-100 ',
                            'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-white-100/5 transition duration-200 ease-in-out'
                          )}
                        />
                      </Switch>
                    </div>
                    <Switch.Label
                      htmlFor={'policy_agreement'}
                      className="text-sm leading-6 text-white-100">
                      By selecting this, you agree to our{' '}
                      <Link href="/" className="font-semibold text-me-green-200">
                        privacy&nbsp;policy
                      </Link>
                      .
                    </Switch.Label>
                  </Switch.Group>
                </div>

                {/* {
                  !agreed && 
                  <p className='"w-full text-sm font-semibold leading-6 text-red-500 flex items-center justify-center'>
                    Plase enter all fill all the field and agree our privacy policy
                  </p>
                } */}
              </div>

              <div className="mt-10">
                <button
                  data-testid="register-submit-btn"
                  disabled={
                    input.password === input.confirmPassword && agreed
                      ? false
                      : true
                  }
                  type="submit"
                  className={`${
                    input.password === input.confirmPassword && agreed
                      ? `hover:bg-me-green-200/90 `
                      : ` `
                  } block w-full rounded-md bg-me-green-200 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm`}>
                  Register
                </button>
              </div>
            </form>
            <ToastContainer />
          </section>
        ) : 
        (
          <ConfirmSignUp 
            username={input.email}
            password={input.password}
          />
        )
      }
    </>
  );
};

export default Signup;
