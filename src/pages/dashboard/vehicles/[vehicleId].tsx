import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import { AppContext } from '@/context/userContext';

import { DashboardLayout } from '@/layouts/';
import VehicleComponent from '@/components/dashboard/vehicle-components/VehicleComponent';
import axios from 'axios';

const VehicleDashboardContent = () => {
  const router = useRouter();
  const { vehicleId } = router.query;
  const {
    userId,
    userLocation, 
    isLoading,
    unit, 
    vehicleIdData,
    temperatureData,
    vehicleData,
    vehicleCalcultedData,
    vehicleCalcultedIdData,
    setDistanceValue, 
    setVehicleIdData,
    setVehicleCalcultedIdData,
    // filteredVehicleData,
  } = useContext(AppContext)

  useEffect(()=>{
    // Function for getting data of a particular vehicle_Id
    const filteredVehicleData = (v_id:any) => {
      if(v_id && vehicleCalcultedData && vehicleData && vehicleData.length > 0){
        setVehicleIdData(vehicleData.find(vehicle => vehicle.id === vehicleId))
        setVehicleCalcultedIdData(vehicleCalcultedData[v_id])
        // axios.get(`http://localhost:5000/user-data/users/${userId}/${vehicleId}`)
        // .then((res) => {
        //   console.log(res.data)
        //   setVehicleIdData(res.data.vehicleData)
        //   setVehicleCalcultedIdData(res.data.processedData)
        // })
        // .catch((err) => {
        //   console.log("Error in filteredVehicleData: "+err)
        // })
      }
      else{
        console.log('No vehicles added.')
      }
    }
    filteredVehicleData(vehicleId)
  },[vehicleId,vehicleData])



  return (
    <DashboardLayout page={`vehicles / ${vehicleIdData?.information?.vin}`}>
      <div className='h-screen overflow-y-auto overflow-x-hidden pb-16 scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300'>
        {
          isLoading?
          (
            <span className='h-full flex items-center justify-center'>
              Loading...
            </span>
          )
          :
          (
            <VehicleComponent
              vehicleIdData={vehicleIdData}
              temperatureData={temperatureData}
              vehicleCalcultedIdData={vehicleCalcultedIdData}
              SoH={vehicleCalcultedIdData?.soh}
              unit={unit}
              userLocation={userLocation}
              setDistanceValue={setDistanceValue}
            />
          )
        }
      </div>
    </DashboardLayout>
  )
}

export default VehicleDashboardContent 