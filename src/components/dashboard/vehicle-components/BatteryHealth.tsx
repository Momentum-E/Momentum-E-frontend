// @ts-nocheck
import React from 'react'
import { statisticsChartsData } from '@/configs';
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BatteryHealth = () => {
  return (
    <div className="h-[445px] space-y-5 flex flex-col items-end p-6 rounded-2xl  bg-dashboard-gradient backdrop-blur-3xl border border-white-100 dark:bg-gray-800">
        <div className="w-full flex justify-between text-lg font-medium text-white-100">
            {statisticsChartsData[1].title}
            <div className="flex flex-col items-center text-xs p-1 rounded-lg border border-white-100  bg-dashboard-gradient backdrop-blur-3xl">
                Avg Battery Health
                <span className='text-me-green-200'>{`75%`}</span>
            </div>
        </div>
        <div className=" rounded-2xl w-full bg-me-green-300">
            <Chart {...statisticsChartsData[1].chart}/>
        </div>
    </div>
  )
}

export default BatteryHealth