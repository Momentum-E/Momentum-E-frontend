import { Footer, Navbar } from '@/components/shared';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import {useRouter} from 'next/router';
import { Account, AccountContext } from '@/components/auth/account';
import Dashboard from './dashboard';

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()

  // need to remove navbar and footer conditonally
  return (
    <Account>
      <AccountContext.Consumer>
        {(accountContext) => {
          const { isAuthenticated } = accountContext;
          return (
            <>
              {/* {!isAuthenticated && <Navbar />} */}
              {
                !isAuthenticated ? 
                (
                  <>
                    <Navbar />
                    <Component {...pageProps} accountContext={accountContext} />    
                    <Footer/>
                  </>
                )
                :
                (
                  <>
                  {/* All the properties or attributes can be extracted from the "accountContext" */}
                  <Dashboard accountContext={accountContext}/>
                  {/* <Component {...pageProps} accountContext={accountContext} /> */}

                  {/* EXPLANATION ABOUT THE CODE 
                  In the above code, the isAuthenticated property is extracted 
                  from the accountContext object provided by the AccountContext.Consumer.
                  If the user is authenticated (isAuthenticated is true), the Navbar
                  component will be rendered; otherwise, it will be skipped.
                  Make sure you have the appropriate logic in your Account component
                  to update the isAuthenticated state based on user authentication status. */}
                  </>
                )
              }
              {/* {!isAuthenticated && <Footer />} */}
            </>
          );
        }}
      </AccountContext.Consumer>
  </Account>
  );
}
