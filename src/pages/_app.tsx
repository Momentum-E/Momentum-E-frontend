import React from 'react';
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { AccountProvider} from '@/context/AccountContext';
import { AppProvider } from '@/context/userContext';
import { SubscriptionProvider } from '@/context/subscriptionContext';
import {ErrorBoundary} from '@/components/auth'

// import { Loader } from '@/components/shared';

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    // <Suspense fallback={<Loader LoaderSize={24}/>}>
      <AccountProvider>
        <SubscriptionProvider>
          <AppProvider>
            <ThemeProvider attribute='class'>
                <ErrorBoundary>
                  <Component {...pageProps}/>
                </ErrorBoundary> 
            </ThemeProvider>
          </AppProvider> 
        </SubscriptionProvider>
      </AccountProvider>
    // </Suspense>
  );
}
