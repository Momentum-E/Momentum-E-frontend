import React, { useEffect } from 'react';
import { HomePage } from '@/components/home';
import { PagesLayout } from '@/layouts';
import { useTheme } from 'next-themes';

function Landing() {
  
  const { setTheme } = useTheme()
  useEffect(()=>{
      setTheme('dark')
  })
  
  return (
    <PagesLayout>
      <HomePage />
    </PagesLayout>
  );
}

export default Landing;
