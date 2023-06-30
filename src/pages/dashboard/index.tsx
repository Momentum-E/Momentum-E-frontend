import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardComponent from '../../components/dashboard/DashboardComponent';

const Dashboard = ({accountContext}:any) => {
  return(
    <ProtectedRoute Component={DashboardComponent} accountContext={accountContext}/> 
  )
};

export default Dashboard;