// @ts-nocheck
import React from 'react'
import { statisticsChartsData } from '@/configs';
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const VehicleUsage = () => {
  return (
    <>  
        <div className="flex h-1/3 md:h-2/3  justify-between p-2 rounded-xl border border-me-green-100 bg-me-green-300">
          <div className=" text-base text-gray-400">
          {statisticsChartsData[0].title} (3 months)
          </div>
          <div className="">
            <Chart 
            height={statisticsChartsData[0].chart.height} 
            width={statisticsChartsData[0].chart.width} 
            type={statisticsChartsData[0].chart.type} 
            options={statisticsChartsData[0].chart.options} 
            series={statisticsChartsData[0].chart.series}/>
          </div>  
        </div>
        <div className="flex h-2/3 md:1/3 flex-col md:flex-row justify-between">
          <div className="flex h-full flex-row md:flex-col justify-around">
            <div className='flex w-full flex-col text-sm font-medium text-gray-400'>
              Avg Daily Miles Driven
              <span className='text-white-100 text-sm'>
                {102} Miles
              </span>
            </div>
            
            <div className='flex w-full flex-col text-sm font-medium text-gray-400'>
              Temperature High/Low
              <span className='text-white-100 text-sm'>
                {35}C / {28}C
              </span>
            </div>
          </div>
          
          <div className="flex h-full flex-row md:flex-col justify-around">
            <div className='flex w-full flex-col text-sm font-medium text-gray-400'>
              SoC Range
              <span className='text-white-100 text-sm'>
                45%
              </span>
            </div>
            
            <div className='flex w-full flex-col text-sm font-medium text-gray-400'>
              Range Observed Max/Min
              <span className='text-white-100 text-sm'>
                {15} Miles/{11} Miles
              </span>
            </div>
          </div>
            
          <div className="flex h-full flex-row md:flex-col justify-around">
            <div className='flex w-full flex-col text-sm font-medium text-gray-400'>
              Avg Real Range Observed
              <span className='text-white-100 text-sm'>
                25%
              </span>
            </div>

            <div className='flex w-full flex-col text-sm font-medium text-gray-400'>
              Observed v/s OEM provided
              <p className='flex justify-between text-left text-white-100 text-sm'>
                <span className='w-full'>{12} Miles</span>
                <span className='w-full'>{17} Miles</span> 
              </p>
            </div>
          </div>
        </div>    
    </>
  )
}

export default VehicleUsage