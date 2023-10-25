import React from 'react'

type CardSideBlockProps = {
    CardHeading?:string
    CardData?:string | number | undefined | null
    CardUnit?:string 
}

const CardSideBlock:React.FC<CardSideBlockProps> = ({
    CardHeading,
    CardData,
    CardUnit
}) => {
  return (
    <div className="flex flex-col items-center text-xs p-1 rounded-lg border border-me-green-200 dark:border-white-100 bg-gradient-to-br from-white-100 to-me-green-200/40 dark:bg-dashboard-gradient">
        {CardHeading}
        <span className='text-me-green-100 dark:text-me-green-200'>
            {CardData+" "+CardUnit}
        </span>
    </div>
  )
}

export default CardSideBlock