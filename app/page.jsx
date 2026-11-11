import { Sprite } from '../components/Icons';
import { Curtain, Progress, Header, MobileMenu, Footer, PickedBar, ActionBar, Lightbox, Cursor, LiveRegion } from '../components/Chrome';
import { Hero, Band, Services, Offers, Combos, Styles, Artists, Gallery, Reviews } from '../components/Sections';
import { Booking, Visit, Questions } from '../components/Booking';
import SiteScript from '../components/SiteScript';
import { jsonLd } from '../data/site';

// The home page: the whole site is this one page.
// It is drawn once on the server as plain HTML. <SiteScript /> then starts the behaviour and the motion.
export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <Curtain />
      <Progress />
      <Sprite />

      <Header />
      <MobileMenu />

      <main id="main">
        <Hero />
        <Band />
        <Services />
        <Offers />
        <Combos />
        <Styles />
        <Artists />
        <Gallery />
        <Reviews />
        <Booking />
        <Visit />
        <Questions />
      </main>

      <Footer year={new Date().getFullYear()} />

      <PickedBar />
      <ActionBar />
      <Lightbox />
      <Cursor />
      <LiveRegion />

      {/* For search engines: name, address and telephone only. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SiteScript />
    </>
  );
}
