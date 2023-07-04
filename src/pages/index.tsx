import { Hero } from '@/components/home';
import {Footer, Navbar} from '@/components/shared';

function Landing({isAuthenticated}:any) {
  return (
    <>
      <Navbar/>
      <main className="px-4 lg:px-16">
        <Hero />
      </main>
      <Footer/>
    </>
  );
}

export default Landing;
