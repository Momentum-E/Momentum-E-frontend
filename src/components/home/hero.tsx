import React from 'react';
import {
  unrivaled_performance_img1,
  unrivaled_performance_img2,
} from '@/assets/images/';
import { Heading, ItemCard } from './';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className=" text-white-100 py-5">
      <div className="h-screen py-10">
        <div>
          <Heading
            primaryHeading="Know your battery better"
            secondaryHeading="through our deep analysis"
            tertiaryHeading="Know your battery better through our deep analysis Know your battery
        better through"
          />
        </div>
        <div className="flex justify-evenly py-10">
          <ItemCard
            heading="Individual Owner"
            description="Know your battery better through our Know your battery better through our deep analysis"
          />
          <ItemCard
            heading="Individual Owner"
            description="Know your battery better through our Know your battery better through our deep analysis"
          />
          <ItemCard
            heading="Individual Owner"
            description="Know your battery better through our Know your battery better through our deep analysis"
          />
        </div>
      </div>
      <div>
        <Heading
          primaryHeading="OUR UNRIVALED PERFORMANCE"
          tertiaryHeading="Know your battery better through our deep "
        />
        <div className="flex justify-evenly items-center pt-12">
          <figure className="w-1/2">
            <Image
              src={unrivaled_performance_img1}
              alt="Working with us is a pleasure"
              className="max-w-full w-full h-full rounded-lg shadow-lg shadow-me-green-100"
            />
          </figure>
          <div className="w-1/2">
            <h1 className="px-24 text-left w-full text-4xl font-bold">
              Working with us is a pleasure
            </h1>
            <p className="px-24 text-left my-8 text-2xl text-white-200">
              Know your battery better through our deep analysis Know your
              battery better through our deep analysis Know your battery better
              through our deep analysis Know your battery better
            </p>
          </div>
        </div>
        <div className="flex justify-evenly items-center pt-12">
          <div className="w-1/2">
            <h1 className="px-24 w-full text-right text-4xl font-bold">
              A growing company
            </h1>
            <p className="px-24 text-right my-8 text-2xl text-white-200">
              Know your battery better through our deep analysis Know your
              battery better through our deep analysis Know your battery better
              through our deep analysis Know your battery better
            </p>
          </div>

          <figure className="w-1/2">
            <Image
              src={unrivaled_performance_img2}
              alt="Working with us is a pleasure"
              className="max-w-full w-full h-full rounded-lg shadow-lg shadow-me-green-100"
            />
          </figure>
        </div>
      </div>
      <div>
        <div className="pt-24">
          <Heading
            primaryHeading="BUILD SOMETHING"
            tertiaryHeading="Know your battery better through our Know your battery better through our deep analysis"
          />
        </div>
        <div className="flex justify-evenly py-10">
          <ItemCard description="Know your battery better through our Know your battery better through our deep analysis" />
          <ItemCard description="Know your battery better through our Know your battery better through our deep analysis" />
          <ItemCard description="Know your battery better through our Know your battery better through our deep analysis" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
