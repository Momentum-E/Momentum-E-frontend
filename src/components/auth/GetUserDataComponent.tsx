import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { City, Country, State } from 'country-state-city';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'; 

import {
  AuthInput,
  // AuthListBox,
  AuthSelector
} from '@/components/auth/AuthComponents';
import { GetUserDataComponentProps } from '@/utils/props';
import { AppContext } from '@/context/userContext';

const GetUserDataComponent = ({
  idToken,
  isRequired,
  heading,
  page,
  userId,
  userEmail,
  formDiv,
  buttonName,
}:GetUserDataComponentProps) => {
  const router = useRouter()
  // const priceId = router.query.price_id
  const countryData = Country.getAllCountries();
  const {
    name, 
    // userOwnerType,
    userCity,
    userState,
    userCountry
  } = useContext(AppContext)
  
  const [Name, setName] = useState('');
  // const [ownerType, setOwnerType] = useState<{type:string}>(page==='profile'?{type:userOwnerType}:owner_type[0]);
  // const [quantity, setQuantity] = useState<number>(0)
 

  // Setting the data for the particular country
  const [stateData, setStateData] = useState<any>();
  const [cityData, setCityData] = useState<any>();

  // Setting the data of the user Location 
  const [country, setCountry] = useState<string|any>("");
  const [state, setState] = useState<string|any>("");
  const [city, setCity] = useState<string|any>("");

  useEffect(() => {
    if(page==='profile'){
      // setOwnerType({type:userOwnerType})
      setName(name)
      setCountry(userCountry)
      setState(userState)
      setCity(userCity)
    }
  },[name,userCountry,userState,userCity])  

  useEffect(() => {
    return setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    return setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  useEffect(() => {
    stateData && setState(page==='profile' ? userState : stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(page==='profile' ? userCity : cityData[0]);
  }, [cityData]);

  // const PaymentGateway = async (priceId:string|undefined) => {
  //   let config = {
  //     method:"post",
  //     url:`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/subscription/create-checkout-session`,
  //     headers:{
  //       "Content-type": "application/json",
  //     },
  //     data:JSON.stringify({
  //         priceId: priceId,
  //         quantity: 1
  //     })
  //   }
  //   axios.request(config)
  //   .then(async (res)=>{
  //       console.log(res.data)
  //       router.push(res.data.sessionURL)
  //       // const sessionId = res.data.sessionId
  //   })
  //   .catch((err)=>{
  //       console.error(err)
  //   })
  // }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if(page==='profile'){
    if((country.name||country)===""){
      setCity(userCity)
      setState(userState)
      setCountry(userCountry)
    }
    const newFormData = {
      email: userEmail,
      country: country?.name||country,
      city: city?.name||city,
      state: state?.name||state,
      // owner_type: ownerType?.type,
      name: Name===""?name:Name,
    };
    console.log(newFormData);
    axios.patch(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/users/${userId}`,newFormData,{
      headers: {
        authorization: `Bearer ${idToken}`
      }
    })
    .then((res) => {
      console.log(res);
      toast.success('User updated successfully');
      // window.location.reload()
    })
    .catch((err) => {
      console.error(err);
      toast.error('Something went wrong');
    });
  }

  return (
    <form
      method="POST"
      onSubmit={(e) => onSubmit(e)}
      className={formDiv}
    >
      <p className="mt-5 text-center text-2xl  leading-9  text-black dark:text-white-100">
        {heading}
      </p>
      <div className="grid grid-cols-1 px-5 gap-x-8 gap-y-6 sm:grid-cols-2">
        
        <AuthInput
          disabled={true}
          outerDiv='sm:col-span-2'
          labelName='Company Name:'
          labelFor='company'
          isRequired={isRequired}
          inputType='text'
          inputAutocomplete='company'
          inputClassname='border-me-green-200'
          inputValue={Name}
          inputOnChange={(e)=>setName(e.target.value)}
        />

        <div className="sm:col-span-2 mt-2.5 space-y-8">
          <div>
            <label
              htmlFor="country"
              className="block text-sm mb-2.5 leading-6 text-black dark:text-white-100">
              Country
              { 
                isRequired && 
                <span className="text-red-500 pl-1">*</span>
              }
            </label>
            <AuthSelector
              id={'country'}
              data={countryData}
              selected={country}
              setSelected={setCountry}
            />
          </div>

          <div>
            {(state) && (
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm leading-6 text-black dark:text-white-100">
                  State
                  <span className="text-red-500 pl-1">*</span>
                </label>
                <AuthSelector
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
                  className="block text-sm leading-6 text-black dark:text-white-100">
                  City
                  <span className="text-red-500 pl-1">*</span>
                </label>
                <AuthSelector
                  id={'city'}
                  data={cityData}
                  selected={city}
                  setSelected={setCity}
                />
              </div>
            )}
          </div>

          {/* {
            page !== 'profile' &&
            <>
              <label
                htmlFor='quantity'
                className='block text-sm font-medium leading-6 text-black dark:text-white-100'>
                  Number of vehicles to be added
                  <span className="text-red-500 pl-1">*</span>
              </label>
              <div className="flex flex-row items-center justify-around sm:col-span-2">
                <button 
                  type='button' 
                  className="p-2 px-4 border border-me-green-200 rounded-md" 
                  onClick={()=>setQuantity(quantity-1)} 
                  disabled={quantity<=0}
                >
                  -
                </button>
                <input 
                  type="text" 
                  name='quantity' 
                  id='quantity' 
                  required={true}
                  className='p-2 border border-me-green-200 text-center text-black dark:text-white-100 bg-transparent rounded-xl text-sm focus:outline-none focus:ring-0 sm:text-sm sm:leading-6' 
                  value={quantity} 
                  onChange={(e)=>setQuantity(Number(e.target.value))}
                />
                <button 
                  type='button' 
                  className="p-2 px-4 border border-me-green-200 rounded-md" 
                  onClick={()=>setQuantity(quantity+1)} disabled={quantity>=5}
                >
                  +
                </button>
              </div>
            </>
          } */}

          <div className='w-full flex justify-center'>
            <button
              type="submit"
              className="flex sm:col-span-2 w-auto rounded-md bg-me-green-200 hover:bg-me-green-200/90 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm"
            >
              {buttonName}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default GetUserDataComponent