import React, { useEffect } from 'react'
import { ForgotPassword } from '@/components/auth'
import { useTheme } from 'next-themes'
import { PagesLayout } from '@/layouts';

function ForgotPasswordPage() {
  
  const { setTheme } = useTheme()
  useEffect(()=>{
      setTheme('dark')
  })
  
  return (
    <PagesLayout>
      <ForgotPassword/>
    </PagesLayout>
  )
}

export default ForgotPasswordPage