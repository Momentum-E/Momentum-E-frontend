import React from 'react'
import { VehicleComponentProps } from '@/utils/props';
// import statisticsChartsData from '@/configs/statistics-charts-data';

import {
    BasicCarData,
    BatteryHealth,
    VehicleUsage,
    VehicleInfo,
    ChargingPattern
} from '@/components/dashboard/vehicle-components/vehicle-card-components';
import { VehicleCard } from '@/components/dashboard/vehicle-components/VehicleCard';

const VehicleComponent = ({
    vehicleIdData,
    temperatureData,
    vehicleCalculatedIdData,
    unit,
    userLocation,
    setDistanceValue,
}:VehicleComponentProps) => {
    // const chartData = statisticsChartsData()

    const convertDate = (toDate:string|undefined|null) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        if(toDate){
            const date = new Date(toDate).getDate();
            const month = new Date(toDate).getMonth();
            const year = new Date(toDate).getFullYear();
            return `${date} ${monthNames[month]} ${year}`
        }
        else{
            return "-"
        }
    }

    return (
        <div className="max-h-full overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300">
            <div className="p-2 dark:border-gray-700 space-y-4">
                {/* Vehicle Content block 1*/}
                <section className="lg:grid lg:grid-cols-3 md:grid-cols-2 flex flex-col gap-4">
                    <BasicCarData 
                        heading='Loaction'
                        data={userLocation}
                        icon=
                        {
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-9' viewBox="0 0 41 48" fill="none">
                                <path d="M20.5722 4.77037e-05C26.0227 0.0240986 31.2321 2.18436 35.0426 5.97683C38.8773 9.7933 41.0237 14.9539 40.9998 20.3066V20.4266C40.8549 27.6995 36.7549 34.3963 31.642 39.629C28.748 42.5813 25.5403 45.1977 22.0433 47.4059C21.1027 48.198 19.728 48.198 18.7875 47.4059C13.6022 44.0455 9.01991 39.821 5.30583 34.9004C2.04998 30.6279 0.192939 25.4912 0 20.1386C0.0482348 8.9772 9.26109 -0.0239074 20.5722 4.77037e-05ZM20.5722 14.2338C16.9787 14.2338 14.0846 17.0902 14.0846 20.6426C14.0846 24.1495 16.9304 26.9794 20.4998 27.0274H20.5722C22.2845 27.0274 23.9245 26.3793 25.1303 25.2032C26.3845 23.979 27.0863 22.3492 27.0863 20.6426C27.0863 17.0902 24.1656 14.2338 20.5722 14.2338Z" fill="#C6DE41"/>
                            </svg>
                        }
                    />
                    
                    {/* should come from DynamoDB */}
                    <BasicCarData 
                        heading='Data Points Collected'
                        data={vehicleCalculatedIdData?.dataPointCollected}
                        icon=
                        {
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-10 h-11' viewBox="0 0 48 48" fill="none">
                                <path d="M39.508 14.9277V14.9297V15.1395V15.147V15.9914L40.3404 16.1329C42.3171 16.4689 44.0954 17.5342 45.3234 19.1175C46.5513 20.7008 47.1396 22.687 46.972 24.6828C46.8043 26.6787 45.8929 28.5391 44.4179 29.8959C42.9429 31.2526 41.0118 32.0068 39.0067 32.0089H10.6896C8.11952 32.0089 5.65484 30.9887 3.83774 29.1731C2.02067 27.3575 1 24.8951 1 22.3278C1 19.7604 2.02067 17.2981 3.83774 15.4824C5.65484 13.6668 8.11952 12.6466 10.6896 12.6466H11.0422H11.843L12.018 11.8652C12.7665 8.52341 14.7233 5.57513 17.5134 3.58579C20.3034 1.59643 23.7303 0.706103 27.137 1.08567C30.5437 1.46524 33.6901 3.08795 35.973 5.64243C38.2558 8.19689 39.5146 11.5033 39.508 14.9277ZM22.3424 36.5318L19.8697 39.0025L18.161 40.7099H20.5766H31.579V41.7081H20.5766H18.157L19.8706 43.4164L22.3416 45.8796L21.6343 46.5863L16.6025 41.5585L16.6021 41.5581C16.5556 41.5117 16.5188 41.4567 16.4937 41.3962C16.4685 41.3356 16.4556 41.2708 16.4556 41.2053C16.4556 41.1398 16.4685 41.075 16.4937 41.0144C16.5188 40.9539 16.5556 40.8988 16.6021 40.8525L16.6025 40.8521L21.6343 35.8242L22.3424 36.5318Z" stroke="#C6DE41" strokeWidth="2"/>
                            </svg>
                        }
                    />
                    
                    {/* Should come from DB */}
                    <BasicCarData 
                        heading='Connected on'
                        // Get the current date and also pass it into DB
                        data={convertDate(vehicleIdData?.Connected_On)}
                        icon=
                        {
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-9 h-10' viewBox="0 0 44 48" fill="none">
                                <path d="M3.14286 33C2.30932 33 1.50992 33.3161 0.920522 33.8787C0.331122 34.4413 0 35.2043 0 36V45C0 45.7957 0.331122 46.5587 0.920522 47.1213C1.50992 47.6839 2.30932 48 3.14286 48C3.97639 48 4.77579 47.6839 5.36519 47.1213C5.95459 46.5587 6.28571 45.7957 6.28571 45V36C6.28571 35.2043 5.95459 34.4413 5.36519 33.8787C4.77579 33.3161 3.97639 33 3.14286 33ZM15.7143 24C14.8807 24 14.0814 24.3161 13.492 24.8787C12.9026 25.4413 12.5714 26.2044 12.5714 27V45C12.5714 45.7957 12.9026 46.5587 13.492 47.1213C14.0814 47.6839 14.8807 48 15.7143 48C16.5478 48 17.3472 47.6839 17.9366 47.1213C18.526 46.5587 18.8571 45.7957 18.8571 45V27C18.8571 26.2044 18.526 25.4413 17.9366 24.8787C17.3472 24.3161 16.5478 24 15.7143 24ZM40.8571 0C40.0236 0 39.2242 0.316071 38.6348 0.87868C38.0454 1.44129 37.7143 2.20435 37.7143 3V45C37.7143 45.7957 38.0454 46.5587 38.6348 47.1213C39.2242 47.6839 40.0236 48 40.8571 48C41.6907 48 42.4901 47.6839 43.0795 47.1213C43.6689 46.5587 44 45.7957 44 45V3C44 2.20435 43.6689 1.44129 43.0795 0.87868C42.4901 0.316071 41.6907 0 40.8571 0ZM28.2857 12C27.4522 12 26.6528 12.3161 26.0634 12.8787C25.474 13.4413 25.1429 14.2044 25.1429 15V45C25.1429 45.7957 25.474 46.5587 26.0634 47.1213C26.6528 47.6839 27.4522 48 28.2857 48C29.1193 48 29.9186 47.6839 30.508 47.1213C31.0974 46.5587 31.4286 45.7957 31.4286 45V15C31.4286 14.2044 31.0974 13.4413 30.508 12.8787C29.9186 12.3161 29.1193 12 28.2857 12Z" fill="#C6DE41"/>
                            </svg>
                        }
                    />
                </section>

                {/* Vehicle Content block 2*/}
                <section className="flex-row space-y-4 lg:flex md:flex-row lg:space-y-0 gap-4">
                    <VehicleCard
                        divContent='lg:w-[50%] h-80'
                        CardName={'Vehicle Info'}
                        VehicleComponent=
                        {
                            <VehicleInfo 
                                Odometer={vehicleIdData?.odometer.distance}
                                Brand={vehicleIdData?.information.brand}
                                Model={vehicleIdData?.information.model}
                                Year={vehicleIdData?.information.year}
                                Vin={vehicleIdData?.information.vin}
                                unit={unit}
                                batterCapacity={vehicleIdData?.chargeState.batteryCapacity}
                                setDistanceValue={setDistanceValue}
                            />
                        }
                        InfoIconPresent={true}
                        InfoIconContent={"Last Seen:"+"\n"+convertDate(vehicleIdData?.lastSeen)}
                        SideBlockPresent={false}
                    />

                    <VehicleCard
                        divContent='h-80 lg:w-[50%] '
                        CardName={'Charging Pattern'}
                        VehicleComponent=
                        {
                            <ChargingPattern
                                avgSoC={vehicleCalculatedIdData?.socData.avgValue}
                                chargeRate={vehicleCalculatedIdData?.chargeRateData.avgChargingRate}
                                totalChargingSessions={vehicleCalculatedIdData?.totalChargingSessions}
                                connectorType={vehicleCalculatedIdData?.connectorType}
                                batteryLevel = {vehicleIdData?.chargeState.batteryLevel}
                                isCharging={vehicleIdData?.chargeState.isCharging}
                                powerDilveryState={vehicleIdData?.chargeState.powerDeliveryState}
                                timeRemaining={vehicleIdData?.chargeState.chargeTimeRemaining}
                            />
                        }
                        InfoIconPresent={true}
                        InfoIconContent={"Last Updated" +convertDate(vehicleIdData?.chargeState.lastUpdated)}
                        SideBlockPresent={true}
                        SideBlockHeading={'Total Energy Consumed'}
                        SideBlockData={vehicleCalculatedIdData?.chargeRateData.totalEnergyConsumed}
                        SideBlockUnit='kW'
                    />
                </section>
                
                {/* Vehicle Content block 3*/}
                <section className="lg:grid lg:grid-cols-2 lg:space-y-0 grid-col-1 space-y-4 gap-4">          
                    <VehicleCard
                        divContent=' space-y-3 '
                        CardName={'Usage'}
                        VehicleComponent=
                        {
                            <VehicleUsage 
                                avgDailyDistance={vehicleCalculatedIdData?.avgDailyMiles.avgValue}
                                avgDistancePrevMonths = {vehicleCalculatedIdData?.avgDailyMiles.avgDistancePrevMonths}
                                SoCMinRange={vehicleCalculatedIdData?.socData.min}
                                SoCMaxRange={vehicleCalculatedIdData?.socData.max}
                                avgRealRangeObserved={vehicleCalculatedIdData?.rangeData.avgRealRange}
                                minRange={vehicleCalculatedIdData?.rangeData.minRange}
                                maxRange={vehicleCalculatedIdData?.rangeData.maxRange}
                                certifiedRange={vehicleCalculatedIdData?.certifiedRange}
                                temperatureData={temperatureData}
                                setDistanceValue={setDistanceValue}
                                unit={unit}
                            />
                        }
                        SideBlockPresent={false}
                    />

                    <VehicleCard
                        divContent='h-[445px] space-y-5'
                        CardName={'Battery Health'}
                        VehicleComponent=
                        { 
                            <BatteryHealth
                                SoH={vehicleCalculatedIdData?.sohData.currentSoh}
                                PrevMonthsSoH={vehicleCalculatedIdData?.sohData.prevMonthsSoh}
                            /> 
                        }
                        SideBlockPresent={true}
                        SideBlockHeading={'State of Health'}
                        SideBlockData={vehicleCalculatedIdData?.sohData.currentSoh}
                        SideBlockUnit='%'
                    />
                </section>
            </div>
        </div>
  )
}

export default VehicleComponent