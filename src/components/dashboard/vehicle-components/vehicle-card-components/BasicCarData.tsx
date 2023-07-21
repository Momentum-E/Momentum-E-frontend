import React from 'react'

type BasicCarData ={
    heading: string;
    data:string;
    icon:any;
}

const BasicCarData = ({
    heading,
    data,
    icon,
}:BasicCarData) => {
  return (
    <div className="flex items-center space-x-3 p-2 w-full h-16 rounded-2xl border border-me-green-200 bg-gradient-to-br from-white-100 to-gray-200/50 dark:bg-dashboard-gradient ">
      {icon}
      <p className="flex flex-col w-full text-gray-400 font-normal overflow-hidden overflow-ellipsis text-sm">{heading}
        <span className='text-black dark:text-white-100 w-full text-md truncate'>
          {data}
        </span>
      </p>
    </div>
  )
}

export default BasicCarData