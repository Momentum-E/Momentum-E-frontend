// import React from 'react'
// import dynamic from 'next/dynamic'
// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// type VehicleChartProps = {
//     type:"area" | "line" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap" | undefined;
//     height:number|string;
//     width:number|string;
//     options:Record<any,any>;
//     series:{
//         name: string;
//         data: (number|null)[]|any;
//     }[];
// }
// const VehicleChart  = ({
//     type,
//     height,
//     width,
//     options,
//     series,
// }:VehicleChartProps) => {
//   return (
//     <Chart
//         type={type}
//         height={height}
//         width={width}
//         series={series}
//         options={options}
//     />
//   )
// }

// export default VehicleChart