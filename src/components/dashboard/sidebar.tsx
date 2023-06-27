import React, { useEffect } from 'react';
import { SidebarProps } from '@/utils/props/props';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

const vehicle_data = [
  { vehicle_no: 'vehicle1' },
  { vehicle_no: 'vehicle2' },
  { vehicle_no: 'vehicle3' },
  { vehicle_no: 'vehicle4' },
  { vehicle_no: 'vehicle5' },
  { vehicle_no: 'vehicle6' },
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
        onClick={() => setIsOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 
            ${isOpen ? ` block ` : ` hidden `}`}></div>
      <motion.div
        variants={sidebar_animation}
        animate={isOpen ? 'open' : 'close'}
        className="bg-white space-y-4 text-gray shadow-md z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden md:relative fixed">
        {/* logo */}
        <div className="flex gap-2.5 py-3 mx-3 mt-2 text-white-100 border-b border-white-100 items-center justify-center">
          <span className="text-xl whitespace-pre">Dashboard</span>
        </div>

        {/* adding vehicle button */}
        {isOpen ? (
          <div
            className="flex px-4 mx-3 p-2 text-white-100 bg-gray-700/20 rounded-lg items-center justify-center hover:bg-gray-700/40 cursor-pointer focus:bg-blue-200"
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
        ) : (
          <div className="flex mx-3 p-2 bg-blue-100 rounded-lg items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        )}

        {/* vehice items */}
        <span className="pl-3 text-white-100 inline-block mb-2">Vehicles</span>
        <div className="flex flex-col h-full space-y-2">
          <ul
            className="whitespace-pre px-2.5 flex flex-col gap-1 h-[70%] md:h-[68%]
                font-medium overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300">
            {vehicle_data.map((data) => (
              <li key={data.vehicle_no}>
                <Link
                  href={`/dashboard/${data.vehicle_no}`}
                  className="link hover:bg-gray-700/25 text-white-100">
                  {data.vehicle_no}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* shrink toggle */}
        <motion.div
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
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
