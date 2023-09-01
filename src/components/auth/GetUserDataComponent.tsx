import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { City, Country, State } from 'country-state-city';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthListBox from '@/components/AuthListBox'; 
import { Selector } from '@/components/dashboard/dashboard-components';
import AuthInput from '@/components/AuthInput';

const owner_type = [{ type: 'Individual Owner' }, { type: 'Fleet Owner' }];

type GetUserDataComponentProps = {
  heading:string;
  page:string;
  userId:string|null;
  userEmail:string|null;
  formDiv:string;
  buttonName:string;
}

const GetUserDataComponent = ({
  heading,
  page,
  userId,
  userEmail,
  formDiv,
  buttonName,
}:GetUserDataComponentProps) => {
  const countryData = Country.getAllCountries();
  const router = useRouter();
  
  const [ownerType, setOwnerType] = useState(owner_type[0]);
  const [stateData, setStateData] = useState<any>();
  const [cityData, setCityData] = useState<any>();
  const [country, setCountry] = useState<any>();
  const [state, setState] = useState<any>();
  const [city, setCity] = useState<any>();
  const [Name, setName] = useState('');

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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(page==='profile'){
      const newFormData = {
        email: userEmail,
        country: country.name,
        city: city.name,
        state: state.name,
        owner_type: ownerType,
        name: Name,
      };
  
      axios(`http://localhost:5000/auth/users/${userId}`, {
        method: 'PATCH',
        data: newFormData,
      })
        .then((res) => {
          console.log(res);
          toast.success('User updated successfully');
          window.location.reload()
        })
        .catch((err) => {
          console.error(err);
          toast.error('Something went wrong');
        });
      console.log(newFormData);
    }
    else{
      const formData = {
        userId: localStorage.getItem('userId'),
        email: localStorage.getItem('email'),
        owner_type: ownerType.type,
        country: country?.name,
        state: state?.name,
        city: city?.name,
        name: Name,
        vehicles:[],
      };
  
      axios('http://localhost:5000/auth/signup', {
        method: 'POST',
        data: formData,
      })
      .then((res) => {
        console.log(res.data, formData);
        toast.success('User successfully created');
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
      <p className="mt-10 text-center text-2xl  leading-9  text-black dark:text-white-100">
        {heading}
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
        {
        ownerType.type === owner_type[0].type ? (
          <>
            <AuthInput
              outerDiv='sm:col-span-2'
              labelName='Full Name:'
              labelFor='name'
              isRequired={true}
              inputType='text'
              inputAutocomplete='given-name'
              inputClassname='border-me-green-200'
              inputValue={Name}
              inputOnChange={(e)=>setName(e.target.value)}
              children={null}
            />
          </>
        ) : 
        (
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
                  className="block text-sm leading-6 text-black dark:text-white-100">
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
                  className="block text-sm leading-6 text-black dark:text-white-100">
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