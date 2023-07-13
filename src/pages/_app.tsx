import React from 'react';
import '@/styles/globals.css';
import { ThemeProvider, useTheme } from 'next-themes';
import type { AppProps } from 'next/app';
import { Account, AccountContext } from '@/context/account';

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <Account>
      <AccountContext.Consumer>
        {(accountContext) => {
          return (
            <ThemeProvider attribute='class'>
                {/* <Navbar setIsOpen={setIsOpen} isOpen={isOpen} isAuthenticated={accountContext.isAuthenticated}/> */}
                <Component {...pageProps} accountContext={accountContext}/>
                {/* <Footer isAuthenticated={accountContext.isAuthenticated}/> */}
            </ThemeProvider>
          );
        }}
      </AccountContext.Consumer>
    </Account>
  );
}
