import React, { useEffect, useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Sidebar, DashboardNavbar } from '@/components/dashboard';

const DashboardComponent = () => {
  
    let isTab = useMediaQuery({ query: '(max-width:768px)' });
    const [isOpen, setIsOpen] = useState(isTab ? false : true);

    useEffect(() => {
      if (isTab) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    }, [isTab]);
  
    return (
      <div className="flex ">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isTab={isTab} />
        {/* main had a class max-w-5xl */}
        <main className="max-w-full flex-1 mx-auto h-screen overflow-hidden">
          <DashboardNavbar setIsOpen={setIsOpen} isOpen={isOpen} />
          {/*  Main Content */}
          <div className="p-4 max-h-full overflow-auto">
            <div className="p-4 border-2 border-white-100 border-dashed rounded-lg dark:border-gray-700">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center justify-center h-24 rounded bg-white-200/20 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                </div>
                <div className="flex items-center justify-center h-24 rounded bg-white-200/20 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                </div>
                <div className="flex items-center justify-center h-24 rounded bg-white-200/20 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                </div>
              </div>
              <div className="flex items-center justify-center h-48 mb-4 rounded bg-white-200/20 dark:bg-gray-800">
                <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center justify-center rounded bg-white-200/20 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                </div>
                <div className="flex items-center justify-center rounded bg-white-200/20 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                </div>
                <div className="flex items-center justify-center rounded bg-white-200/20 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                </div>
                <div className="flex items-center justify-center rounded bg-white-200/20 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                </div>
              </div>
              <div className="flex items-center justify-center h-48 mb-4 rounded bg-white-200/20 dark:bg-gray-800">
                <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center rounded bg-white-200/20 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                </div>
                <div className="flex items-center justify-center rounded bg-white-200/20 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                </div>
                <div className="flex items-center justify-center rounded bg-white-200/20 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                </div>
                <div className="flex items-center justify-center rounded bg-white-200/20 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
}

export default DashboardComponent