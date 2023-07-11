// @ts-nocheck
import React from 'react'
import { statisticsChartsData } from '@/configs';
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

//     plugins:{
//         legend:{
//             // position:"top",
//             // align:"start",
//             // labels:{
//             //     boxWidth:7,
//             //     usePointStyle:true,
//             //     pointStyle:"circle",
//             // },
//             display:false,
//         },
//         // title:{
//         //     text:'Avg daily miles driven',
//         //     display:true,
//         //     color:'#000',
//         //     font:{
//         //         size:18,
//         //     },
//         // },
//     },
//     scales:{
//         xAxis:{
//             display:true,
//         },
//         yAxis:{
//             max:1,
//         },
//     },
//     // elements:{
//     //     bar:{
//     //         barPercentage:0.3,
//     //         categoryPercetage:1,
//     //     },
//     // },
// };

const AvgDailyMilesDriven = () => {
    return (
        <div className='text-white-100 w-full text-lg font-medium'>
            <div className="flex flex-row justify-between">
                {statisticsChartsData[0].title}
                <div className="flex flex-col items-center text-xs p-1 rounded-lg border border-white-100  bg-dashboard-gradient backdrop-blur-3xl">
                    Avg Miles Driven
                    <span className='text-me-green-200'>{`250`}</span>
                </div>
            </div>
            <p className='text-green-500 text-sm font-normal'>
                (+5) more 
                <span className='text-gray-300 '> in 2023</span>
            </p>
            <Chart {...statisticsChartsData[0].chart}/>
        </div>
  )
}

export default AvgDailyMilesDriven