import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/layouts';

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout page="">
        <div className='w-full h-screen flex items-center justify-center'> 
          Please click on a vehicle 
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
