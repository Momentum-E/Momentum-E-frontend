import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { City, Country, State } from 'country-state-city';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
import {
  AuthInput,
  AuthListBox,
  AuthSelector
} from '@/components/auth/AuthComponents';
import { GetUserDataComponentProps } from '@/utils/props/props';
import { useAppContext } from '@/context/userContext';

const owner_type = [{ type: 'Individual Owner' }, { type: 'Fleet Owner' }];

const GetUserDataComponent = ({
  isRequired,
  heading,
  page,
  userId,
  userEmail,
  formDiv,
  buttonName,
}:GetUserDataComponentProps) => {
  const countryData = Country.getAllCountries();
  const router = useRouter();
  const {name, userOwnerType ,userCity,userState,userCountry} = useAppContext()
  
  const [Name, setName] = useState('');
  const [ownerType, setOwnerType] = useState<{type:string}>(page==='profile'?{type:userOwnerType}:owner_type[0]);
  //{type:userOwnerType}

  // Setting the data for the particular country
  const [stateData, setStateData] = useState<any>();
  const [cityData, setCityData] = useState<any>();

  // Setting the data of the user Location 
  const [country, setCountry] = useState<string|any>("");
  const [state, setState] = useState<string|any>("");
  const [city, setCity] = useState<string|any>("");

  useEffect(() => {
    if(page==='profile'){
      setOwnerType({type:userOwnerType})
      setName(name)
      setCountry(userCountry)
      setState(userState)
      setCity(userCity)
    }
  },[name,userOwnerType,userCountry,userState,userCity])  

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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(page==='profile'){
      if((country.name||country)===""){
        setCity(userCity)
        setState(userState)
        setCountry(userCountry)
      }
      else{
      }
      const newFormData = {
        email: userEmail,
        country: country?.name||country,
        city: city?.name||city,
        state: state?.name||state,
        owner_type: ownerType?.type,
        name: Name===""?name:Name,
      };
      console.log(newFormData);
      // axios(`http://localhost:5000/auth/users/${userId}`, {
      //   method: 'PATCH',
      //   data: newFormData,
      // })
      // .then((res) => {
      //   console.log(res);
      //   toast.success('User updated successfully');
      //   window.location.reload()
      // })
      // .catch((err) => {
      //   console.error(err);
      //   toast.error('Something went wrong');
      // });
    }
    else{
      const formData = {
        userId: localStorage.getItem('userId'),
        email: localStorage.getItem('email'),
        owner_type: ownerType?.type,
        country: country?.name,
        state: state?.name===undefined?'':state.name,
        city: city?.name===undefined?'':city.name,
        name: Name,
        vehicles:[],
      };
  
      axios('http://localhost:5000/auth/signup', {
        method: 'POST',
        data: formData,
      })
      .then((res) => {
        console.log(res.data, formData);
        toast.success('Login to view the dashboard.');
        router.replace('/auth/login')
        
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
        localStorage.removeItem('password')
      })
      .catch((err) => {
        console.error(err);
        toast.error(err);
      });
    };
  }

  return (
    <form
      method="POST"
      onSubmit={(e) => onSubmit(e)}
      className={formDiv}>
      <p className="mt-5 text-center text-2xl  leading-9  text-black dark:text-white-100">
        {heading}
      </p>
      <div className="grid grid-cols-1 px-5 gap-x-8 gap-y-6 sm:grid-cols-2">
        <AuthListBox 
          labelFor={'owner_type'}
          isRequired={isRequired}
          labelName={'Type of Owner'}
          data={owner_type} 
          value={ownerType}
          OnChange={setOwnerType}
        />
        {
          ownerType?.type === owner_type[0].type ? (
            <AuthInput
              outerDiv='sm:col-span-2'
              labelName='Full Name:'
              labelFor='name'
              isRequired={isRequired}
              inputType='text'
              inputAutocomplete='given-name'
              inputClassname='border-me-green-200'
              inputValue={Name}
              inputOnChange={(e)=>setName(e.target.value)}
              children={null}
            />       
          ) : 
          (
            <AuthInput
              outerDiv='sm:col-span-2'
              labelName='Company Name:'
              labelFor='company'
              isRequired={isRequired}
              inputType='text'
              inputAutocomplete='company'
              inputClassname='border-me-green-200'
              inputValue={Name}
              inputOnChange={(e)=>setName(e.target.value)}
              children={null}
            />
          )
        }

        <div className="sm:col-span-2 mt-2.5 space-y-8">
          <div>
            <label
              htmlFor="country"
              className="block text-sm mb-2.5 leading-6 text-black dark:text-white-100">
              Country
              {isRequired&&<span className="text-red-500 pl-1">*</span>}
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