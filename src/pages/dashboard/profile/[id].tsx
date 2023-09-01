import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from '@/context/userContext';

import { DashboardLayout } from '@/layouts';
import {
  ChangeUserPassword,
  DeleteVehicle,
  DeleteUser
} from '@/components/dashboard/profile-components/';
import GetUserDataComponent from '@/components/auth/GetUserDataComponent';

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   address: {
//     country: string;
//     city: string;
//     state: string;
//   };
//   owner_type: string;
//   company_name: string;
// }

const Profile = () => {
  const {userId,name,userEmail,VendorCounts} = useAppContext()

  return (
    <DashboardLayout page={` profile / ${name}`}>
      <div className="max-h-full max-w-xl w-full mx-auto space-y-20 pt-10 pb-20 overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300">
        <div className=" border border-me-green-200 p-4 rounded-xl">
          <GetUserDataComponent
            heading={'Update Data'}
            page={'profile'}
            userId={userId}
            userEmail={userEmail}
            formDiv=''
            buttonName={'Update Details'}
          />
        </div>
        <ChangeUserPassword userId={userId} />
        <DeleteVehicle userId={userId} VendorCounts={VendorCounts}/>        
        <DeleteUser name={name} userId={userId}/>     
      </div>
      <ToastContainer />
    </DashboardLayout>
  );
};

export default Profile;
