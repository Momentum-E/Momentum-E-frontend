import { Footer, Navbar } from '@/components/shared';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import {useRouter} from 'next/router';
import { Account, AccountContext } from '@/components/auth/account';

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()
  const currentPath = router.asPath
  return (
    <Account>
      <AccountContext.Consumer>
        {(accountContext) => (
          <>
            {currentPath !== '/dashboard' && <Navbar />}
            <Component {...pageProps} accountContext={accountContext}/>
            {currentPath !== '/dashboard' && <Footer />}
          </>
        )}
      </AccountContext.Consumer>
    </Account>
  );
}
