import { ItemCardProps } from '@/utils/props';
import React from 'react';
import Image from 'next/image';

const ItemCard: React.FC<ItemCardProps> = ({ 
  heading, 
  description,
  imageSource,
  imageAlt,
  imageClassname,
}) => {
  return (
    <div className=" p-5 w-60 md:border-none border border-2 rounded-lg border-me-green-200">  
      <div className="rounded-full flex justify-center items-center w-32 h-32 px-5 text-center border-2 border-gray-700/70 md:border-me-green-200 md:shadow-me-green-100 md:shadow-md -rotate-45 m-auto">
        <Image
          src={imageSource}
          alt={imageAlt}
          className={`rotate-45 ${imageClassname}`}
        />
      </div>
      <div className="text-me-green-200 font-bold text-2xl text-center py-2 flex justify-center">
        {heading}
      </div>
      <div className="text-white-200 font-normal text-xl flex justify-center text-center">
        {description}
      </div>
    </div>
  );
};

export default ItemCard;
