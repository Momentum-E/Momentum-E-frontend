import React, { useContext, useEffect, useState } from 'react';
import { Footer, Navbar } from '@/components/shared';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Account, AccountContext } from '@/components/auth/account';

export default function App({ Component, pageProps }: AppProps) {

  // need to remove navbar and footer conditonally
  return (
    <Account>
      <AccountContext.Consumer>
        {(accountContext) => {
          return (
            <>
              {/* <Navbar setIsOpen={setIsOpen} isOpen={isOpen} isAuthenticated={accountContext.isAuthenticated}/> */}
              <Component {...pageProps} accountContext={accountContext}/>
              {/* <Footer isAuthenticated={accountContext.isAuthenticated}/> */}
            </>
          );
        }}
      </AccountContext.Consumer>
    </Account>
  );
}
