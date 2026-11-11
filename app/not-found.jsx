import { business } from '../data/site';

// Shown for any address that does not exist. It sits inside app/layout.jsx, so it has the site's fonts and styles.
export default function NotFound() {
  return (
    <>
      <header className="site-header">
        <div className="wrap site-header__in">
          <a className="wordmark" href="/">White Stone Salon</a>
        </div>
      </header>

      <main id="main" className="page">
        <div className="wrap">
          <div className="prose">
            <h1>This page is not here</h1>
            <p className="lead">The address may be mistyped, or the page may have been moved. Everything about the salon is on the home page.</p>
            <a className="btn btn--solid" href="/">Go to the home page</a>
            <a className="btn btn--line" href={business.phoneHref}>{'Call ' + business.phoneDisplay}</a>
          </div>
        </div>
      </main>
    </>
  );
}
