import React,{ useRef, useEffect } from 'react';
import Link from 'next/link'
import { useAnimation, motion, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  battery_insight_1,
  battery_insight_2,
  battery_insight_3,
  momentum_e_1,
  momentum_e_2,
  momentum_e_3
} from '@/assets/images/';

import { Heading, ItemCard,CompanyStats,GetInTouch } from './';

const HomePage = () => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
        duration:2
      }
    }
  }
    
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition:{
        duration:3
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
  
  const section2 = useRef(null)
  const section3 = useRef(null)
  const section4 = useRef(null)

  return (
    // <div className=" text-white-100 pt-5 space-y-5">
    //   <div className="lg:h-full py-5">
    //     <div>
    //       <Heading
    //         primaryHeading="Electric Vehicle Battery"
    //         secondaryHeading="Insight"
    //         tertiaryHeading="Manage your EV with confidence"
    //       />
    //     </div>
    //     <div className="flex flex-wrap justify-evenly py-5 space-y-5 md:space-y-0">
    //       <ItemCard
    //         imageSource={battery_insight_1}
    //         imageAlt='EV Owner'
    //         imageClassname=''
    //         heading="EV Owner"
    //         description="Know your battery health and performance. Maximize resale value."
    //       />
    //       <ItemCard
    //         imageSource={battery_insight_2}
    //         imageAlt='EV Owner'
    //         imageClassname=''
    //         heading="EV Fleets"
    //         description="Optimize costs. Maximize uptime."
    //       />
    //       <ItemCard
    //         imageSource={battery_insight_3}
    //         imageAlt='EV Owner'
    //         imageClassname=''
    //         heading="EV Battery Recyclers"
    //         description="List on our platform. Increase battery supply."
    //       />
    //     </div>
    //   </div>

    //   <div className="pt-10">
    //     <div className="">
    //       <Heading
    //         primaryHeading="Vehicle Compatability"
    //       />
    //     </div>
    //     <h3 className=" text-center text-me-green-200 py-10 text-lg px-24">
    //       We are compatible with 25+ EV car manufacturers around the globe. To view the particular car model and their
    //       connection capabilities please {" "}
    //       <a className=' underline hover:no-underline text-me-green-100' target='_blank' href='https://developers.enode.com/api/capabilities/vehicles'>click here</a>
    //     </h3>
    //   </div>

    //   <div>
    //     <div className="pt-10">
    //       <Heading
    //         primaryHeading="MOMENTUM-E PLATFORM"
    //         tertiaryHeading="Know your battery better through our deep analysis"
    //       />
    //     </div>
    //     <div className="flex flex-wrap justify-evenly py-5 space-y-5 md:space-y-0">
    //       <ItemCard 
    //       imageSource={momentum_e_1}
    //       imageAlt=''
    //       imageClassname=''
    //       description="Actionable insights through proprietary machine learning algorithms." 
    //       />
    //       <ItemCard 
    //       imageSource={momentum_e_2}
    //       imageAlt=''
    //       imageClassname=''
    //       description="Know your battery’s state of charge, state of health and range obtained."
    //       />
    //       <ItemCard
    //       imageSource={momentum_e_3}
    //       imageAlt=''
    //       imageClassname=''
    //       description="Battery degradation is non-linear and varied, our platform helps you monitor and manage your battery performance and plan for end of life application."
    //       />
    //     </div>
    //   </div>
    //   <GetInTouch/>

    //   {/* Future Use */} 
    //   {/* <div>
    //     <Heading
    //       primaryHeading="OUR UNRIVALED PERFORMANCE"
    //       tertiaryHeading="Know your battery better through our deep "
    //     />
    //     <div className="md:flex justify-evenly items-center pt-12">
    //       <figure className="md:w-1/2 w-full pb-10 md:pb-0">
    //         <Image
    //           src={unrivaled_performance_img1}
    //           alt="Working with us is a pleasure"
    //           className="max-w-full w-full h-full rounded-lg shadow-lg shadow-me-green-100"
    //         /> 
    //       </figure>
    //       <div className="md:w-1/2 w-full">
    //         <h1 className="md:px-24 text-center md:text-left w-full text-4xl font-bold">
    //           Working with us is a pleasure
    //         </h1>
    //         <p className="md:px-24 text-center md:text-left my-8 text-2xl text-white-200">
    //           Know your battery better through our deep analysis Know your
    //           battery better through our deep analysis Know your battery better
    //           through our deep analysis Know your battery better
    //         </p>
    //       </div>
    //     </div>
    //     <div className="md:flex flex-row-reverse justify-evenly items-center pt-12">
    //       <figure className="md:w-1/2 w-full pb-10 md:pb-0">
    //         <Image
    //           src={unrivaled_performance_img2}
    //           alt="Working with us is a pleasure"
    //           className="max-w-full w-full h-full rounded-lg shadow-lg shadow-me-green-100"
    //         />
    //       </figure>
    //       <div className="md:w-1/2 w-full">
    //         <h1 className="md:px-24 w-full md:text-right text-center text-4xl font-bold">
    //           A growing company
    //         </h1>
    //         <p className="md:px-24 md:text-right text-center my-8 text-2xl text-white-200">
    //           Know your battery better through our deep analysis Know your
    //           battery better through our deep analysis Know your battery better
    //           through our deep analysis Know your battery better
    //         </p>
    //       </div>
    //     </div>
    //   </div> */}
    // </div>
    <main className=" text-white-100 mx-auto sm:px-6 md:px-16 lg:px-20">
      {/* Section 1 into */}
      {/* bg-background-lines-dots bg-cover bg-center bg-no-repeat */}
      <section className="flex flex-col md:h-[110vh] md:space-y-7">
        {/* <div className="h-screen relative w-full overflow-hidden flex flex-col items-center justify-center pointer-events-none"> */}
          {/* <div className="absolute inset-0 w-full h-full  pointer-events-none" /> */}
          {/* <BoxContainer/> */}
          <Heading/>  
        {/* </div> */}
      </section>

      <section className="">  
        <div className="flex bg-black sm:flex-col md:flex-row w-full border border-gray-700">
        {/* bg-background-flowing-cyber-dots bg-cover bg-no-repeat */}
          <div className="flex flex-col sm:py-10 md:pt-0 md:w-[40%] space-y-4 px-10 items-center justify-center text-left border-r border-gray-700">
            <h2 className='text-me-green-200 font-medium text-3xl'>
              Manage your EV with confidence.
            </h2>
            <span className='text-white-100 text-lg leading-relaxed'>
              I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.
            </span>
          </div>

          <div className="flex items-center justify-center md:-translate-y-16 pb-10 md:mx-auto md:my-auto">
            <motion.div 
              ref={ref}
              variants={container}
              initial="hidden"
              animate={controls}
              className="sm:flex sm:flex-col sm:space-y-3 md:grid md:grid-cols-2 md:gap-7"
            >
              <motion.div ref={ref} animate={controls} variants={item} className="space-y-7">
                {/* Grid 1 */}  
                <ItemCard
                  imageSource={battery_insight_3}
                  imageAlt='EV Fleets'
                  imageClassname='h-11 w-11'
                  heading="EV Fleets"
                  description="Optimize costs. Increase battery life. Reduce fleet downtime."
                />

                {/* Grid 2 */}
                <ItemCard
                  imageSource={battery_insight_1}
                  imageAlt='Plan for Second life'
                  imageClassname='h-11 w-11'
                  heading="EV Owner"
                  description="Understand degradation history to plan for second life of batteries"
                />
                <div className="hidden md:block md:p-5"></div>
              </motion.div>

              <motion.div ref={ref} animate={controls} variants={item} className="space-y-7">
                <div className="hidden md:block md:p-5"></div>

                {/* Grid 3 */}
                <ItemCard
                  imageSource={momentum_e_2}
                  imageAlt='Battery Recyclers'
                  imageClassname='h-11 w-11'
                  heading="Battery Recyclers"
                  description="Partner with us to widen your supply chain."
                />

                {/* Grid 4 */}
                <ItemCard
                  imageSource={momentum_e_1}
                  imageAlt='Company Digital'
                  imageClassname='h-11 w-11'
                  heading="Company Digital"
                  description="Pure-play software platform. No aftermarket hardware needed."
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* bg-background-shallow-depth-field bg-cover bg-top bg-no-repeat */}
      <section className="relative py-44">
        <div className="absolute -translate-y-16 rounded-full w-full h-full bg-me-green-100/40 blur-[120px]"></div>
        <div className="flex flex-col items-center space-y-10 sm:px-6 lg:px-16">
          <h2 className="text-white-100 font-base text-3xl text-center">
            We take pride in our numbers
          </h2>
          <div className="w-full flex sm:flex-col md:flex-row  justify-between"> 
            <CompanyStats statValue='15' description='Years of Experience'/>
            <CompanyStats statValue='10K' description='Business Partner'/>
            <CompanyStats statValue='25M' description='Products Installed'/>
            <CompanyStats statValue='22' description='Countries World Wide'/>
            <CompanyStats statValue='5' description='Industry Awards'/>
          </div>
        </div>
      </section>

      <section className="pb-16">  
        {/* Set a background for this div */}
        <div className="flex h-screen md:flex-row-reverse sm:flex-col-reverse w-full border border-gray-700">
          <div className="flex flex-col bg-black h-full sm:py-10 md:pt-0 md:w-[40%] p-10 items-center justify-center text-left border-l border-gray-700">
            <span className="text-white-100 text-lg font-light leading-relaxed mb-6">
              I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.
            </span>
            <Link className='mr-auto border-2 border-me-green-200 hover:border-black hover:bg-me-green-200  rounded-xl p-2 font-normal text-base text-me-green-200 hover:text-black' href={'/pricing'}>
              Get Started
            </Link>
          </div>

          {/* bg-background-globe bg-cover bg-center bg-no-repeat  */}
          <div className="flex items-center justify-center h-full bg-background-globe bg-cover bg-center bg-no-repeat md:p-14 md:pt-0 md:mx-auto md:my-auto">
            <h2 className='text-white-100 font-medium text-3xl text-center'>
              Are You Ready to Accelerate Your Business?
            </h2>
          </div>
        </div>
      </section>
      
      <GetInTouch/>
    </main>
  );
};

export default HomePage;
