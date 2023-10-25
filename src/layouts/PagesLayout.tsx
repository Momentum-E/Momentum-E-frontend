import React from 'react'
import { Navbar,Footer } from '@/components/shared'

function PagesLayout({children}:any) {
  return (
    <>
      <Navbar/>
        {children}
      <Footer/>
    </>
  )
}

export default PagesLayout