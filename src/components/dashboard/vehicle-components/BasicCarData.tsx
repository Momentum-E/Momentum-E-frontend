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
    <div className="flex w-full justify-around h-20 rounded-2xl border border-white-200 bg-dashboard-gradient backdrop-blur-3xl p-4 dark:bg-gray-800">
        <div className="bg-me-green-200 flex items-center justify-center w-10 h-10 rounded-lg">
            {icon}
        </div>
        <div className="flex flex-col justify-center text-gray-400 font-normal text-sm">
            {heading}
            <span className='text-white-100 text-base'>{data}</span>
        </div>
    </div>
  )
}

export default BasicCarData