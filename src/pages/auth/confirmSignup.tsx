// @ts-nocheck
import React, { useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const confirmSignup = () => {

    const [oneTimePassword, setoneTimePassword] = useState("")

    const handleConfirmSignup = (e:any) => {
        retrieveVerificationCode()
    } 

    return (
    <main>
      <section className="relative w-full h-full py-32 min-h-screen">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
              Confirm OTP sent on your email to Register
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={(event) => handleConfirmSignup(event)}>
                <div>
                    <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm OTP
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required={true}
                            autoComplete="email"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={oneTimePassword}
                            onChange={(e) => setoneTimePassword(e.target.value)}
                        />
                    </div>
                </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </main>
  )
}
export default confirmSignup
