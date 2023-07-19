import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { DashboardLayout } from '@/layouts/';
import VehicleData from '@/components/dashboard/vehicle-components/VehicleData';

function VehicleDashboardContent() {
  const router = useRouter();
  const { vehicleId } = router.query;

  useEffect(() => {
    console.log(vehicleId)
  }, [vehicleId])
  

  return (
    <DashboardLayout page={vehicleId}>
      <div className='h-screen overflow-auto pb-16 scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300'>
          <VehicleData vehicleId={vehicleId}/>
        {/* Add your specific dashboard content for the vehicle */}
      </div>
    </DashboardLayout>
  )
}

export default VehicleDashboardContent 