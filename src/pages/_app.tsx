import { Footer, Navbar } from '@/components/shared';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import {useRouter} from 'next/router';
import { Account, AccountContext } from '@/components/auth/account';

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()
  const currentPath = router.asPath

  // need to remove navbar and footer conditonally
  return (
    <Account>
    <AccountContext.Consumer>
      {(accountContext) => {
        const { isAuthenticated } = accountContext;
        return (
          <>
            {!isAuthenticated && <Navbar />} {/* Render Navbar only if user is authenticated */}
            <Component {...pageProps} accountContext={accountContext} />
            {!isAuthenticated && <Footer />}
          </>
        );
      }}
    </AccountContext.Consumer>
  </Account>
  );
}
