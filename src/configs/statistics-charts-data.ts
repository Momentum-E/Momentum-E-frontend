import { chartsConfig } from "@/configs";

const AvgDailyMiles = {
    type: "bar",
    height:'100%',
    width:'100%',
    series: [
      {
        name: "Miles",
        data: [40, 10, 22],
      },
    ],
    options: {
      ...chartsConfig,
      colors: "#C6DE41",
      plotOptions: {
        bar: {
          columnWidth: "16%",
          borderRadius: 5,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ["Jan", "Feb", "Mar"],
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
        //  99.45, 99.30, 99.29, 99.21, 98
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
        ...chartsConfig.xaxis,
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          // "Aug",
          // "Sep",
          // "Oct",
          // "Nov",
          // "Dec",
        ],
      },
    },
  };
  
  
export const statisticsChartsData = [
    {
      title: "Avg Distance Driven (3 months)",
      chart: AvgDailyMiles,
    },
    {
      title: "Battery Health ",
      chart: BatteryHealth,
    },
  ];