import React,{ useEffect, useRef } from 'react'
import { motion, useAnimation , useInView } from 'framer-motion';

interface RevealProps {
    children:JSX.Element;
    className?:string;
}

const Reveal = ({
    children,
    className
}:RevealProps) => {

    const ref = useRef(null)
    const inView = useInView(ref)
    const controls = useAnimation()

    useEffect(() => {
        if(inView){
            controls.start('visible')
        }
    },[inView])

    return (
    <>
        <motion.div 
            ref={ref}
            initial='hidden' 
            animate={controls}
            variants={{
                hidden:{ opacity:0, y:75 },
                visible:{ opacity:1, y:0 },
            }} 
            transition={{
                duration:0.5, 
                delay: 0.25
            }} 
            className={className}
        >
            {children}
        </motion.div>
    </>
  )
}

export default Reveal