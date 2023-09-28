import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from '@/context/userContext';

import { DashboardLayout } from '@/layouts';
import {
  ChangeUserPassword,
  DeleteVehicle,
  DeleteUser,
  UploadUserImage
} from '@/components/dashboard/profile-components/';
import GetUserDataComponent from '@/components/auth/GetUserDataComponent';
import { VendorCountProp } from '@/utils/props/props';

const Profile = () => {
  const {userId,name,userEmail,vehicleData,userImage} = useAppContext()
  const [VendorCounts, setVendorCounts] = useState<VendorCountProp[]>([])

  useEffect(() => {
    const counts:VendorCountProp[] = [];
    // Create an array of vendor counts
    vehicleData.forEach((vehicle) => {
      const vendor = vehicle.vendor;

      // Check if the vendor already exists in the array
      const existingVendor = counts.find((item) => item.vendor === vendor);

      if (existingVendor) {
        existingVendor.count++;
      } else {
        // Add a new entry for the vendor
        counts.push({ vendor, count: 1 });
      }
    });
    setVendorCounts(counts);
  }, [vehicleData])

  return (
    <DashboardLayout page={` profile / ${name}`}>
      <div className="max-h-full flex flex-col items-center max-w-xl w-full mx-auto space-y-10 px-2 md:px-0 pt-10 pb-20 overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300">
        <UploadUserImage
          userId={userId}
          userImage={userImage}
        />
        <DeleteVehicle userId={userId} VendorCounts={VendorCounts}/> 
        <div className=" border border-me-green-200 p-4 rounded-xl w-full">
          <GetUserDataComponent
            isRequired={false}
            heading={'Update Data'}
            page={'profile'}
            userId={userId}
            userEmail={userEmail}
            formDiv=''
            buttonName={'Update Details'}
          />
        </div>   
        <ChangeUserPassword userId={userId} />    
        <DeleteUser name={name} userId={userId}/>     
      </div>
      <ToastContainer />
    </DashboardLayout>
  );
};

export default Profile;
