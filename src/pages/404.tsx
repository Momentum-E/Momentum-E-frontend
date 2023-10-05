import Link from 'next/link'
import React from 'react'

const ErrorPage = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center text-black dark:text-me-green-200'>
        <p className='text-xl'>Oops!</p>
        <p className=''>
          The page you are looking for does not exist.
          This is the link to {" "}
          <Link
            className='underline'
            href='/'
            >
            Home Page
          </Link>
        </p>
    </div>
  )
}

export default ErrorPage