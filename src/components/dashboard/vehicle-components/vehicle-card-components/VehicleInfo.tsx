import React from 'react'
import Image from 'next/image'
import { audi_e_tron_9_black } from '@/assets/images'

const  VehicleInfo = () => {
  return (
    <div className='h-full flex justify-between pt-5'> 
        <div className="">
            <p className='text-white-100 text-lg'>  
              {`11 July 2023`} Report
            </p>

            <p className='text-white-100 text-xl'> 
            <span className='text-gray-400 text-base xl:text-lg'>Odometer: </span>
            {`234`} {`Km`}
            </p>

            <p className='text-white-100 text-xl'> 
            <span className='text-gray-400 text-base xl:text-lg'>Car Model: </span>
            {`Hyundai`} {`KONA`} {`2020`}
            </p>

            <p className='text-white-100 text-xl'> 
            <span className='text-gray-400 text-base xl:text-lg'>VIN: </span>
            {`102MBRV42ABZ29854`}
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
  )
}

export default VehicleInfo