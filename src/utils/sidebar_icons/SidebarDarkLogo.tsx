import React from 'react'
import Image from 'next/image';
import logo_black_nocap from '@/assets/logos/logo_black_nocap.png';

const SidebarDarkLogo = () => {
  return (
    <Image 
    className="block h-11 w-auto" 
    // width={3048} 
    // height={2024}
    src={logo_black_nocap} 
    alt="Momentum-E" 
    />
  )
}

export default SidebarDarkLogo