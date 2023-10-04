import { DottedIcon } from '@/utils/icons';
import { HeadingProps } from '@/utils/props';
import React from 'react';

const Heading: React.FC<HeadingProps> = ({
  primaryHeading,
  secondaryHeading,
  tertiaryHeading,
}) => {
  return (
    <>
      <div className="flex justify-center items-center md:py-5">
        <figure className="-translate-y-10 md:px-6 px-0">
          <DottedIcon />
        </figure>
        <div className="md:text-5xl text-2xl font-bold text-center">
          <h1>{primaryHeading}</h1>
          <h1>{secondaryHeading}</h1>
        </div>
        <figure className="translate-y-9 md:first-letter:px-6">
          <DottedIcon />
        </figure>
      </div>
      <h1 className="flex text-center justify-center items-center text-lg pt-5 text-me-green-100">
        {tertiaryHeading}
      </h1>
    </>
  );
};

export default Heading;
