import React, { useEffect, useState,useCallback } from 'react'
import { YourVehicleProps } from '@/utils/props';
import {useRouter} from 'next/router';

const YourVehicles = ({
    isLoading,
    vehicleData, 
    setIsOpen, 
    isTab,
    page,
}:YourVehicleProps) => {
    // let [vehicleId,setvehicleId]=useState<string>() 
    const router = useRouter()

    // // Function for deleting a single vehicle. 
    // const DeleteVehicle = (v_no:string) => {
    //     const delete_vehicle = v_no
    //     console.log(delete_vehicle)
    // }

    // const {filteredVehicleData} = useAppContext()

    // useEffect(()=>{
    //     const onVehicleClick = useCallback(() => {
    //         if(vehicleId){
    //         // if(vid){
    //             // filteredVehicleData(vehicleId)
    //             router.replace(`/dashboard/vehicles/${vehicleId}`)
    //             setIsOpen(!isTab)
    //         }
    //     },[])
    //     onVehicleClick()
    // },[vehicleId])

    const onVehicleClick = useCallback((vid:string) => {
        if(vid){
            // setvehicleId(vid)
            router.replace(`/dashboard/vehicles/${vid}`)
            setIsOpen(!isTab)
        }
    },[])

    return (
      <div className='h-full'>
        {/* vehice items */}  
        <span className="dark:text-white-100 inline-block ">Your Vehicles</span>
        <div className="flex flex-col items-center h-full space-y-2">
            {
                !isLoading ?
                (
                    <div
                    className="whitespace-pre flex flex-col text-left w-full gap-1 p-1 h-[46%] md:h-[50%] font-medium overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300">
                    {
                        (vehicleData.length > 0)
                        ?
                        (
                            vehicleData.map((data) => 
                            (
                                <div
                                key={data.id}
                                className={`${page===`vehicles / ${data.information.vin}` ? `active `:` `} 
                                group dark:text-white-100 link flex justify-between md:justify-start`}>
                                    <button
                                    // onClick={()=>setvehicleId(data.id)}
                                    onClick={()=>onVehicleClick(data.id)}
                                    className="px-2 h-full w-full overflow-hidden text-left overflow-ellipsis group-hover:mr-2"
                                    >
                                        {data.information.vin}
                                    </button>

                                    {/* Future feature for deleting a single vehicle*/}

                                    {/* <button
                                    type="button" 
                                    onClick={()=>DeleteVehicle(data.id)}
                                    className='flex md:hidden md:group-hover:flex hover:bg-me-green-100/70 dark:hover:bg-gray-700/40 rounded-md'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 p-1 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button> 
                                    */}
                                </div>
                            )
                            )
                        )
                        :
                        (
                            <span className='flex items-center justify-center text-sm text-gray-400'>
                                No vehicles added
                            </span>
                        )
                        }
                    </div>
                )
                :
                (
                    <span className='flex items-center justify-center w-full h-[46%] text-sm text-gray-400'>
                        Loading...
                    </span>
                )
            }
            
            <div 
            className="bg-dashboard-sidebar-image space-y-5 w-56 h-44 p-4 bg-cover bg-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <rect width="35" height="35" rx="12" fill="white"/>
                <path d="M17.5 7C20.2848 7 22.9555 8.10625 24.9246 10.0754C26.8938 12.0445 28 14.7152 28 17.5C28 20.2848 26.8938 22.9555 24.9246 24.9246C22.9555 26.8938 20.2848 28 17.5 28C14.7152 28 12.0445 26.8938 10.0754 24.9246C8.10625 22.9555 7 20.2848 7 17.5C7 14.7152 8.10625 12.0445 10.0754 10.0754C12.0445 8.10625 14.7152 7 17.5 7ZM18.0565 11.488C16.8355 11.488 15.8785 11.8345 15.169 12.5275C14.443 13.2205 14.0965 14.1775 14.0965 15.3985H15.9775C15.9775 14.7055 16.1095 14.161 16.39 13.7815C16.7035 13.3195 17.215 13.105 17.941 13.105C18.502 13.105 18.9475 13.2535 19.261 13.567C19.558 13.8805 19.723 14.3095 19.723 14.854C19.723 15.2665 19.5745 15.6625 19.2775 16.0255L19.0795 16.2565C18.007 17.2135 17.3635 17.9065 17.149 18.352C16.918 18.7975 16.819 19.342 16.819 19.969V20.2H18.7165V19.969C18.7165 19.573 18.799 19.2265 18.964 18.8965C19.1125 18.5995 19.327 18.319 19.624 18.0715C20.416 17.3785 20.8945 16.933 21.043 16.768C21.439 16.24 21.6535 15.5635 21.6535 14.7385C21.6535 13.732 21.3235 12.94 20.6635 12.3625C20.0035 11.7685 19.129 11.488 18.0565 11.488ZM17.7595 21.0085C17.4231 20.9994 17.0967 21.124 16.852 21.355C16.7312 21.4688 16.6362 21.6073 16.5736 21.761C16.511 21.9147 16.4821 22.0801 16.489 22.246C16.489 22.609 16.6045 22.906 16.852 23.137C17.0949 23.3728 17.421 23.5032 17.7595 23.5C18.1225 23.5 18.4195 23.3845 18.667 23.1535C18.7904 23.0373 18.888 22.8965 18.9533 22.7401C19.0187 22.5838 19.0505 22.4154 19.0465 22.246C19.0497 22.0806 19.0191 21.9163 18.9567 21.7631C18.8943 21.61 18.8013 21.4711 18.6835 21.355C18.4324 21.1236 18.1009 20.9992 17.7595 21.0085Z" fill="#C6DE41"/>
                </svg>

                <p className='flex flex-col text-white-100 text-base font-bold'>
                    Need Help, contact us
                    <span className=' font-medium'>
                        <a href="mailto:info@momentum-e.com">info@momentum-e.com</a>
                    </span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default YourVehicles