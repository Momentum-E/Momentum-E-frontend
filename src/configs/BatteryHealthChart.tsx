// @ts-nocheck
import React from 'react'
import dynamic from 'next/dynamic'
import { chartsConfig } from "@/configs";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type ChartProps = {
    data:(number | null)[];
}

const BatteryHealthChart = ({
    data
}:ChartProps) => {

  const BatteryHealth = {
    type: "area",
    height:'100%',
    width:'100%',
    series: [
      {
        name: "Health %",
        data: data
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#C6DE41"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
        width:2,
      },
      markers: {
        size: -1,
        colors:['#C6DE41'],
        strokeWidth:0,
      },
      fill:{
        colors:['#C6DE41'],
        type:'gradient',
        gradient:{
          shade:'#C6DE41',
          shadeIntensity:0,
        },
      },
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      xaxis: {  
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#848484",
            fontSize: "13px",
            fontFamily: "inherit",
            fontWeight: 300,
          },
        },
        categories: 
        [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  };

  return (
      <Chart 
          type={'area'}
          height={BatteryHealth.height} 
          width={BatteryHealth.width} 
          options={BatteryHealth.options} 
          series={BatteryHealth.series}
      />
  )
}

export default BatteryHealthChart