import React from 'react'
import CardSideBlock from './CardSideBlock'

type VehicleCardProps = {
    divContent:string
    CardName: string
    VehicleComponent: JSX.Element
    infoIconPresent?:boolean
    SideBlockPresent: boolean
    SideBlockHeading?: string
    SideBlockData?: string | number | undefined | null
    SideBlockUnit?: string 
}

const VehicleCard: React.FC<VehicleCardProps>  = ({
    divContent,
    CardName,
    infoIconPresent=false,
    VehicleComponent,
    SideBlockPresent,
    SideBlockHeading,
    SideBlockData,
    SideBlockUnit,
}) => {
  return (
    <div className={` ${divContent} flex flex-0 flex-col justify-between p-3 text-lg text-gray-500 dark:text-gray-400 font-medium border border-me-green-200 rounded-2xl bg-gradient-to-br from-white-100 to-gray-200/50 dark:bg-dashboard-gradient`}>
        <div className="w-full flex justify-between text-lg">
            <p className='flex flex-row my-auto'>
                <span>
                    {CardName}
                </span>
                <span className='ml-2 my-auto hover:cursor-pointer'>
                    {
                        infoIconPresent &&
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                    }
                </span>
            </p>
            {
                SideBlockPresent && 
                <CardSideBlock
                CardHeading={SideBlockHeading}
                    CardData={SideBlockData ? SideBlockData : '-'}
                    CardUnit={SideBlockUnit}
                />
            }
        </div>
        {VehicleComponent}
    </div>
  )
}

export default VehicleCard