import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { City, Country, State } from 'country-state-city';
import AuthInput from '@/components/AuthInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { DashboardLayout } from '@/layouts';
import { Selector } from '@/components/dashboard/dashboard-components/';
import AuthListBox from '@/components/AuthListBox';

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
  const router = useRouter();
  const { id } = router.query;

  const countryData = Country.getAllCountries();

  const [formData, setFormData] = useState<FormData | null>(null);
  const [userData, setUserData] = useState(null);
  const [ownerType, setOwnerType] = useState(
    formData?.owner_type === 'Individual Owner' ? owner_type[0] : owner_type[1]
  );
  const [stateData, setStateData] = useState<any>();
  const [cityData, setCityData] = useState<any>();
  const [country, setCountry] = useState<any>('');
  const [state, setState] = useState<any>('');
  const [city, setCity] = useState<any>('');
  const [companyName, setCompanyName] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');

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

  useEffect(() => {
    axios
      .get('http://localhost:5000/auth/users/' + id)
      .then((res) => {
        console.log(res.data);
        setFormData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFormData = {
      firstName: FirstName,
      lastName: LastName,
      email: formData?.email,
      address: {
        country: country.name,
        city: city.name,
        state: state.name,
      },
      owner_type: ownerType,
      company_name: companyName,
    };

    axios('http://localhost:5000/auth/users/' + id, {
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
    <DashboardLayout>
      <div className="max-h-full overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300">
        <form
          method="POST"
          onSubmit={(e) => onSubmit(e)}
          className="w-full space-y-10 min-h-screen mx-auto max-w-xl">
          <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-100">
            Welcome, {formData?.firstName + ' ' + formData?.lastName}
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
        </form>
      </div>
      <ToastContainer />
    </DashboardLayout>
  );
};

export default Profile;
