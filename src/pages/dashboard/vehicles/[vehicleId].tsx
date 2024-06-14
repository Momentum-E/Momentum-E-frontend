import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '@/context/userContext';
import { AccountContext } from '@/context/AccountContext';

import { DashboardLayout } from '@/layouts/';
import {Loader} from '@/components/shared';
import VehicleComponent from '@/components/dashboard/vehicle-components/VehicleComponent';
import axios from 'axios';
import { vehicleCalcultedDataProps, vehicleDataProps } from '@/utils/props';

const VehicleDashboardContent = () => {
  const router = useRouter();
  const { vehicleId } = router.query;
  const {
    userId,
    userLocation, 
    isLoading,
    unit, 
    temperatureData,
    vehicleData,
    vehicleCalcultedData,
    UpdateIdToken,
    setDistanceValue, 
  } = useContext(AppContext)
  const {IdToken} = useContext(AccountContext)
  
  const [vehicleIdData, setVehicleIdData] = useState<vehicleDataProps>()
  const [vehicleCalcultedIdData,setVehicleCalcultedIdData] = useState<vehicleCalcultedDataProps>()
  
  // Function for getting data of a particular vehicle_Id
  const filteredVehicleData = (v_id:any) => {
    if(IdToken && v_id && vehicleCalcultedData && vehicleData && vehicleData.length > 0){
      setVehicleIdData(vehicleData.find(vehicle => vehicle.id === vehicleId))
      setVehicleCalcultedIdData(vehicleCalcultedData[v_id])
      try{
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/user-data/users/${userId}/${vehicleId}`,{
          headers:{
            authorization: `Bearer ${IdToken}`
          }
        })
        .then((res) => {
          console.log(res.data)
          // console.log("SoH: "+vehicleCalcultedIdData?.sohData.currentSoh)
        })
        .catch(async (err) => {
          console.log("Error in filteredVehicleData: "+err)
          await UpdateIdToken()
          // filteredVehicleData(vehicleId)
        })
      }
      catch(error){
        console.log("Caught error in filteredVehicleData: "+error)
      }
    }
    else{
      console.log('No vehicles added.')
    }
  }

  useEffect(()=>{
    filteredVehicleData(vehicleId)
  },[vehicleId,vehicleData])

  return (
    <DashboardLayout page={`vehicles / ${JSON.stringify({id:vehicleIdData?.id,vin:vehicleIdData?.information.vin})}`}>
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
            <VehicleComponent
              vehicleIdData={vehicleIdData}
              vehicleCalculatedIdData={vehicleCalcultedIdData}
              temperatureData={temperatureData}
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