import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
// import DashboardComponent from '../../components/dashboard/DashboardComponent';
import { DashboardLayout } from '@/components/dashboard';

const Dashboard = ({ accountContext }: any) => {
  return (
    <ProtectedRoute
      Component={DashboardLayout}
      accountContext={accountContext}
    />
  );
};

export default Dashboard;
