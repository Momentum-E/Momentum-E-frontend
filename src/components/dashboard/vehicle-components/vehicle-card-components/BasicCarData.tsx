import React from 'react'
import { BasicCarDataProps } from '@/utils/props'

const BasicCarData = ({
    heading,
    data,
    icon,
}:BasicCarDataProps) => {
  return (
    <div className="flex items-center space-x-3 p-2 w-full h-16 rounded-2xl border border-me-green-200 bg-gradient-to-br from-white-100 to-gray-200/50 dark:bg-dashboard-gradient ">
      {icon}
      <p className="flex flex-col w-full text-gray-600 font-normal overflow-hidden overflow-ellipsis text-sm">{heading}
        <span className='text-black dark:text-white-100 w-full text-md truncate'>
          {data}
        </span>
      </p>
    </div>
  )
}

export default BasicCarData