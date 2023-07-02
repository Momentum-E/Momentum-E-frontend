import { Footer, Navbar } from '@/components/shared';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Account, AccountContext } from '@/components/auth/account';
import Dashboard from './dashboard';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // need to remove navbar and footer conditonally
  return (
    <Account>
      <AccountContext.Consumer>
        {(accountContext) => {
          const { isAuthenticated } = accountContext;
          return (
            <>
              <Navbar />
              <Component {...pageProps} accountContext={accountContext} />
              <Footer />
            </>
          );
        }}
      </AccountContext.Consumer>
    </Account>
  );
}
