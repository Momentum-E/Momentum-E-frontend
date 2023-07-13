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
      <>
        {vehicleId ? (
          <VehicleData/>
        ) : (
          router.push('/dashboard/profile ')
        )}
        {/* Add your specific dashboard content for the vehicle */}
      </>
    </DashboardLayout>
  )
}

export default VehicleDashboardContent 