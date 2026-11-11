import { Sprite } from '../components/Icons';
import { Curtain, Progress, Header, MobileMenu, Footer, PickedBar, ActionBar, Lightbox, Cursor, LiveRegion } from '../components/Chrome';
import { Hero, Band, Services, Styles, Offers, Combos, Artists, Gallery } from '../components/Sections';
import { Booking, Visit, Questions } from '../components/Booking';
import SiteScript from '../components/SiteScript';
import { jsonLd, has } from '../data/site';

// The home page: the whole site is this one page.
// It is drawn once on the server as plain HTML. <SiteScript /> then starts the behaviour and the motion.
//
// Offers, Artists and Questions are left out while they have nothing to show: that is the case in the
// presentation view until the salon sends real content (see  settings  and  has  in data/site.js).
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
        <Styles />
        {has.offers && <Offers />}
        {/* Without Offers, the pebble band above them, Combos take the comb rule as their divider. */}
        <Combos ruled={!has.offers} />
        {has.artists && <Artists />}
        <Gallery />
        <Booking />
        <Visit />
        {has.questions && <Questions />}
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
