import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/logos/logo_white_nocap.png';

type FooterProps = {
  isAuthenticated?: boolean
}

const Footer = ({
  isAuthenticated
}:FooterProps ) => {
  return !isAuthenticated ? (
    <div className="text-white-100 mt-10 sm:px-6 lg:px-16">
      <div className="max-w-7xl m-auto text-gray-100 flex flex-wrap justify-between py-16 border-t">
        <div className="p-5 w-48 ">
          <figure>
            <Image src={logo} height={120} width={120} alt="logo" />
          </figure>
        </div>
        <div className="flex flex-wrap justify-evenly text-sm mx-4">
          {/* <div className="p-5 w-40 text-sm">
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
          </div> */}
          <div className="p-5 w-40 ">
            <div className="uppercase text-white-100 font-bold">
              User
            </div>
            <Link className="my-3 block text-white-200" href="/auth/login">
              <span className='hover:border-b hover:border-white-200'>Log In</span>
            </Link>
            <Link className="my-3 block text-white-200" href="/auth/register">
              <span className='hover:border-b hover:border-white-200'>New Account</span>
            </Link>
          </div>
          <div className="p-5 w-40 ">
            <div className="uppercase text-white-100 font-bold">
              Links
            </div>
            <Link className="my-3 block text-white-200" href="/">
              <span className='hover:border-b hover:border-white-200'>Home</span>
            </Link>
            <Link className="my-3 block text-white-200" href="/pricing">
              <span className='hover:border-b hover:border-white-200'>Pricing</span>
            </Link>
            {/* <Link className="my-3 block text-white-200" href="/pricing">
              <span className='hover:border-b hover:border-white-200'>Pricing</span>
            </Link> */}
          </div>
          <div className="p-5 w-40 text-white-200">
            <div className="uppercase mb-3 text-white-100 font-bold">
              Contact us
            </div>
            91 Springboard, Bannerghatta Road, Bangalore
          </div>
        </div>
      </div>
      <div
        className="flex pb-5 px-5 m-auto text-gray-100 text-md flex-col
          md:flex-row max-w-7xl">
        <div className="mt-2">© Copyright Momentech 2023. All Rights Reserved.</div>
      </div>
    </div>
  ):
  null
};

export default Footer;
