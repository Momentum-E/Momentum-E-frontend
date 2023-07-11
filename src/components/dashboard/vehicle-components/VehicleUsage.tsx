import React from 'react'

const VehicleUsage = () => {
  return (
    <>
        <p>Usage</p>
        <div className="flex justify-between h-full md:px-8">
            <div className='h-full grid grid-cols-2 w-full md:py-8 gap-5  justify-between'>
                <p className='flex flex-col text-sm font-medium text-gray-400'>
                  Avg Daily Miles Driven
                  <span className='text-white-100 text-xl'>
                    {102} Miles
                  </span>
                </p>
                
                <p className='flex flex-col text-sm font-medium text-gray-400'>
                  SoC Range
                  <span className='text-white-100 text-xl'>
                    45%
                  </span>
                </p>
                
                <p className='flex flex-col text-sm font-medium text-gray-400'>
                  Avg Real Range Observed
                  <span className='text-white-100 text-xl'>
                    25%
                  </span>
                </p>

                <p className='flex flex-col text-sm font-medium text-gray-400'>
                  Observed v/s OEM provided
                  <span className='text-white-100 text-xl'>
                    78
                  </span>
                </p>
            </div>
        </div>    
    </>
  )
}

export default VehicleUsage