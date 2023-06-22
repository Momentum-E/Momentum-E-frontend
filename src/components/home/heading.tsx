import { DottedIcon } from '@/utils/icons';
import { HeadingProps } from '@/utils/props/props';
import React from 'react';

const Heading: React.FC<HeadingProps> = ({
  primaryHeading,
  secondaryHeading,
  tertiaryHeading,
}) => {
  return (
    <>
      <div className="flex justify-center items-center py-5">
        <figure className="-translate-y-10 px-6">
          <DottedIcon />
        </figure>
        <div className="text-5xl font-bold text-center">
          <h1>{primaryHeading}</h1>
          <h1>{secondaryHeading}</h1>
        </div>
        <figure className="translate-y-7 px-6">
          <DottedIcon />
        </figure>
      </div>
      <h1 className="flex text-center justify-center items-center text-lg text-me-green-100">
        {tertiaryHeading}
      </h1>
    </>
  );
};

export default Heading;
