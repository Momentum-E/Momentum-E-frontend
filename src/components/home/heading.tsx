import React,{ useEffect } from 'react';
import { useAnimation, motion, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import { BoxContainer } from './';
import { HeadingProps } from '@/utils/props';

const Heading: React.FC<HeadingProps> = ({
  primaryHeading,
  secondaryHeading,
  tertiaryHeading,
}) => {

  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    // <>
    //   <div className="flex justify-center items-center md:py-5">
    //     <figure className="-translate-y-10 md:px-6 px-0">
    //       <DottedIcon />
    //     </figure>
    //     <div className="md:text-5xl text-2xl font-bold text-center">
    //       <h1>{primaryHeading}</h1>
    //       <h1>{secondaryHeading}</h1>
    //     </div>
    //     <figure className="translate-y-9 md:first-letter:px-6">
    //       <DottedIcon />
    //     </figure>
    //   </div>
    //   <h1 className="flex text-center justify-center items-center text-lg pt-5 text-me-green-100">
    //     {tertiaryHeading}
    //   </h1>
    // </>
    <div className="relative sm:w-full sm:px-6 sm:py-20 md:pt-20 lg:px-16 lg:w-3/4 ">
      <div className="absolute translate-y-12 translate-x-10 rounded-full w-full h-full bg-me-green-100/40 blur-[120px]"></div>
      
      <motion.h1 
        variants={{
          visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { 
              duration: 2
            } 
          },
          hidden: { 
            opacity: 0, 
            scale: 0 
          }
        }}
        ref={ref}
        animate={controls}
        initial="hidden"
        className="sm:text-5xl sm:font-medium md:text-left md:text-[5rem] md:font-medium md:leading-tight xl:text-8xl">  
        <span className="text-me-green-200 cursor-normal"> AI-led battery health </span> 
        <span className="">and EV fleet management</span>
      </motion.h1>

      <motion.h2
        variants={{
          visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { 
              duration: 2
            } 
          },
          hidden: { 
            opacity: 0, 
            scale: 0 
          }
        }}
        ref={ref}
        animate={controls}
        initial="hidden"
        className='w-[80%] sm:pt-8 font-normal sm:text-xl md:text-left md:ml-0 md:text-3xl '>
        Get a full understanding of <span className="hover:text-me-green-200 cursor-default border-b-2 border-me-green-200">battery degradation</span>,{" "}
        <span className="hover:text-me-green-200 cursor-default border-b-2 border-me-green-200">performance</span> and {" "} 
        <span className="hover:text-me-green-200 cursor-default border-b-2 border-me-green-200">real range</span>.
      </motion.h2>
    </div>
  );
};

export default Heading;
