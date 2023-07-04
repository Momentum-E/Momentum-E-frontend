import { useRouter } from 'next/router';
import React from 'react'
import { DashboardLayout } from '@/components/dashboard';

function VehicleDashboardContent() {
    const router = useRouter();
    const { vehicleId } = router.query;

  return (
    <DashboardLayout>
      <>
        {vehicleId ? (
          <div className="max-h-full overflow-auto">
              <h1 className='text-white-100'>Vehicle Dashboard Content for Vehicle ID: {vehicleId}</h1>
              <div className="p-4 border-2 border-white-100 border-dashed rounded-lg dark:border-gray-700">
              <div className="md:grid md:grid-cols-3 flex flex-col gap-4 mb-4">
                  <div className="flex items-center justify-center h-24 rounded bg-white-200/20 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                  </div>
                  <div className="flex items-center justify-center h-24 rounded bg-white-200/20 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                  </div>
                  <div className="flex items-center justify-center h-24 rounded bg-white-200/20 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                  </div>
              </div>
              <div className="flex items-center justify-center h-48 mb-4 rounded bg-white-200/20 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center justify-center rounded bg-white-200/20 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                  </div>
                  <div className="flex items-center justify-center rounded bg-white-200/20 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                  </div>
                  <div className="flex items-center justify-center rounded bg-white-200/20 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                  </div>
                  <div className="flex items-center justify-center rounded bg-white-200/20 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                  </div>
              </div>
              <div className="flex items-center justify-center h-48 mb-4 rounded bg-white-200/20 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-center rounded bg-white-200/20 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                  </div>
                  <div className="flex items-center justify-center rounded bg-white-200/20 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                  </div>
                  <div className="flex items-center justify-center rounded bg-white-200/20 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                  </div>
                  <div className="flex items-center justify-center rounded bg-white-200/20 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                  </div>
              </div>
              </div>
          </div>
        ) : (
          <h1 className='text-white-100'>No vehicle selected.</h1>
        )}
        {/* Add your specific dashboard content for the vehicle */}
      </>
    </DashboardLayout>
  )
}

export default VehicleDashboardContent 