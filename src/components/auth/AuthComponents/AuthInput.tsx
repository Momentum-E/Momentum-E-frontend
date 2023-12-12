import React from 'react'
import {AuthInputProps} from '@/utils/props'

function AuthInput({
  disabled=false,
  labelName,
  labelFor, 
  isRequired, 
  inputType,
  inputAutocomplete,
  inputClassname,
  inputValue,
  inputOnChange,
  outerDiv,
  children=null,
}:AuthInputProps) {

  return (
     <div className={outerDiv}>
        <label
          htmlFor={labelFor}
          className='block text-sm font-medium leading-6 text-black dark:text-white-100'>
          {labelName}
          {
            isRequired ? 
            <span className="text-red-500 pl-1">*</span>
            :
            null
          }
      </label>
      <div className={'pt-2 w-full'}>
        <input
          disabled={disabled}
          className={'border-b w-full px-4 py-1 text-black dark:text-white-100 bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 active:outline-none ease-linear transition-all duration-150 sm:text-sm sm:leading-6 '+ inputClassname}
          type={inputType}
          name={labelFor}
          id={labelFor}
          required={isRequired}
          autoComplete={inputAutocomplete}
          value={inputValue}
          onChange={inputOnChange}
        />
      </div>
      {children}
    </div>
  )
}

export default AuthInput