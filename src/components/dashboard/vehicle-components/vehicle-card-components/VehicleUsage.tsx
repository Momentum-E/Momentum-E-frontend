// @ts-nocheck
import React from 'react'
import { statisticsChartsData } from '@/configs';
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type VehicleUsageProps ={
  unit:string;
} 

const VehicleUsage = ({unit}:VehicleUsageProps ) => {
  return (
    <>  
        <div className="flex h-1/3 md:h-2/3 justify-between p-2 rounded-xl border border-me-green-100 bg-[#F6F6F6] dark:bg-me-green-300">
          <div className=" text-sm text-gray-500">
            {statisticsChartsData[0].title} 
          </div>
          <div className="text-black">
            <Chart 
            height={statisticsChartsData[0].chart.height} 
            width={statisticsChartsData[0].chart.width} 
            type={statisticsChartsData[0].chart.type} 
            options={statisticsChartsData[0].chart.options} 
            series={statisticsChartsData[0].chart.series}/>
          </div>  
        </div>
        <div className="flex h-2/3 flex-col space-x-1 md:flex-row justify-between">
          <div className="flex h-full flex-row md:flex-col justify-around">
            <p className='flex w-full flex-col md:justify-between text-sm font-medium text-gray-500'>
              Avg Daily {unit} Driven
              <span className='text-black dark:text-white-100 text-sm'>
                {` 
                ${
                unit==='Mi' ?
                (102/1.609).toFixed(2)
                :
                102} 
                `}
              </span>
            </p>
            
            <p className='flex w-full flex-col md:justify-between text-sm font-medium text-gray-500'>
              Temperature High/Low
              <span className='text-black dark:text-white-100 text-sm'>
                {35}&deg;C / {28}&deg;C
              </span>
            </p>
          </div>
          
          <div className="flex h-full flex-row md:flex-col justify-around">
            <p className='flex w-full flex-col md:justify-between text-sm font-medium text-gray-500'>
              SoC Range
              <span className='text-black dark:text-white-100 text-sm'>
                {`${20}% - ${80}%`}
              </span>
            </p>
            
            <p className='flex w-full flex-col md:justify-between text-sm font-medium text-gray-500'>
              Range Observed Max/Min
              <span className='text-black dark:text-white-100 text-sm'>
                {`${300} Miles / ${220} Miles`}
              </span>
            </p>
          </div>
            
          <div className="flex h-full flex-row md:flex-col justify-around">
            <p className='flex w-full flex-col md:justify-between text-sm font-medium text-gray-500'>
              Avg Real Range Observed
              <span className='text-black dark:text-white-100 text-sm'>
                {`${260} Miles`}
              </span>
            </p>

            <p className='flex flex-col w-full md:justify-between text-sm font-medium text-gray-500'>
              Observed v/s OEM provided
              <span className="flex w-full justify-between">
                <span className='w-full text-left text-black dark:text-white-100 text-sm'>
                  {280} Miles
                </span>
                <span className='w-full text-left text-black dark:text-white-100 text-sm'>
                  {295} Miles
                </span> 
              </span>
            </p>
          </div>
        </div>    
    </>
  )
}

export default VehicleUsage