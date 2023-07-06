import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/layouts';

const Dashboard = ({ accountContext }: any) => {
  return (
    <ProtectedRoute
      Component={DashboardLayout}
      accountContext={accountContext}
    />
  );
};

export default Dashboard;
