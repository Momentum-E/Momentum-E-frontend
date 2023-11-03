import React, { Suspense, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import { AppContext } from '@/context/userContext';
import { vehicleCalcultedDataProps, vehicleDataProps } from '@/utils/props';

import { DashboardLayout } from '@/layouts/';
import {Loader} from '@/components/shared';
import VehicleComponent from '@/components/dashboard/vehicle-components/VehicleComponent';

const VehicleDashboardContent = () => {
  const router = useRouter();
  const { vehicleId } = router.query;
  const [vehicleIdData, setVehicleIdData] = useState<vehicleDataProps>()
  const [vehicleCalcultedIdData,setVehicleCalcultedIdData] = useState<vehicleCalcultedDataProps>()
  const {
    userId,
    userLocation, 
    isLoading,
    unit, 
    // vehicleIdData,
    temperatureData,
    vehicleData,
    vehicleCalcultedData,
    // vehicleCalcultedIdData,
    setDistanceValue, 
    // setVehicleIdData,
    // setVehicleCalcultedIdData,
    // filteredVehicleData,
  } = useContext(AppContext)

  useEffect(()=>{
    // Function for getting data of a particular vehicle_Id
    const filteredVehicleData = (v_id:any) => {
      if(v_id && vehicleCalcultedData && vehicleData && vehicleData.length > 0){
        setVehicleIdData(vehicleData.find(vehicle => vehicle.id === vehicleId))
        setVehicleCalcultedIdData(vehicleCalcultedData[v_id])

        axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/user-data/users/${userId}/${vehicleId}`)
        .then((res) => {
          // console.log(res.data)
        })
        .catch((err) => {
          console.log("Error in filteredVehicleData: "+err)
        })
      }
      else{
        console.log('No vehicles added.')
      }
    }
    console.log("vId: "+JSON.stringify(vehicleIdData?.information.vin))
    filteredVehicleData(vehicleId)
  },[vehicleId,vehicleData])



  return (
    <DashboardLayout page={`vehicles / ${vehicleIdData?.information?.vin}`}>
      <div className='h-screen overflow-y-auto overflow-x-hidden pb-16 scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300'>
        {
          isLoading?
          (
            <span className='h-full flex items-center justify-center'>
              <Loader LoaderSize={24}/>
            </span>
          )
          :
          (
            <Suspense fallback={<Loader LoaderSize={24}/>}>
              <VehicleComponent
                vehicleIdData={vehicleIdData}
                vehicleCalcultedIdData={vehicleCalcultedIdData}
                temperatureData={temperatureData}
                unit={unit}
                userLocation={userLocation}
                setDistanceValue={setDistanceValue}
              />
            </Suspense>
          )
        }
      </div>
    </DashboardLayout>
  )
}

export default VehicleDashboardContent 