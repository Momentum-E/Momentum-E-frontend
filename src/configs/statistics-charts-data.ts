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
        data: [50, 40, 30, 32, 50, 95, 20, 23, 50,20, 23, 63,],
      },
    ],
    options: {
      ...chartsConfig,
      theme:{
        mode:'light',
        palette:'',
        monochrome:{
          enable:true,
          color:['#C6DE41'],
          shadeTo:'light',
          shadeIntensity:0,
        },
      },
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
          "Aug",
          "Sep",
          "Oct",
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