import React,{Suspense} from 'react';
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { AccountProvider} from '@/context/account';
import { AppProvider } from '@/context/userContext';
import {ErrorBoundary} from '@/components/auth'

// import { Loader } from '@/components/shared';

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    // <Suspense fallback={<Loader LoaderSize={24}/>}>
      <AccountProvider>
        <AppProvider>
          <ThemeProvider attribute='class'>
              <ErrorBoundary>
                <Component {...pageProps}/>
              </ErrorBoundary> 
          </ThemeProvider>
        </AppProvider> 
      </AccountProvider>
    // </Suspense>
  );
}
