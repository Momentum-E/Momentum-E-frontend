import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { DashboardLayout } from '@/layouts/';
import VehicleData from '@/components/dashboard/vehicle-components/VehicleData';
import { useAppContext } from '@/context/userContext';
import SetValue from '@/components/dashboard/set-values-component/SetValue';

function VehicleDashboardContent() {
  const router = useRouter();
  const { vehicleId } = router.query;
  

  const {isLoading,vehicleIdData}:any = useAppContext()


  
  return (
    <DashboardLayout page={vehicleId}>
      <div className='h-screen overflow-y-auto overflow-x-hidden pb-16 scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300'>
          {
            isLoading?
            (
              <span className='h-full flex items-center justify-center'>Loading...</span>
            )
            :
            (
              <VehicleData vehicleData={vehicleIdData}/>
            )
          }
          <SetValue/>
      </div>
    </DashboardLayout>
  )
}

export default VehicleDashboardContent 