import React from 'react'
import Image from 'next/image'
import { audi_e_tron_9_black } from '@/assets/images'
import { vehicleDataProps } from '@/utils/props/props';

type vehicleInfoProps = {
  Odometer:number;
  Brand:string;
  Model:string;
  Year:number;
  Vin:string;
}

const  VehicleInfo = ({
  Odometer,
  Vin,
  Brand,
  Model,
  Year,
}:vehicleInfoProps) => {
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthIndex = (new Date().getMonth());
  let monthYear = (new Date().getFullYear())

  return (
    <>
      <p className='text-white-100 text-lg'>  
        {`${monthNames[monthIndex]} ${monthYear}`} Report
      </p>
      <div className='h-full flex justify-between pt-5'> 
        <div className="">
          <p className='text-white-100 text-xl'> 
          <span className='text-gray-400 text-base xl:text-lg'>Odometer: </span>
          {`${Odometer} Kms`}
          </p>

          <p className='text-white-100 text-xl'> 
          <span className='text-gray-400 text-base xl:text-lg'>Car Model: </span>
          {Brand} {Model}
          </p>
          
          <p className='text-white-100 text-xl'> 
          <span className='text-gray-400 text-base xl:text-lg'>Model Year: </span>
            {Year}
          </p>

          <p className='text-white-100 text-xl'> 
          <span className='text-gray-400 text-base xl:text-lg'>VIN: </span>
          {Vin}
          </p>
        </div>
        <div className="hidden xl:block">
            <Image
                src={audi_e_tron_9_black}
                className='w-auto h-auto'
                alt='Car'
            />
        </div>
      </div>
    </>
  )
}

export default VehicleInfo