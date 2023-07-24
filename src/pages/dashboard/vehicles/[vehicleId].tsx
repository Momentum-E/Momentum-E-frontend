import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { DashboardLayout } from '@/layouts/';
import VehicleData from '@/components/dashboard/vehicle-components/VehicleData';
import { useAppContext } from '@/context/userContext';
import { useTheme } from 'next-themes';

function VehicleDashboardContent() {
  const router = useRouter();
  const { vehicleId } = router.query;
  
  const { theme, setTheme } = useTheme()
  const {isLoading,filteredVehicleData,vehicleIdData}:any = useAppContext()

  useEffect(()=>{
    filteredVehicleData(vehicleId)
  },[vehicleId])
  
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
          <div className="flex absolute right-12 bottom-8 translate-x-1/2 translate-y-1/2 bg-white-100 dark:bg-gray-900 border border-gray-900 dark:border-white-100 rounded-full md:order-2">
            <ul className="flex flex-row p-2 md:space-x-8 md:mt-0 md:text-sm md:font-medium">            
              <li>
                  <button className="block rounded md:p-0" onClick={()=> setTheme( theme === "dark"? "light": "dark" )}>
                  { theme==="dark"? 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white-100">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                  : 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                  }
                  </button>
              </li>
            </ul>
          </div>
      </div>
    </DashboardLayout>
  )
}

export default VehicleDashboardContent 