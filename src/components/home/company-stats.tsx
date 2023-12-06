import React from 'react'

type companyStatsProps = {
  statValue:string,
  description:string
}

const companyStats:React.FC<companyStatsProps> = ({
  statValue,
  description
}) => {
  return (
    <div className="flex flex-col items-center text-center justify-center p-4 space-y-5">
      <span className="text-me-green-200 text-7xl">
        {statValue}
      </span>
      <span className="text-white-100 text-sm font-light">
        {description}
      </span>
      <div className="w-full ease-in-out duration-200 rounded-2xl p-0.5 bg-gray-600"></div>
    </div>
  )
}

export default companyStats