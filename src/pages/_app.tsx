import { Footer, Navbar } from '@/components/shared';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="text-white-200">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}
