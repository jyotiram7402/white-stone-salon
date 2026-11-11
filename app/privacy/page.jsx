import { business } from '../../data/site';

export const metadata = {
  title: 'Privacy | White Stone Salon',
  description: 'What the White Stone Salon website does, and does not do, with your information.'
};

// The privacy note. State only what is true of the site as it is built.
export default function PrivacyPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <div className="wrap site-header__in">
          <a className="wordmark" href="/">White Stone Salon</a>
          <a className="btn btn--line" href="/">Home</a>
        </div>
      </header>

      <main id="main" className="page">
        <div className="wrap">
          <div className="prose">
            <h1>Privacy</h1>
            <p className="lead">This website keeps nothing about you. This page says exactly what happens when you use it.</p>

            <h2>No accounts, nothing stored</h2>
            <p>The site has no database and no accounts, and it stores nothing about the people who visit it. It is hosted by Vercel. Like any web host, Vercel sees the technical details of each request, such as an IP address, in order to deliver the page.</p>

            <h2>The booking form</h2>
            <p>What you type into the booking form is kept as a draft in your own browser, in the tab you are using, so that it is still there if the page reloads. It stays in your browser until you send it through WhatsApp.</p>
            <p>Pressing &ldquo;Send request on WhatsApp&rdquo; opens WhatsApp with your request written out. It is sent only when you press send there. From then on it is a WhatsApp message between you and the salon.</p>
            <p>The same browser tab also remembers that the opening animation has played, so that it does not play twice.</p>

            <h2>Fonts, scripts and photos</h2>
            <p>The fonts and the scripts that animate the page are served from this site itself. The sample photos come from Unsplash; the site&rsquo;s host fetches them and passes them on, so your browser does not contact Unsplash.</p>

            <h2>No cookies, no analytics</h2>
            <p>The site sets no cookies and uses no analytics.</p>

            <h2>Questions</h2>
            <p>Call the salon on <a href={business.phoneHref}>{business.phoneDisplay}</a>.</p>

            <a className="btn btn--line" href="/">Back to the home page</a>
          </div>
        </div>
      </main>

      <footer className="site-footer site-footer--plain on-slate">
        <div className="wrap site-footer__in">
          <p className="wordmark">White Stone Salon</p>
          <div className="site-footer__contact">
            <address>{business.address}</address>
            <a href={business.phoneHref}>{business.phoneDisplay}</a>
          </div>
          <p className="site-footer__legal">
            <a href="/">Home</a>
            <span>&copy; {new Date().getFullYear()} White Stone Salon</span>
          </p>
        </div>
      </footer>
    </>
  );
}
