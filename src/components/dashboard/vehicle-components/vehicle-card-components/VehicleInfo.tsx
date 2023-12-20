import React from 'react'
import { vehicleInfoProps } from '@/utils/props';
// import Image from 'next/image'
// import { audi_e_tron_9_black } from '@/assets/images'

const  VehicleInfo = ({
  Odometer,
  Vin,
  Brand,
  Model,
  Year,
  unit,
  batterCapacity,
  setDistanceValue
}:vehicleInfoProps) => {
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthIndex = (new Date().getMonth());
  let monthYear = (new Date().getFullYear())

  return (
    <>
      <p className='dark:text-white-100 text-black text-lg'>  
        {`${monthNames[monthIndex]} ${monthYear}`} Report
      </p>
      <div className='h-full flex justify-between pt-2'> 
        <div className="">
          <p className='dark:text-white-100 text-black text-lg'> 
            <span className='text-gray-500 text-base xl:text-lg'>
              Odometer : 
            </span>
            {` ${setDistanceValue(Odometer)} ${unit}`}
          </p>

          <p className='dark:text-white-100 text-black text-lg'> 
            <span className='text-gray-500 text-base xl:text-lg'>
              Car Model : 
            </span>
            { " "+Brand+" "+Model }
          </p>
          
          <p className='dark:text-white-100 text-black text-lg'> 
            <span className='text-gray-500 text-base xl:text-lg'>
              Model Year : 
            </span>
            { " "+ Year }
          </p>

          <p className='dark:text-white-100 text-black text-lg'> 
            <span className='text-gray-500 text-base xl:text-lg'>
              VIN :
            </span>
            { " "+ Vin }
          </p>
          <p className='dark:text-white-100 text-black text-lg'> 
            <span className='text-gray-500 text-base xl:text-lg'>
              Battery Capacity :
            </span>
            { " "+ batterCapacity+" "+ "kWh" }
          </p>
        </div>
        {/* <div className="md:hidden xl:block">
            <Image
                src={audi_e_tron_9_black}
                className='w-auto h-auto'
                alt='Car'
            />
        </div> */}
      </div>
    </>
  )
}

export default VehicleInfo