import { chartsConfig } from "@/configs";
import { AppContext } from '@/context/userContext';
import { useContext } from "react";

const StatisticsChartsData = () => {
  const { vehicleCalcultedIdData } = useContext(AppContext);

  const AvgDailyMiles = {
    height:'100%',
    width:'100%',
    series: [
      {
        name: "Miles",
        // data: vehicleCalcultedIdData?.avgDailyMiles.avgDistancePrevMonths,
        data: [100,103,98,102],
      },
    ],
    options: {
      colors: ["#C6DE41"],
      // plotOptions: {
      //   bar: {
          // columnWidth: "16%",
      //   },
      // },
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

  const BatteryHealth = {
    type: "area",
    height:'100%',
    width:'100%',
    series: [
      {
        name: "Health %",
        data: [99.85, 99.82, 99.78, 99.67, 99.71, 99.65, 99.60,],
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#C6DE41"],
      stroke: {
        lineCap: "round",
        curve: 'smooth',
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
    
  const statisticsChartsData = [
    {
      title: "Avg Distance Driven",
      chart: AvgDailyMiles,
    },
    {
      title: "Battery Health ",
      chart: BatteryHealth,
    },
  ];
    
  return statisticsChartsData;
};

export default StatisticsChartsData;
