import React from 'react'
import dynamic from 'next/dynamic'
import { chartsConfig } from "@/configs";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type ChartProps = {
    data:(number | null)[]|undefined|any;
}

const VehicleUsageChart = ({
    data
}:ChartProps) => {

  const AvgDailyMiles = {
    height:'100%',
    width:'100%',
    series: [
      {
        name: "Miles",
        data: data,
      },
    ],
    options: {
      colors: ["#C6DE41"],
      ...chartsConfig,
      xaxis: {
        // {
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
        // },
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
          "Dec"
        ],
      },
    },
  };

  return (
    <Chart 
      type={"bar"}
      height={AvgDailyMiles.height} 
      width={AvgDailyMiles.width} 
      options={AvgDailyMiles.options} 
      series={AvgDailyMiles.series}
    />
  )
}

export default VehicleUsageChart