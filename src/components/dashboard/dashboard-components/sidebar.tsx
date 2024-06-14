import React, { useState,useEffect,useContext } from 'react';
import { SidebarProps } from '@/utils/props';
import axios from 'axios';
import { AppContext } from '@/context/userContext';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import YourVehicles from './sidebar-components/YourVehicles';
import { Modal } from '@/components/shared'
const DarkLine = dynamic (() => import('@/utils/sidebar_icons/DarkLine'), {
  ssr: false,
});
const LightLine = dynamic (() => import('@/utils/sidebar_icons/LightLine'), {
  ssr: false,
});
const SidebarLightLogo = dynamic (()=>import('@/utils/sidebar_icons/SidebarLightLogo'),{
  ssr:false,
})
const SidebarDarkLogo = dynamic (()=>import('@/utils/sidebar_icons/SidebarDarkLogo'),{
  ssr:false,
})

const Sidebar:React.FC<SidebarProps> = ({
  NumberVehiclePaid,
  idToken,
  id,
  isLoading,
  vehicleData, 
  isTab, 
  isOpen, 
  setIsOpen,
  page,
  theme,
 }) => {
  const { UpdateIdToken } = useContext(AppContext);
  const router = useRouter();
  const { pathname } = router;
  const [errorNumber, setErrorNumber] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    isTab && setIsOpen(false)
  }, [pathname]);

  const addVehicle = async (getPage:string) => {
    if(NumberVehiclePaid && vehicleData && vehicleData.length < NumberVehiclePaid)
    {
      let newPage = getPage.split(" ").join('')
      if(getPage.split("/")[0].trim() === "profile"){
        newPage = getPage.split(" ").join('')
      }
      else if( page === ""||undefined ){
        newPage = 'redirect/dashboard'
      }
      else if(getPage.split("/")[0].trim() === "vehicles"){
        newPage = `vehicles/${JSON.parse(page.toString().split("/")[1]).id}}`
      }
      else{
        console.log("No conditon matched"+getPage)
      }
    
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/vehicles/users/${id}/link/${newPage}/`,{
        headers: {
          authorization:`Bearer ${idToken}`
        }
      })
      .then((res) => {
        console.log(res.data);
        
        if(res.data.title === 'Unauthorized' || res.data.title === 'Connections limit reached' || res.data.detail === 'Unauthorized for resource' || res.data.message === 'Unauthorized for resource' || res.data.error === 'https://docs.enode.io/problems/unauthorized'){
          alert("There is some issue from our side. If the error persist contact us at info@momentum-e.com.")
        }
        else{
          const linkUrl = res.data.linkUrl;
          router.push(linkUrl);
        }
      })
      .catch(async (err) => {
        setErrorNumber(errorNumber+1)
        await UpdateIdToken()
        console.error(err)
        if(errorNumber>=10){
          window.location.reload()
        }
        else{
          addVehicle(page)
        }
      });
    }
    else{
      setModalOpen(true)
    }
  };

  return (
    <>
      <div
        className={`${isOpen ? `` : `hidden`}` + " fixed inset-0 max-h-screen z-[999] md:hidden bg-black/50"}
        onClick={() => setIsOpen(false)}
      />      
      <div
        className={`${
          isOpen ? ` ` : `transform -translate-x-full `
        } ease-in-out duration-200 bg-gradient-to-br from-white-100 to-me-green-200/50 dark:bg-dashboard-gradient inset-0 backdrop-blur-3xl rounded-lg p-2 space-y-4 text-gray shadow-md z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden md:relative fixed`}>
        {/* logo */}
        <div className="flex flex-col gap-2.5 py-[5px] text-white-100 items-center justify-center">
          {
            theme === 'dark'?
            ( 
              <SidebarLightLogo/>
            ):
            (
              <SidebarDarkLogo/>
            )
          }
          {
            theme === 'dark' ?
            (
              <LightLine/>
            ):
            (
              <DarkLine/>
            )
          }
        </div>

        <div
          className="flex px-4 p-2 dark:text-white-100 bg-me-green-200 dark:bg-gray-700/50 rounded-lg items-center justify-center hover:bg-me-green-200/90 dark:hover:bg-gray-700/40 cursor-pointer focus:bg-blue-200"
          onClick={()=>addVehicle(page)}>
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

        <YourVehicles
        isLoading={isLoading}
        vehicleData={vehicleData}
        setIsOpen={setIsOpen}
        isTab={isTab}
        page={
          page.toString().split("/")[0].trim() === "profile" || page === ""
          ?
          page
          :
          `vehicles / ${JSON.parse(page.toString().split("/")[1]).vin}`
          }
        />
      </div>
      <Modal 
      isOpen={modalOpen} 
      setIsOpen={setModalOpen} 
      title='Vehicle Limit Reached' 
      content={`More vehicles cannot be added as the user has paid for ${NumberVehiclePaid} ${NumberVehiclePaid === 1 ? 'vehicle' : 'vehicles'}. Please pay for the extra vehicles.`} 
      buttonClass='px-2 border text-black bg-me-green-200 hover:bg-me-green-100 p-1 rounded-lg' 
      modalFunction={() => {
        router.replace(`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_DASHBOARD}`)
        console.log('Redirect to stripe dashboard.')
      }}/>
    </>
  );
};

export default Sidebar;