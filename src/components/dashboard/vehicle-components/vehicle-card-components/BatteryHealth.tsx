// @ts-nocheck
import React from 'react'
import { statisticsChartsData } from '@/configs';
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BatteryHealth = () => {
  return (
    <>
      <div className="w-full flex justify-between text-lg font-medium text-white-100">
          {statisticsChartsData[1].title}
          <div className="flex flex-col items-center text-xs p-1 rounded-lg border border-white-100  bg-dashboard-gradient backdrop-blur-3xl">
              Avg Battery Health
              <span className='text-me-green-200'>{`75%`}</span>
          </div>
      </div>
      <div className=" rounded-2xl w-full h-2/3 border border-me-green-100 bg-me-green-300">
          <Chart {...statisticsChartsData[1].chart}/>
      </div>
      <div className="flex justify-around pt-1 w-full h-1/3">
        <p className='flex flex-col text-sm font-medium text-gray-400'>
          Avg SoH
          <span className='text-white-100 text-sm'>
            92%
          </span>
        </p>
        <p className='flex flex-col text-sm font-medium text-gray-400'>
          EST Degradation
          <span className='text-white-100 text-sm'>
            8%
          </span>
        </p>
        <p className='flex flex-col text-sm font-medium text-gray-400'>
          Battery Chemistry
          <span className='text-white-100 text-sm'>
            li-ion
          </span>
        </p>
      </div>
    </>
  )
}

export default BatteryHealth