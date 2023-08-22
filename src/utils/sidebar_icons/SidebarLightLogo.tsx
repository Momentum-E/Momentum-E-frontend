import React from 'react'
import Image from 'next/image';
import logo_white_nocap from '@/assets/logos/logo_white_nocap.png'

const SidebarLightLogo = () => {
  return (
    <Image 
      className="block h-11 w-auto" 
      // width={579}
      // height={164}
      priority
      src={logo_white_nocap} 
      alt="Momentum-E" 
    />
  )
}

export default SidebarLightLogo