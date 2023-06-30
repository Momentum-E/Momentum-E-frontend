import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardComponent from '../../components/dashboard/DashboardComponent';

const Dashboard = ({accountContext}:any) => {

  // just like getting sessions we can get user data and pass it as props to the dashboardComponent
  // const {getSession} =  accountContext;
  return(
    <DashboardComponent/>
  )
};

export default ProtectedRoute(Dashboard);
