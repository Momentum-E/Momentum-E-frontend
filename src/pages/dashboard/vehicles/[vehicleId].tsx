import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '@/layouts/';
import VehicleData from '@/components/dashboard/vehicle-components/VehicleData';
import axios from 'axios';
import { vehicleDataProps } from '@/utils/props/props';
import { useAppContext } from '@/context/userContext';

function VehicleDashboardContent() {
  const router = useRouter();
  const { vehicleId } = router.query;
  const [vehicleData, setVehicleData] = useState<vehicleDataProps|any>()
  
  const {userId}:any = useAppContext()

  useEffect(()=>{
    axios.get(`http://localhost:5000/vehicles/get-vehicles/${vehicleId}`,{
      headers:{
        "user-id":userId,
      },
    }).then((res)=>{
      setVehicleData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[vehicleId])
  
  
  useEffect(() => {
    // console.log("Id: "+userId)
    // console.log("vId: "+vehicleId)
    console.log(userId)
    console.log("vehicleIdData: "+ vehicleData)
  }, [vehicleId])

  return (
    <DashboardLayout page={vehicleId}>
      <div className='h-screen overflow-auto pb-16 scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300'>
          <VehicleData vehicleData={vehicleData}/>
      </div>
    </DashboardLayout>
  )
}

export default VehicleDashboardContent 