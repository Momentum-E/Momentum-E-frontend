import React from 'react'
import {BatteryHealthChart} from '@/configs/';
import { BatteryHealthProps } from '@/utils/props';
// import { VehicleChart } from '../VehicleCard';
// import { chartsConfig } from "@/configs";
// import dynamic from 'next/dynamic'
// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BatteryHealth = ({
  SoH,
  PrevMonthsSoH
}:BatteryHealthProps) => {
  
  // const BatteryHealth = {
  //   series: [
  //     {
  //       name: "Health %",
  //       data: PrevMonthsSoH
  //     },
  //   ],
  //   options: {
  //     ...chartsConfig,
  //     colors: ["#C6DE41"],
  //     stroke: {
  //       lineCap: "round",
  //       curve: 'smooth',
  //       width:2,
  //     },
  //     markers: {
  //       size: -1,
  //       colors:['#C6DE41'],
  //       strokeWidth:0,
  //     },
  //     fill:{
  //       colors:['#C6DE41'],
  //       type:'gradient',
  //       gradient:{
  //         shade:'#C6DE41',
  //         shadeIntensity:0,
  //       },
  //     },
  //     animations: {
  //       enabled: true,
  //       easing: 'linear',
  //       dynamicAnimation: {
  //         speed: 1000
  //       }
  //     },
  //     xaxis: {  
  //       axisTicks: {
  //         show: false,
  //       },
  //       axisBorder: {
  //         show: false,
  //       },
  //       labels: {
  //         style: {
  //           colors: "#848484",
  //           fontSize: "13px",
  //           fontFamily: "inherit",
  //           fontWeight: 300,
  //         },
  //       },
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
  //         "Dec",
  //       ],
  //     },
  //   },
  // };

  return (
    <>
      <div className=" rounded-2xl w-full h-2/3 border text-black border-me-green-100 bg-[#F6F6F6] dark:bg-me-green-300">
        {/* {  */}
        {
          PrevMonthsSoH && 
          <BatteryHealthChart data={PrevMonthsSoH}/>
        }
        {/* <VehicleChart 
          type='area'
          height={'100%'}
          width={'100%'}
          series={BatteryHealth.series}
          options={BatteryHealth.options}
        /> */}
      </div>
      <div className="flex justify-around pt-1 w-full h-1/3">
        <p className='flex flex-col text-sm font-medium text-gray-500'>
          SoH
          <span className='text-black dark:text-white-100 text-sm'>
            {
              SoH||SoH===0 ? 
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
              SoH||SoH===0 ? 
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