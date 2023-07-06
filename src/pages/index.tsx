import { Hero } from '@/components/home';
import { PagesLayout } from '@/layouts';

function Landing() {
  return (
    <>
      <PagesLayout>
        <main className="px-4 lg:px-16">
          <Hero />
        </main>
      </PagesLayout>
    </>
  );
}

export default Landing;
