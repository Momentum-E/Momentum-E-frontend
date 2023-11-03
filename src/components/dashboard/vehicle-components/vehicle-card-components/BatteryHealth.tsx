// @ts-nochec
import React, { useEffect } from 'react'
import statisticsChartsData from '@/configs/statistics-charts-data';
import { BatteryHealthProps } from '@/utils/props';
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BatteryHealth = ({
  SoH,
}:BatteryHealthProps) => {
  
  const chartData = statisticsChartsData()
  // useEffect(()=>{
  //   console.log({chartData,SoH})
  // })
  return (
    <>
      <div className=" rounded-2xl w-full h-2/3 border text-black border-me-green-100 bg-[#F6F6F6] dark:bg-me-green-300">
        <Chart
          height={chartData[1].chart.height} 
          width={chartData[1].chart.width} 
          type={"area"}
          options={chartData[1].chart.options} 
          series={chartData[1].chart.series} 
        />
      </div>
      <div className="flex justify-around pt-1 w-full h-1/3">
        <p className='flex flex-col text-sm font-medium text-gray-500'>
          SoH
          <span className='text-black dark:text-white-100 text-sm'>
            {
              typeof(SoH) === "number" ? 
                SoH.toFixed(2)+" "+"%"
              : 
                "-"
            }
          </span>
        </p>
        <p className='flex flex-col text-sm font-medium text-gray-500'>
          Estimated Degradation
          <span className='text-black dark:text-white-100 text-sm'>
            {
              typeof(SoH) === "number" ? 
                (100-SoH).toFixed(2)+" "+"%" 
              : 
                "-"
            }
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