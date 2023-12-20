import React from 'react';
// import Link from 'next/link'

import { Reveal, Heading, AboutProduct ,GetInTouch } from './';

const HomePage = () => {
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
    <main className=" text-white-100 mx-auto sm:px-4 md:px-14 lg:px-20 overflow-x-clip">
      {/* Section 1 into */}
      {/* bg-background-lines-dots bg-cover bg-center bg-no-repeat */}
      <section id='Heading' className="flex flex-col md:h-[110vh] md:space-y-7">
        {/* <div className="h-screen relative w-full overflow-hidden flex flex-col items-center justify-center pointer-events-none"> */}
          {/* <div className="absolute inset-0 w-full h-full  pointer-events-none" /> */}
          {/* <BoxContainer/> */}
        {/* </div> */}
        <Reveal>
          <Heading/>  
        </Reveal>
      </section>

      <Reveal>
        <section id='About_Us' className="">  
          <div className="flex bg-black sm:flex-col md:flex-row w-full border border-gray-700">
            {/* bg-background-flowing-cyber-dots bg-cover bg-no-repeat */}
            <div className="flex flex-col sm:py-8 md:pt-0 md:w-[40%] space-y-4 px-10 items-center justify-center text-left border-r border-gray-700">
              <h2 className='text-me-green-200 font-medium text-3xl'>
                Manage your EV with confidence
              </h2>
              {/* <span className='text-white-100 text-lg leading-relaxed'>
                I am a paragraph. Click here to add your own text and edit me. It is easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.
              </span> */}
            </div>

            <div className="flex items-center justify-center md:-translate-y-12 pb-10 md:mx-auto md:my-auto">
              <AboutProduct/>
            </div>
          </div>
        </section>
      </Reveal>
      
      {/* bg-background-shallow-depth-field bg-cover bg-top bg-no-repeat */}
      {/* <div className="absolute -translate-y-16 rounded-full w-full h-full bg-me-green-100/30 blur-[120px]"></div> */}
      {/* <Reveal>
        <section id='Our_Numbers' className="relative py-44">
          <div className="flex flex-col items-center space-y-10 sm:px-6 lg:px-16">
            <CompanyStats/>
          </div>
        </section>
      </Reveal> */}

      {/* <Reveal>
        <section id='Get_Started' className="pb-16 pt-20">  
          <div className="flex h-screen md:flex-row-reverse sm:flex-col-reverse w-full border border-gray-700">
            <div className="flex flex-col bg-black h-full sm:py-10 md:pt-0 md:w-[40%] p-10 items-center justify-center text-left border-l border-gray-700">
              <Link className='mr-auto border-2 border-me-green-200 hover:border-black hover:bg-me-green-200  rounded-xl p-2.5 font-normal text-base text-me-green-200 hover:text-black' href={'/pricing'}>
                Get Started
              </Link>
            </div>

            <div className="flex items-center justify-center h-full bg-background-globe bg-cover bg-center bg-no-repeat md:p-14 md:pt-0 md:mx-auto md:my-auto">
              <h2 className='text-white-100 font-medium text-3xl text-center'>
                Are You Ready to Accelerate Your Business?
              </h2>
            </div>
          </div>
        </section>
      </Reveal> */}
      
      <Reveal>
        <GetInTouch/>
      </Reveal>
    </main>
  );
};

export default HomePage;
