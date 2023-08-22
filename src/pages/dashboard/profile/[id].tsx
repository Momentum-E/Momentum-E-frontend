import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { City, Country, State } from 'country-state-city';
import { useAppContext } from '@/context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthInput from '@/components/AuthInput';
import { DashboardLayout } from '@/layouts';
import { Selector } from '@/components/dashboard/dashboard-components/';
import AuthListBox from '@/components/AuthListBox';
import ChangeUserPassword from '@/components/auth/ChangeUserPassword';

const owner_type = [{ type: 'Individual Owner' }, { type: 'Fleet Owner' }];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: {
    country: string;
    city: string;
    state: string;
  };
  owner_type: string;
  company_name: string;
}

const Profile = () => {
  const {userId,userEmail}:any = useAppContext()

  const countryData = Country.getAllCountries();

  // const [formData, setFormData] = useState<FormData | null>(null);
  // const [userData, setUserData] = useState(null);
  const [ownerType, setOwnerType] = useState(owner_type[0]);
  // formData?.owner_type === "Individual Owner" ? owner_type[1] : owner_type[0]
  const [stateData, setStateData] = useState<any>();
  const [cityData, setCityData] = useState<any>();
  const [country, setCountry] = useState<any>('');
  const [state, setState] = useState<any>('');
  const [city, setCity] = useState<any>('');
  const [companyName, setCompanyName] = useState<string>();
  const [FirstName, setFirstName] = useState<string>();
  const [LastName, setLastName] = useState<string>();

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
    const newFormData = {
      firstName: FirstName,
      lastName: LastName,
      email: userEmail,
      address: {
        country: country.name,
        city: city.name,
        state: state.name,
      },
      owner_type: ownerType,
      companyName: companyName,
    };

    axios(`http://localhost:5000/auth/users/${userId}`, {
      method: 'PATCH',
      data: newFormData,
    })
      .then((res) => {
        console.log(res);
        toast.success('User updated successfully');
        location.reload();
      })
      .catch((err) => {
        console.error(err);
        toast.error('Something went wrong');
      });

    console.log(newFormData);
  };

  return (
    <DashboardLayout page={` Profile / ${userId}`}>
      <div className="max-h-full max-w-xl w-full mx-auto space-y-20 pt-10 pb-20 overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300">
        <form
          method="POST"
          onSubmit={(e) => onSubmit(e)}
          className="">
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
                outerDiv=''
                labelName='First Name'
                labelFor='firstname'
                isRequired={true}
                inputType='text'
                inputAutocomplete='given-name'
                inputClassname='border-me-green-200'
                inputValue={FirstName}
                inputOnChange={(e)=>setFirstName(e.target.value)}
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
                inputValue={LastName}
                inputOnChange={(e)=>setLastName(e.target.value)}
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
              inputValue={companyName}
              inputOnChange={(e)=>setCompanyName(e.target.value)}
              children={null}
            />
            )
            }

            <div className="sm:col-span-2 mt-2.5 space-y-8">
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm mb-2.5 leading-6 dark:text-white-100">
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
                      className="block text-sm font-semibold leading-6 dark:text-white-100">
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
                      className="block text-sm font-semibold leading-6 dark:text-white-100">
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
                  className="flex justify-center sm:col-span-2 w-36 rounded-md bg-me-green-200 hover:bg-me-green-200/90 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Update Data
                </button>
              </div>
            </div>
          </div>
        </form>
        <ChangeUserPassword userId={userId} />             
      </div>
      <ToastContainer />
    </DashboardLayout>
  );
};

export default Profile;
