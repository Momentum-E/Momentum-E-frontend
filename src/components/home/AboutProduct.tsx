import React, { useEffect } from 'react'
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
    battery_insight_1,
    battery_insight_3,
    momentum_e_1,
    momentum_e_2,
  } from '@/assets/images/';
  import { ItemCard } from './';

const AboutProduct = () => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
    
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div 
      className="sm:flex sm:flex-col sm:space-y-3 md:grid md:grid-cols-2 md:gap-7"
    >
      <motion.div 
        ref={ref}
        variants={container}
        initial="hidden"
        animate={controls} 
        className="space-y-7"
      >
      {/* Grid 1 */}  
        <ItemCard
          // ref={ref}
          // controls={controls}
          imageSource={battery_insight_3}
          imageAlt='EV Fleets'
          imageClassname='h-11 w-11'
          heading="EV Fleets"
          description="Optimize costs. Increase battery life. Reduce fleet downtime."
        />

        {/* Grid 2 */}
        <ItemCard
          // ref={ref}
          // controls={controls}
          imageSource={battery_insight_1}
          imageAlt='Plan for Second life'
          imageClassname='h-11 w-11'
          heading="EV Owner"
          description="Understand degradation history to plan for second life of batteries"
        />
        <div className="hidden md:block md:p-5"></div>
      </motion.div>

      <motion.div 
        ref={ref}
        variants={container}
        initial="hidden"
        animate={controls}
        className="space-y-7"
      >
        <div className="hidden md:block md:p-5"></div>

        {/* Grid 3 */}
        <ItemCard
          // ref={ref}
          // controls={controls}
          imageSource={momentum_e_2}
          imageAlt='Battery Recyclers'
          imageClassname='h-11 w-11'
          heading="Battery Recyclers"
          description="Partner with us to widen your supply chain."
        />

        {/* Grid 4 */}
        <ItemCard
          // ref={ref}
          // controls={controls}
          imageSource={momentum_e_1}
          imageAlt='Digital Company'
          imageClassname='h-11 w-11'
          heading="Company Digital"
          description="Pure-play software platform. No aftermarket hardware needed."
        />
      </motion.div>
    </motion.div>
  )
}

export default AboutProduct;