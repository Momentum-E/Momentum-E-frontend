import React from 'react';
import {
  // unrivaled_performance_img1,
  // unrivaled_performance_img2,
  battery_insight_1,
  battery_insight_2,
  battery_insight_3,
  momentum_e_1,
  momentum_e_2,
  momentum_e_3
} from '@/assets/images/';
import { Heading, ItemCard, GetInTouch } from './';

const Hero = () => {
  
  return (
    <div className=" text-white-100 pt-5 space-y-5">
      <div className="lg:h-full py-5">
        <div>
          <Heading
            primaryHeading="Electic Vehicle Battery"
            secondaryHeading="Insight"
            tertiaryHeading="Manage your EV with confidence"
          />
        </div>
        <div className="flex flex-wrap justify-evenly py-5 space-y-5 md:space-y-0">
          <ItemCard
            imageSource={battery_insight_1}
            imageAlt='EV Owner'
            imageClassname=''
            heading="EV Owner"
            description="Know your battery health and performance. Maximize resale value."
          />
          <ItemCard
            imageSource={battery_insight_2}
            imageAlt='EV Owner'
            imageClassname=''
            heading="EV Fleets"
            description="Optimize costs. Maximize uptime."
          />
          <ItemCard
            imageSource={battery_insight_3}
            imageAlt='EV Owner'
            imageClassname=''
            heading="EV Battery Recyclers"
            description="List on our platform. Increase battery supply."
          />
        </div>
      </div>

      {/* Future Use */} 
      {/* <div>
        <Heading
          primaryHeading="OUR UNRIVALED PERFORMANCE"
          tertiaryHeading="Know your battery better through our deep "
        />
        <div className="md:flex justify-evenly items-center pt-12">
          <figure className="md:w-1/2 w-full pb-10 md:pb-0">
            <Image
              src={unrivaled_performance_img1}
              alt="Working with us is a pleasure"
              className="max-w-full w-full h-full rounded-lg shadow-lg shadow-me-green-100"
            />
          </figure>
          <div className="md:w-1/2 w-full">
            <h1 className="md:px-24 text-center md:text-left w-full text-4xl font-bold">
              Working with us is a pleasure
            </h1>
            <p className="md:px-24 text-center md:text-left my-8 text-2xl text-white-200">
              Know your battery better through our deep analysis Know your
              battery better through our deep analysis Know your battery better
              through our deep analysis Know your battery better
            </p>
          </div>
        </div>
        <div className="md:flex flex-row-reverse justify-evenly items-center pt-12">
          <figure className="md:w-1/2 w-full pb-10 md:pb-0">
            <Image
              src={unrivaled_performance_img2}
              alt="Working with us is a pleasure"
              className="max-w-full w-full h-full rounded-lg shadow-lg shadow-me-green-100"
            />
          </figure>
          <div className="md:w-1/2 w-full">
            <h1 className="md:px-24 w-full md:text-right text-center text-4xl font-bold">
              A growing company
            </h1>
            <p className="md:px-24 md:text-right text-center my-8 text-2xl text-white-200">
              Know your battery better through our deep analysis Know your
              battery better through our deep analysis Know your battery better
              through our deep analysis Know your battery better
            </p>
          </div>
        </div>
      </div> */}

      <div className="pt-10">
        <div className="">
          <Heading
            primaryHeading="Vehicle Compatability"
            // tertiaryHeading="These are the car manufacturers we are compatible with"
          />
        </div>
        <h3 className=" text-center text-me-green-200 py-10 text-lg px-24">
          We are compatible with 25+ EV car manufacturers around the globe. To view the particular car model and their
          connection capabilities please {" "}
          <a className=' underline hover:no-underline text-me-green-100' target='_blank' href='https://developers.enode.com/api/capabilities/vehicles'>click here</a>
        </h3>
      </div>

      <div>
        <div className="pt-10">
          <Heading
            primaryHeading="MOMENTUM-E PLATFORM"
            tertiaryHeading="Know your battery better through our deep analysis"
          />
        </div>
        <div className="flex flex-wrap justify-evenly py-5 space-y-5 md:space-y-0">
          <ItemCard 
          imageSource={momentum_e_1}
          imageAlt=''
          imageClassname=''
          description="Actionable insights through proprietary machine learning algorithms." 
          />
          <ItemCard 
          imageSource={momentum_e_2}
          imageAlt=''
          imageClassname=''
          description="Know your battery’s state of charge, state of health and range obtained."
          />
          <ItemCard
          imageSource={momentum_e_3}
          imageAlt=''
          imageClassname=''
          description="Battery degradation is non-linear and varied, our platform helps you monitor and manage your battery performance and plan for end of life application."
          />
        </div>
      </div>
      <GetInTouch/>
    </div>
  );
};

export default Hero;
