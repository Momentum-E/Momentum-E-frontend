import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardComponent from '../../components/dashboard/DashboardComponent';

const Dashboard = () => {
  return(
    <ProtectedRoute Component={DashboardComponent}/> 
  )
};

export default Dashboard;
