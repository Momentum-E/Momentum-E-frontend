import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <div className="bg-gray-800">
        <div className="max-w-6xl m-auto text-gray-100 flex flex-wrap justify-center">
          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-200 font-medium">
              Home
            </div>
            <a className="my-3 block" href="#aboutus">
              About Us <span className="text-teal-600 text-xs p-1"></span>
            </a>
            <a className="my-3 block" href="#services">
              Services <span className="text-teal-600 text-xs p-1"></span>
            </a>
            <a className="my-3 block" href="#product">
              Products <span className="text-teal-600 text-xs p-1"></span>
            </a>
            {/* <a className="my-3 block" href="/#">Partners <span className="text-teal-600 text-xs p-1">New</span></a>  */}
          </div>
          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-100 font-medium">
              User
            </div>
            <Link className="my-3 block" href="login">
              Sign in <span className="text-teal-600 text-xs p-1"></span>
            </Link>
            <Link className="my-3 block" href="register">
              New Account <span className="text-teal-600 text-xs p-1"></span>
            </Link>
            {/* <a className="my-3 block" href="/#">Demo <span className="text-teal-600 text-xs p-1">New</span></a> */}
            {/* <a className="my-3 block" href="/#">Career <span className="text-teal-600 text-xs p-1">We're hiring</span></a> */}
            {/* <a className="my-3 block" href="/#">Surveys <span className="text-teal-600 text-xs p-1">New</span></a>  */}
          </div>
          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-100 font-medium">
              Product
            </div>
            <Link className="my-3 block" href="/#">
              Our Services<span className="text-teal-600 text-xs p-1"></span>
            </Link>
            {/* <a className="my-3 block" href="/#">Great Deals <span className="text-teal-600 text-xs p-1">New</span></a> */}
            <Link className="my-3 block" href="/#">
              Analytics <span className="text-teal-600 text-xs p-1"></span>
            </Link>
            <Link className="my-3 block" href="pricing">
              Pricing <span className="text-teal-600 text-xs p-1"></span>
            </Link>
            {/* <a className="my-3 block" href="/#">Mobile <span className="text-teal-600 text-xs p-1"></span></a>  */}
          </div>
          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-100 font-medium">
              Contact us
            </div>
            91 Springboard, Bannerghatta Road, Bangalore
            {/* <a className="my-3 block" href="/#">contact@momentech.com <span className="text-teal-600 text-xs p-1"></span></a>  */}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 pt-2 ">
        <div
          className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-100 text-sm flex-col
            md:flex-row max-w-6xl">
          <div className="mt-2">© Copyright 2023. All Rights Reserved.</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
