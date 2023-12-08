import React, { useEffect } from 'react'
import { useAnimation, motion } from "framer-motion";

type companyStatsProps = {
  statValue:string,
  description:string
}

const companyStats:React.FC<companyStatsProps> = ({
  statValue,
  description
}) => {
    
  const item = {
    hidden: {
      opacity: 0, 
      left:0 
    },
    visible: {
      opacity: 1,
      left:"100%",
    }
  }

  return (
    <motion.div variants={item} transition={{duration:0.5,ease:"easeIn"}} className="flex flex-col items-center text-center justify-around max-w-sm p-4 space-y-5">
      <span className="text-me-green-200 text-7xl">
        {statValue}
      </span>
      <span className="text-white-100 text-sm font-light">
        {description}
      </span>
      <div className="w-full ease-in-out duration-200 rounded-2xl p-0.5 bg-gray-600"></div>
    </motion.div>
  )
}

export default companyStats