import React from 'react'
import CardSideBlock from './CardSideBlock'

type VehicleCardProps = {
    divContent:string
    CardName: string
    VehicleComponent: JSX.Element
    SideBlockPresent: boolean
    SideBlockHeading?: string
    SideBlockData?: string | number | undefined | null
    SideBlockUnit?: string 
}

const VehicleCard: React.FC<VehicleCardProps>  = ({
    divContent,
    CardName,
    VehicleComponent,
    SideBlockPresent,
    SideBlockHeading,
    SideBlockData,
    SideBlockUnit,
}) => {
  return (
    <div className={` ${divContent} flex flex-0 flex-col justify-between p-3 text-lg text-gray-600 font-medium border border-me-green-200 rounded-2xl bg-gradient-to-br from-white-100 to-gray-200/50 dark:bg-dashboard-gradient`}>
        <div className="w-full flex justify-between">
            <p className='flex flex-col text-lg'>
                {CardName}
            </p>
            {
                SideBlockPresent && 
                <CardSideBlock
                    CardData={SideBlockData}
                    CardHeading={SideBlockHeading}
                    CardUnit={SideBlockUnit}
                />
            }
        </div>
        {/* <ChargingPattern
            avgSoC={vehicleIdData?.chargeState?.batteryLevel}
            chargeRate={vehicleIdData?.chargeState?.chargeRate}
        /> */}
        {VehicleComponent}
    </div>
  )
}

export default VehicleCard