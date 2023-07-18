import React,{useEffect, useState} from 'react'
import { DashboardLayout } from '@/layouts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const DashboardSettings = ({
}) => {
  
  const router = useRouter();
  const { id } = router.query;

  return (
    <DashboardLayout page={`settings / ${id}`}>
        
    </DashboardLayout>    
  )
}

export default DashboardSettings