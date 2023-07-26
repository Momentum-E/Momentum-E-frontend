import React, { useEffect } from 'react'
import { ForgotPassword } from '@/components/auth'
import { useTheme } from 'next-themes'

function ForgotPasswordPage() {
  
  const { theme, setTheme } = useTheme()
  useEffect(()=>{
      setTheme('dark')
  })
  
  return (
    <ForgotPassword/>
  )
}

export default ForgotPasswordPage