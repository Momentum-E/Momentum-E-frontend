// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { statisticsChartsData } from '@/configs';
import dynamic from 'next/dynamic'
import { useAppContext } from '@/context/userContext';
import { VehicleUsageProps } from '@/utils/props/props';
import axios from 'axios';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const VehicleUsage = ({
  unit,
}:VehicleUsageProps ) => {
  const {setDistanceValue,userLocation} = useAppContext()
  let [MaxTemp,setMaxTemp]=useState()
  let [MinTemp,setMinTemp]=useState()
  
  // Temporary adding here, should be only called once in a day
  useEffect(()=>{
    if(userLocation){
      axios.get(`http://api.weatherapi.com/v1/forecast.json?key=4b950044e17b4d2683693010232807&q=${userLocation?.split(',')[0].replace(" ","+")}`)
      .then((res)=>{
        setMaxTemp(res.data.forecast.forecastday[0].day.maxtemp_c)
        setMinTemp(res.data.forecast.forecastday[0].day.mintemp_c)
      })
    }
  },[userLocation])

  return (
    <>  
        <div className="h-1/3 md:h-2/3 p-1.5 rounded-xl border border-me-green-100 bg-[#F6F6F6] dark:bg-me-green-300">
          <span className=" text-sm text-gray-500">
            {statisticsChartsData[0].title} 
          </span>
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
                {` ${setDistanceValue(102)} `}
              </span>
            </p>
            
            <p className='flex w-full flex-col md:justify-between text-sm font-medium text-gray-500'>
              Temperature High/Low
              <span className='text-black dark:text-white-100 text-sm'>
                {MaxTemp}&deg;C / {MinTemp}&deg;C
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
              Range Observed Max/Min ( {unit} )
              <span className='text-black dark:text-white-100 text-sm'>
                {`${setDistanceValue(300)} / ${setDistanceValue(220)}`}
              </span>
            </p>
          </div>
            
          <div className="flex h-full flex-row md:flex-col justify-around">
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