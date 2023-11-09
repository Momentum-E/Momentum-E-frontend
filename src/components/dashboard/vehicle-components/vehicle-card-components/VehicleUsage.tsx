import React from 'react'
import {VehicleUsageChart} from '@/configs/';
import { VehicleUsageProps } from '@/utils/props';
// import { VehicleChart } from '../VehicleCard';
// import { chartsConfig } from "@/configs";

const VehicleUsage = ({
  avgDailyDistance,
  avgDistancePrevMonths,
  SoCMinRange,
  SoCMaxRange,
  avgRealRangeObserved,
  minRange,
  maxRange,
  certifiedRange,
  temperatureData,
  setDistanceValue,
  unit,
}:VehicleUsageProps ) => {

  // const AvgDailyMiles = {
  //   series: [
  //     {
  //       name: "Miles",
  //       data: avgDistancePrevMonths,
  //     },
  //   ],
  //   options: {
  //     colors: ["#C6DE41"],
  //     ...chartsConfig,
  //     xaxis: {
  //       // {
  //         axisTicks: {
  //           show: false,
  //         },
  //         axisBorder: {
  //           show: false,
  //         },
  //         labels: {
  //           style: {
  //             colors: "#848484",
  //             fontSize: "13px",
  //             fontFamily: "inherit",
  //             fontWeight: 300,
  //           },
  //         },
  //       // },
  //       categories: 
  //       [
  //         "Jan", 
  //         "Feb", 
  //         "Mar",
  //         "Apr",
  //         "May",
  //         "Jun",
  //         "Jul",
  //         "Aug",
  //         "Sep",
  //         "Oct",
  //         "Nov",
  //         "Dec"
  //       ],
  //     },
  //   },
  // };

  return (
    <>  
        <div className="h-1/3 md:h-2/3 p-1.5 rounded-xl border border-me-green-100 bg-[#F6F6F6] dark:bg-me-green-300">
          <span className="text-sm text-gray-500">
            {/* {chartData[0].title}  */}
            Avg Distance Driven 
          </span>
          <div className="text-black">
            {
              avgDistancePrevMonths && 
              <VehicleUsageChart data={avgDistancePrevMonths}/>
            }
            {/* <VehicleChart 
              type='bar'
              height={'100%'}
              width={'100%'}
              series={AvgDailyMiles.series}
              options={AvgDailyMiles.options}
            /> */}
          </div>  
        </div>
        <div className="flex h-2/3 flex-col gap-4 md:flex-row justify-between">
          <div className="flex h-full gap-4 flex-row md:flex-col justify-around">
            <p className='flex w-full flex-col md:justify-between text-sm font-medium text-gray-500'>
              Avg Daily {unit} Driven
              <span className='text-black dark:text-white-100 text-sm'>
                {` ${setDistanceValue(avgDailyDistance)} `}
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
                {`${SoCMinRange}% - ${SoCMaxRange}%`}
              </span>
            </p>
            
            <p className='flex w-full flex-col md:justify-between text-sm font-medium text-gray-500'>
              Range Observed Max/Min ( {unit} )
              <span className='text-black dark:text-white-100 text-sm'>
                {`${setDistanceValue(minRange)} / ${setDistanceValue(maxRange)}`}
              </span>
            </p>
          </div>
            
          <div className="flex h-full gap-4 flex-row md:flex-col justify-around">
            <p className='flex w-full flex-col md:justify-between text-sm font-medium text-gray-500'>
              Avg Real Range Observed
              <span className='text-black dark:text-white-100 text-sm'>
                {`${setDistanceValue(avgRealRangeObserved)} ${unit}`}
              </span>
            </p>

            <p className='flex flex-col w-full md:justify-between text-sm font-medium text-gray-500'>
              Observed v/s EPA/WLTP provided
              <span className="flex w-full justify-between">
                <span className='w-full text-left text-black dark:text-white-100 text-sm'>
                  {setDistanceValue(avgRealRangeObserved)} {unit}
                </span>
                <span className='w-full text-left text-black dark:text-white-100 text-sm'>
                  {setDistanceValue(certifiedRange)} {unit}
                </span> 
              </span>
            </p>
          </div>
        </div>    
    </>
  )
}

export default VehicleUsage