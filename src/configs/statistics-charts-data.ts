import { chartsConfig } from "@/configs";

const AvgDailyMiles = {
    type: "bar",
    height:'90%',
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
          borderRadius: 10,
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
        data: [50, 40, 30, 32, 50, 135, 20, 23, 50,20, 23, 50,20, 23, 50],
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
        size: 0,
      },
      fill:{
        type:'gradient',
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
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec","Oct",
          "Nov",
          "Dec","Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  };
  
  
export const statisticsChartsData = [
    {
      title: "Avg Daily Miles Driven",
      chart: AvgDailyMiles,
    },
    {
      title: "Battery Health ",
      chart: BatteryHealth,
    },
  ];