import React, { useEffect } from 'react';
import { SidebarProps } from '@/utils/props/props';
import Image from 'next/image';
import logo from '@/assets/logos/logo_white_nocap.png'
import { useRouter } from 'next/router';
import YourVehicles from './sidebar-components/YourVehicles';
// import { motion } from 'framer-motion';

// We are going to use vehicle Id
const vehicle_data = [
  { vehicle_no: 'vehicle1' },
  { vehicle_no: 'vehicle2' },
  { vehicle_no: 'vehicle3' },
  { vehicle_no: 'vehicle4' },
  { vehicle_no: 'vehicle5' },
  { vehicle_no: 'vehicle6' },
  { vehicle_no: 'vehicle7' },
  { vehicle_no: 'vehicle8' },
  { vehicle_no: 'vehicle9' },
  { vehicle_no: 'vehicle10' },
  { vehicle_no: 'vehicle11' },
];

const Sidebar: React.FC<SidebarProps> = ({ isTab, isOpen, setIsOpen }) => {
  const router = useRouter();
  const { pathname } = router;

  // const sidebar_animation = isTab
  //   ? {
  //       open: {
  //         x: 0,
  //         width: '16rem',
  //         transition: {
  //           damping: 40,
  //         },
  //       },
  //       close: {
  //         x: -250,
  //         width: 0,
  //         transition: {
  //           damping: 40,
  //           delay: 0.15,
  //         },
  //       },
  //     }
  //   : {
  //       open: {
  //         width: '16rem',
  //         transition: {
  //           damping: 40,
  //           delay: 0.15,
  //         },
  //       },
  //       close: {
  //         width: '4rem',
  //         transition: {
  //           damping: 40,
  //         },
  //       },
  //     };

  useEffect(() => {
    isTab && setIsOpen(false);
  }, [pathname]);

  function addVehicle() {
    
  }

  return (
    <div className="">
      <div
        onClick={() => setIsOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 
            ${isOpen ? ` block ` : ` hidden `}`}>
      </div>
      {/* <motion.div */}
      <div
        // variants={sidebar_animation}
        // animate={isOpen ? 'open' : 'close'}
        className={`${(isOpen) ? ` `: `transform -translate-x-full `} ease-in-out duration-200 bg-dashboard-gradient inset-0 backdrop-blur-3xl rounded-lg p-2 space-y-4 text-gray shadow-md z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden md:relative fixed`}>
        <div className="flex flex-col gap-2.5 py-3 text-white-100 items-center justify-center">
          {/* logo */}
          <Image
            className="block h-10 w-auto"
            src={logo}
            alt="Momentum-E"
          /> 
          <svg xmlns="http://www.w3.org/2000/svg" width="234" height="1" viewBox="0 0 234 1" fill="none">
            <path d="M0 0.5H233.25" stroke="url(#paint0_linear_172_27)"/>
            <defs>
              <linearGradient id="paint0_linear_172_27" x1="0" y1="0.5" x2="231" y2="0.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E0E1E2" stopOpacity="0"/>
                <stop offset="0.5" stopColor="#E0E1E2"/>
                <stop offset="1" stopColor="#E0E1E2" stopOpacity="0.15625"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div
          className="flex px-4 p-2 text-white-100 bg-gray-700/20 rounded-lg items-center justify-center hover:bg-gray-700/40 cursor-pointer focus:bg-blue-200"
          onClick={() => addVehicle()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 mr-3">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Vehicle
        </div>

        <YourVehicles vehicle_data={vehicle_data} setIsOpen={setIsOpen} isTab={isTab}/>


        {/* shrink toggle */}
        {/* <motion.div
          className={`${
            isOpen ? `rotate-0 ` : `rotate-180 `
          } border-2 rounded-lg border-white-200 p-1 absolute w-fit h-fit z-50 right-3.5 bottom-5 cursor-pointer md:block hidden`}
          onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="text-white-200 w-5 h-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </motion.div> */}
      {/* </motion.div> */}
      </div>
    </div>
  );
};

export default Sidebar;
