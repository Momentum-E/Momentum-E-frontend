import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';

type ItemCardProps = {
  heading?: string;
  description?: string|React.JSX.Element;
  imageSource?:any,
  imageAlt?:any,
  imageClassname?:string,
};

const ItemCard = ({ 
  heading, 
  description,
  imageSource,
  imageAlt,
  imageClassname,
}:ItemCardProps) => {
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }


  return (
    <motion.div variants={item} className="ease-in-out duration-200 shadow-2xl shadow-blue-500/20 backdrop-blur-sm group space-y-6 p-5 w-60 border-none rounded-lg bg-neutral-800">  
      {/* <div className="rounded-full flex justify-center items-center w-32 h-32 px-5 text-center border-2 border-gray-700/70 md:border-me-green-200 md:shadow-me-green-100 md:shadow-md -rotate-45 m-auto"> */}
        <Image
          src={imageSource}
          alt={imageAlt}
          className={`${imageClassname}`}
        />
      {/* </div> */}
      <div className="flex text-white-100 font-semibold text-2xl text-left">
        {heading}
      </div>
      <div className="text-white-200 font-normal text-lg flex justify-center text-left">
        {description}
      </div>
      <div className="ease-in-out duration-200 rounded-2xl p-0.5 bg-gray-600 "></div>
    </motion.div>
  );
};

export default ItemCard;