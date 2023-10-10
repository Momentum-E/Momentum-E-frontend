// @ts-nocheck
import React from 'react'
import statisticsChartsData from '@/configs/statistics-charts-data';
import dynamic from 'next/dynamic'
import { VehicleUsageProps } from '@/utils/props';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const VehicleUsage = ({
  temperatureData,
  setDistanceValue,
  unit,
}:VehicleUsageProps ) => {

  const chartData = statisticsChartsData()

  return (
    <>  
        <div className="h-1/3 md:h-2/3 p-1.5 rounded-xl border border-me-green-100 bg-[#F6F6F6] dark:bg-me-green-300">
          <span className=" text-sm text-gray-500">
            {chartData[0].title} 
          </span>
          <div className="text-black">
            <Chart 
              height={chartData[0].chart.height} 
              width={chartData[0].chart.width} 
              type={chartData[0].chart.type}
              options={chartData[0].chart.options} 
              series={chartData[0].chart.series}/>
          </div>  
        </div>
        <div className="flex h-2/3 flex-col gap-4 md:flex-row justify-between">
          <div className="flex h-full gap-4 flex-row md:flex-col justify-around">
            <p className='flex w-full flex-col md:justify-between text-sm font-medium text-gray-500'>
              Avg Daily {unit} Driven
              <span className='text-black dark:text-white-100 text-sm'>
                {` ${setDistanceValue(102)} `}
              </span>
            </p>
            
            <p className='flex w-full flex-col md:justify-between text-sm font-medium text-gray-500'>
              Temperature High/Low
              <span className='text-black dark:text-white-100 text-sm'>
                {temperatureData.maxTemperature}&deg;C / {temperatureData.minTemperature}&deg;C
              </span>
            </p>
          </div>
          
          <div className="flex h-full gap-4 flex-row md:flex-col justify-around">
            <p className='flex w-full flex-col md:justify-between text-sm font-medium text-gray-500'>
              SoC Range
              <span className='text-black dark:text-white-100 text-sm'>
                {`${20}% - ${80}%`}
              </span>
            </p>
            
            <p className='flex w-full flex-col md:justify-between text-sm font-medium text-gray-500'>
              Range Observed Max/Min ( {unit} )
              <span className='text-black dark:text-white-100 text-sm'>
                {`${setDistanceValue(300)} / ${setDistanceValue(220)}`}
              </span>
            </p>
          </div>
            
          <div className="flex h-full gap-4 flex-row md:flex-col justify-around">
            <p className='flex w-full flex-col md:justify-between text-sm font-medium text-gray-500'>
              Avg Real Range Observed
              <span className='text-black dark:text-white-100 text-sm'>
                {`${setDistanceValue(260)} ${unit}`}
              </span>
            </p>

            <p className='flex flex-col w-full md:justify-between text-sm font-medium text-gray-500'>
              Observed v/s EPA/WLTP provided
              <span className="flex w-full justify-between">
                <span className='w-full text-left text-black dark:text-white-100 text-sm'>
                  {setDistanceValue(260)} {unit}
                </span>
                <span className='w-full text-left text-black dark:text-white-100 text-sm'>
                  {setDistanceValue(275)} {unit}
                </span> 
              </span>
            </p>
          </div>
        </div>    
    </>
  )
}

export default VehicleUsage