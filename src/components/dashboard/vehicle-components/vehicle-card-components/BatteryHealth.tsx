// @ts-nocheck
import React from 'react'
import { statisticsChartsData } from '@/configs';
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type BatteryHealthProps = {
  avgSoH:number|null;
}

const BatteryHealth = ({avgSoH}:BatteryHealthProps) => {
  return (
    <>
      <div className=" rounded-2xl w-full h-2/3 border text-black border-me-green-100 bg-[#F6F6F6] dark:bg-me-green-300">
          <Chart {...statisticsChartsData[1].chart}/>
      </div>
      <div className="flex justify-around pt-1 w-full h-1/3">
        <p className='flex flex-col text-sm font-medium text-gray-500'>
          Avg SoH
          <span className='text-black dark:text-white-100 text-sm'>
            {avgSoH && avgSoH}%
          </span>
        </p>
        <p className='flex flex-col text-sm font-medium text-gray-500'>
          EST Degradation
          <span className='text-black dark:text-white-100 text-sm'>
            {avgSoH &&(100-avgSoH)}%
          </span>
        </p>
        <p className='flex flex-col text-sm font-medium text-gray-500'>
          Battery Chemistry
          <span className='text-black dark:text-white-100 text-sm'>
            {`NMC`}
          </span>
        </p>
      </div>
    </>
  )
}

export default BatteryHealth