import React, { useEffect } from 'react';
import { Hero } from '@/components/home';
import { PagesLayout } from '@/layouts';
import { useTheme } from 'next-themes';

function Landing() {
  
  const { theme, setTheme } = useTheme()
  useEffect(()=>{
      setTheme('dark')
  })
  
  return (
    <>
      <PagesLayout>
        <main className="px-4 lg:px-16">
          <Hero />
        </main>
      </PagesLayout>
    </>
  );
}

export default Landing;
