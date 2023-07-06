import React, { useEffect } from 'react';
import { SidebarProps } from '@/utils/props/props';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logos/logo_white_nocap.png'
import { useRouter } from 'next/router';
// import { dashboard_need_help } from '../../assets/images/dashboard-need-help.png';

const vehicle_data = [
  { vehicle_no: 'vehicle1' },
  { vehicle_no: 'vehicle2' },
  { vehicle_no: 'vehicle3' },
  { vehicle_no: 'vehicle4' },
  { vehicle_no: 'vehicle5' },
  { vehicle_no: 'vehicle6' },
  { vehicle_no: 'vehicle7' },
  { vehicle_no: 'vehicle8' },
];

const Sidebar: React.FC<SidebarProps> = ({ isTab, isOpen, setIsOpen }) => {
  const router = useRouter();
  const { pathname } = router;

  const sidebar_animation = isTab
    ? {
        open: {
          x: 0,
          width: '16rem',
          transition: {
            damping: 40,
          },
        },
        close: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: '16rem',
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
        close: {
          width: '4rem',
          transition: {
            damping: 40,
          },
        },
      };

  useEffect(() => {
    isTab && setIsOpen(false);
  }, [pathname]);

  function addVehicle() {
    
  }

  return (
    <div className="">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 
            ${isOpen ? ` block ` : ` hidden `}`}>
      </div>
      <motion.div
        variants={sidebar_animation}
        animate={isOpen ? 'open' : 'close'}
        className="bg-dashboard-gradient backdrop-blur-3xl rounded-lg p-2 space-y-4 text-gray shadow-md z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden md:relative fixed">
        {/* logo */}
        <div className="flex flex-col gap-2.5 py-3 text-white-100 items-center justify-center">
          {/* <span className="text-xl whitespace-pre">Dashboard</span> */}
          <Image
            className="block h-10 w-auto"
            src={logo}
            alt="Momentum-E"
          /> 
          <svg xmlns="http://www.w3.org/2000/svg" width="234" height="1" viewBox="0 0 234 1" fill="none">
            <path d="M0 0.5H233.25" stroke="url(#paint0_linear_172_27)"/>
            <defs>
              <linearGradient id="paint0_linear_172_27" x1="0" y1="0.5" x2="231" y2="0.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#E0E1E2" stop-opacity="0"/>
                <stop offset="0.5" stop-color="#E0E1E2"/>
                <stop offset="1" stop-color="#E0E1E2" stop-opacity="0.15625"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* adding vehicle button */}
        {/* {isOpen ? ( */}
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
        {/* // ) : (
        //   <div className="flex mx-3 p-2 bg-blue-100 rounded-lg items-center justify-center">
        //     <svg
        //       xmlns="http://www.w3.org/2000/svg"
        //       fill="none"
        //       viewBox="0 0 24 24"
        //       strokeWidth="1.5"
        //       stroke="currentColor"
        //       className="w-5 h-5">
        //       <path
        //         strokeLinecap="round"
        //         strokeLinejoin="round"
        //         d="M12 4.5v15m7.5-7.5h-15"
        //       />
        //     </svg>
        //   </div>
        // )} */}

        {/* vehice items */}
        <span className="text-white-100 inline-block ">Your Vehicles</span>
        <div className="flex flex-col items-center h-full space-y-2">
          <ul
            className="whitespace-pre flex flex-col text-left w-full gap-1 p-1 h-[46%] md:h-[46%]
                font-medium overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300">
            {vehicle_data.map((data) => (
              <li 
              key={data.vehicle_no}
              onClick={()=>setIsOpen(!isTab && true)}
              >
                <Link
                  href={`/dashboard/vehicles/${data.vehicle_no}`}
                  className="link hover:bg-gray-700/25 text-white-100">
                  {data.vehicle_no}
                </Link>
              </li>
            ))}
          </ul>

          <div 
          className="bg-dashboard-sidebar-image space-y-5 w-56 h-44 p-4 bg-cover bg-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
              <rect width="35" height="35" rx="12" fill="white"/>
              <path d="M17.5 7C20.2848 7 22.9555 8.10625 24.9246 10.0754C26.8938 12.0445 28 14.7152 28 17.5C28 20.2848 26.8938 22.9555 24.9246 24.9246C22.9555 26.8938 20.2848 28 17.5 28C14.7152 28 12.0445 26.8938 10.0754 24.9246C8.10625 22.9555 7 20.2848 7 17.5C7 14.7152 8.10625 12.0445 10.0754 10.0754C12.0445 8.10625 14.7152 7 17.5 7ZM18.0565 11.488C16.8355 11.488 15.8785 11.8345 15.169 12.5275C14.443 13.2205 14.0965 14.1775 14.0965 15.3985H15.9775C15.9775 14.7055 16.1095 14.161 16.39 13.7815C16.7035 13.3195 17.215 13.105 17.941 13.105C18.502 13.105 18.9475 13.2535 19.261 13.567C19.558 13.8805 19.723 14.3095 19.723 14.854C19.723 15.2665 19.5745 15.6625 19.2775 16.0255L19.0795 16.2565C18.007 17.2135 17.3635 17.9065 17.149 18.352C16.918 18.7975 16.819 19.342 16.819 19.969V20.2H18.7165V19.969C18.7165 19.573 18.799 19.2265 18.964 18.8965C19.1125 18.5995 19.327 18.319 19.624 18.0715C20.416 17.3785 20.8945 16.933 21.043 16.768C21.439 16.24 21.6535 15.5635 21.6535 14.7385C21.6535 13.732 21.3235 12.94 20.6635 12.3625C20.0035 11.7685 19.129 11.488 18.0565 11.488ZM17.7595 21.0085C17.4231 20.9994 17.0967 21.124 16.852 21.355C16.7312 21.4688 16.6362 21.6073 16.5736 21.761C16.511 21.9147 16.4821 22.0801 16.489 22.246C16.489 22.609 16.6045 22.906 16.852 23.137C17.0949 23.3728 17.421 23.5032 17.7595 23.5C18.1225 23.5 18.4195 23.3845 18.667 23.1535C18.7904 23.0373 18.888 22.8965 18.9533 22.7401C19.0187 22.5838 19.0505 22.4154 19.0465 22.246C19.0497 22.0806 19.0191 21.9163 18.9567 21.7631C18.8943 21.61 18.8013 21.4711 18.6835 21.355C18.4324 21.1236 18.1009 20.9992 17.7595 21.0085Z" fill="#C6DE41"/>
            </svg>

            <p className='flex flex-col text-white-100 text-base font-bold'>
              Need Help, contact us
              <span className=' font-medium'>
                <a href="mailto:info@momentum-e.com">info@momentum-e.com</a>
              </span>
            </p>
          </div>
        </div>


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
      </motion.div>
    </div>
  );
};

export default Sidebar;
