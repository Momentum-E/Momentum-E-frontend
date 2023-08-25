import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
// import SetValue from '@/components/dashboard/set-values-component/SetValue';

import VehicleData from '@/components/dashboard/vehicle-components/VehicleData';
import { DashboardLayout } from '@/layouts/';

const VehicleDashboardContent = () => {
  const router = useRouter();
  const { vehicleId } = router.query;
  
  useEffect(()=>{
  },[vehicleId])

  return (
    <DashboardLayout page={'vehicles / '+vehicleId}>
      <div className='h-screen overflow-y-auto overflow-x-hidden pb-16 scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300'>
        <VehicleData/>  
        {/* <SetValue/> */}
      </div>
    </DashboardLayout>
  )
}

export default VehicleDashboardContent 