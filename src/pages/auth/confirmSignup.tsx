import { useEffect } from 'react';
import { useTheme } from 'next-themes';

import { ConfirmSignUp } from '@/components/auth/';

type ConfirmSignupProps = {
  username:string
}

const ConfirmSignup = ({ 
  username 
}: ConfirmSignupProps) => {

  const { setTheme } = useTheme()
  useEffect(()=>{
      setTheme('dark')
  })

  return (
    <ConfirmSignUp username={username} />
  );
};
export default ConfirmSignup;
