import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/logos/logo_white_nocap.png';

const Footer = () => {
  return (
    <div className="text-white-100">
      <div className="bg-gray-800 ">
        <div className="max-w-7xl m-auto text-gray-100 flex flex-wrap justify-between pt-5 border-t">

          <div className="p-5 w-48 ">
            <figure>
              <Image src={logo} height={120} width={120} alt="logo" />
            </figure>
          </div>

          <div className="flex flex-wrap justify-evenly text-sm">
            <div className="p-5 w-40 text-sm">
              <div className=" uppercase text-white-100 font-bold">
                Home
              </div>
              <a className="my-3 block text-white-200" href="#aboutus">
                <span className='hover:border-b hover:border-white-200'>
                  About Us
                </span>
              </a>
              <a className="my-3 block text-white-200" href="#services">
                <span className='hover:border-b hover:border-white-200'>
                  Services
                </span>
              </a>
              <a className="my-3 block text-white-200" href="#product">
                <span className='hover:border-b hover:border-white-200'>
                  Products
                </span>
              </a>
            </div>
            <div className="p-5 w-40 text-sm">
              <div className="uppercase text-white-100 font-bold text-sm">
                User
              </div>
              <Link className="my-3 block text-white-200" href="/auth/login">
                <span className='hover:border-b hover:border-white-200'>Sign in</span>
              </Link>
              <Link className="my-3 block text-white-200" href="/auth/register">
                <span className='hover:border-b hover:border-white-200'>New Account</span>
              </Link>
            </div>
            <div className="p-5 w-40 text-sm">
              <div className="uppercase text-white-100 font-bold">
                Product
              </div>
              <Link className="my-3 block text-white-200" href="/#">
                <span className='hover:border-b hover:border-white-200'>Our Services</span>
              </Link>
              <Link className="my-3 block text-white-200" href="/#">
                <span className='hover:border-b hover:border-white-200'>Analytics</span>
              </Link>
              <Link className="my-3 block text-white-200" href="pricing">
                <span className='hover:border-b hover:border-white-200'>Pricing</span>
              </Link>
            </div>
            <div className="p-5 w-48 text-sm text-white-200">
              <div className="uppercase text-white-100 font-bold">
                Contact us
              </div>
              91 Springboard, Bannerghatta Road, Bangalore
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 pt-2 ">
        <div
          className="flex pb-5 px-3 m-auto  text-gray-100 text-md flex-col
            md:flex-row max-w-6xl">
          <div className="mt-2">© Copyright 2023. All Rights Reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
