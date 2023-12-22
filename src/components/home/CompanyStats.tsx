import React, { useEffect, useRef } from 'react'
import CompanyStatsCard from './CompanyStatsCard'
import { useAnimation, motion, useInView } from "framer-motion";
// import { useInView } from "react-intersection-observer";

const CompanyStats = () => {
    const container = {
        hidden: { opacity: 0},
        visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
            duration:0.5
            }
        }
    }
    
    const ref = useRef(null);
    const controls = useAnimation();
    const inView = useInView(ref, {once:false});
  
    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);
    
    return (
    <>
        <h2 className="text-white-100 font-base text-3xl text-center">
            We take pride in our numbers
        </h2>
        <motion.div ref={ref} animate={controls} initial='hidden' variants={container} className="w-full flex sm:flex-col lg:flex-row mx-auto justify-between"> 
            <CompanyStatsCard statValue='15' description='Years of Experience'/>
            <CompanyStatsCard statValue='10K' description='Business Partner'/>
            <CompanyStatsCard statValue='25M' description='Products Installed'/>
            <CompanyStatsCard statValue='22' description='Countries World Wide'/>
            <CompanyStatsCard statValue='5' description='Industry Awards'/>
        </motion.div>
    </>
  )
}

export default CompanyStats