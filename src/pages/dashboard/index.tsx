import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/layouts';

const Dashboard = ({ accountContext }: any) => {
  return (
    <ProtectedRoute>
      <DashboardLayout/>
    </ProtectedRoute>
  );
};

export default Dashboard;
