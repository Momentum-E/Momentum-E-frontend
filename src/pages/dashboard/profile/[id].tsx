import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '@/context/userContext';
import { AccountContext } from '@/context/AccountContext';

import { DashboardLayout } from '@/layouts';
import {
  ChangeUserPassword,
  DeleteVehicle,
  DeleteUser,
  UploadUserImage,
  VehicleIntervention,
  SubscriptionDetails
} from '@/components/dashboard/profile-components/';
import GetUserDataComponent from '@/components/auth/GetUserDataComponent';
import { VendorCountProp } from '@/utils/props';

const Profile = () => {
  const {
    userId,
    name,
    // idToken,
    userEmail,
    vehicleData,
    userImage,
    isImageLoading,
    fetchUserImage,
    setUserImage
  } = useContext(AppContext)
  const {IdToken} = useContext(AccountContext)

  const [VendorCounts, setVendorCounts] = useState<VendorCountProp[]>([])

  // Getting the vehicle Data count
  useEffect(() => {
    const counts:VendorCountProp[] = [];
    // Create an array of vendor counts
    if(vehicleData){
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
    }
    setVendorCounts(counts);
  }, [vehicleData])

  return (
    <DashboardLayout page={` profile / ${name}`}>
      <div className="max-h-full overflow-auto">
        <div className="max-w-xl w-full mx-auto flex flex-col items-center space-y-10 px-2 md:px-0 pt-10 pb-20 scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300">
          <UploadUserImage
            idToken={IdToken}
            userId={userId}
            userImage={userImage}
            isImageLoading={isImageLoading}
            fetchUserImage={fetchUserImage}
            setUserImage={setUserImage}
          />
          <DeleteVehicle 
            idToken={IdToken}
            userId={userId} 
            VendorCounts={VendorCounts}
          /> 
          {/* <VehicleIntervention
            idToken={IdToken}
            vehicleData={vehicleData}
          /> */}
          <SubscriptionDetails idToken={IdToken} email={userEmail} />
          <div className=" border border-me-green-200 p-4 rounded-xl w-full">
            <GetUserDataComponent
              idToken={IdToken}
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
          <DeleteUser userId={userId}/>     
        </div>
      </div>
      <ToastContainer />
    </DashboardLayout>
  );
};

export default Profile;
