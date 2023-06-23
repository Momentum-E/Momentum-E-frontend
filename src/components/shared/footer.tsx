import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/logos/logo_white_nocap.png';

const Footer = () => {
  return (
    <div className="text-white-100">
      <div className="bg-gray-800 ">
        <div className="max-w-7xl m-auto text-gray-100 flex flex-wrap justify-around pt-5 border-t">
          <div className="p-5 w-48 ">
            <figure>
              <Image src={logo} height={120} width={120} alt="logo" />
            </figure>
          </div>
          <div className="p-5 w-48">
            <div className=" uppercase text-gray-200 font-bold text-xl">
              Home
            </div>
            <a className="my-3 block" href="#aboutus">
              About Us
            </a>
            <a className="my-3 block" href="#services">
              Services
            </a>
            <a className="my-3 block" href="#product">
              Products
            </a>
          </div>
          <div className="p-5 w-48 ">
            <div className="text-xl uppercase text-gray-100 font-bold">
              User
            </div>
            <Link className="my-3 block" href="login">
              Sign in
            </Link>
            <Link className="my-3 block" href="register">
              New Account
            </Link>
          </div>
          <div className="p-5 w-48 ">
            <div className="text-xl uppercase text-gray-100 font-bold">
              Product
            </div>
            <Link className="my-3 block" href="/#">
              Our Services
            </Link>
            <Link className="my-3 block" href="/#">
              Analytics
            </Link>
            <Link className="my-3 block" href="pricing">
              Pricing
            </Link>
          </div>
          <div className="p-5 w-48 ">
            <div className="text-xl uppercase text-gray-100 font-bold">
              Contact us
            </div>
            91 Springboard, Bannerghatta Road, Bangalore
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
