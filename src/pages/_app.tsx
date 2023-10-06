import React from 'react';
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Account, AccountContext } from '@/context/account';
import { AppProvider } from '@/context/userContext';
import {ErrorBoundary} from '@/components/auth'

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <Account>
      <AccountContext.Consumer>
        {(accountContext) => {
          return (
            <ThemeProvider attribute='class'>
              <AppProvider>
                <ErrorBoundary>
                  <Component {...pageProps} />
                </ErrorBoundary> 
              </AppProvider> 
            </ThemeProvider>
          );
        }}
      </AccountContext.Consumer>
    </Account>
  );
}
