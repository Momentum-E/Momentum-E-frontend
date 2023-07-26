import React from 'react';
import '@/styles/globals.css';
import { ThemeProvider, useTheme } from 'next-themes';
import type { AppProps } from 'next/app';
import { Account, AccountContext } from '@/context/account';
import { AppProvider } from '@/context/userContext';

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <Account>
      <AccountContext.Consumer>
        {(accountContext) => {
          return (
            <ThemeProvider attribute='class'>
              <AppProvider>
                <Component {...pageProps} accountContext={accountContext}/>
              </AppProvider> 
            </ThemeProvider>
          );
        }}
      </AccountContext.Consumer>
    </Account>
  );
}
