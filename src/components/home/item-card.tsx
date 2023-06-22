import { ItemCardProps } from '@/utils/props/props';
import React from 'react';

const ItemCard: React.FC<ItemCardProps> = ({ heading, description }) => {
  return (
    <div className="py-10 w-60">
      <div className="rounded-full h-40 w-40 px-5 shadow-me-green-100 shadow-md -rotate-45 m-auto text-center"></div>
      <div className="text-me-green-200 font-bold text-2xl py-5 flex justify-center">
        {heading}
      </div>
      <div className="text-white-200 font-bold text-xl flex justify-center text-center">
        {description}
      </div>
    </div>
  );
};

export default ItemCard;
