import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { DashboardLayout } from '@/layouts/';
// import { BasicCarData } from '@/components/dashboard/vehicle-components';
import VehicleData from '@/components/dashboard/vehicle-components/VehicleData';

function VehicleDashboardContent() {
    const router = useRouter();
    const { vehicleId } = router.query;

    useEffect(()=>{
      // code to fetch the vehicle data according to the vehicleid and display in frontend 
    },[])
 
  return (
    <DashboardLayout >
      <div className='h-screen overflow-auto pb-16 scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300'>
        {vehicleId ? (
          <VehicleData/>
        ) : (
          <h1 className='text-white-100'>Welcome User</h1>
        )}
        {/* Add your specific dashboard content for the vehicle */}
      </div>
    </DashboardLayout>
  )
}

export default VehicleDashboardContent 