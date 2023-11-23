import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ConfirmSignUp } from '@/components/auth/';

type ConfirmSignupProps = {
  password?:string;
  username:string;
  // redirectUrl:string
}

const ConfirmSignup = ({ 
  password,
  username,
}: ConfirmSignupProps) => {
  const { setTheme } = useTheme()
  useEffect(()=>{
      setTheme('dark')
  })

  return (
    <ConfirmSignUp 
      password={password}
      username={username} 
      // redirectUrl={redirectUrl}
    />
  );
};
export default ConfirmSignup;
