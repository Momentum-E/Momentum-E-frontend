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
    <div className="flex items-center p-4 w-full h-16 rounded-2xl border border-me-green-200 dark:bg-dashboard-gradient dark:backdrop-blur-3xl">
      {icon}
      <div className="flex flex-col w-full pl-4 justify-center dark:text-gray-400 font-normal text-sm">
        {heading}
        <span className='dark:text-white-100 text-base'>{data}</span>
      </div>
    </div>
  )
}

export default BasicCarData