import { Icon } from './Icons';
import { business, navLinks } from '../data/site';

// Everything around the sections: curtain, progress line, header, phone menu, footer,
// the two fixed bars, the lightbox, the gallery cursor and the screen-reader announcer.
// The ids and classes here are the ones site/assets/js/site.js looks for. Do not rename them.

// Opening curtain. On screen only on the first visit of a browser session, when motion is allowed
// (the start-up guard in app/layout.jsx decides). site.js lifts it.
// .curtain__comb is now a plain line above the name. It keeps its old class name because site.js
// draws it by that name.
export function Curtain() {
  return (
    <div className="curtain" aria-hidden="true">
      <span className="curtain__comb" />
      <p className="curtain__mark">White Stone Salon</p>
    </div>
  );
}

// How far down the page the visitor is. Drawn by site.js.
export function Progress() {
  return (
    <div className="progress" aria-hidden="true">
      <span className="progress__bar" id="progress-bar" />
    </div>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap site-header__in">
        <a className="wordmark" href="#top">White Stone Salon</a>
        <nav className="site-nav" aria-label="Sections">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </nav>
        <a className="btn btn--book site-header__book" href="#book">Book</a>
        <button className="menu-btn" type="button" id="menu-open" aria-expanded="false" aria-controls="site-menu">
          <Icon name="menu" />
          <span>Menu</span>
        </button>
      </div>
    </header>
  );
}

// Full-screen menu for phones. Opened by #menu-open, closed by #menu-close, Escape or any link in it.
export function MobileMenu() {
  return (
    <div className="menu" id="site-menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>
      <div className="menu__top">
        <span className="wordmark" aria-hidden="true">White Stone Salon</span>
        <button className="menu-btn" type="button" id="menu-close">
          <Icon name="close" />
          <span>Close</span>
        </button>
      </div>
      <div className="menu__body">
        <nav aria-label="Sections">
          <ul className="menu__links">
            {navLinks.map((link) => (
              <li key={link.href}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="menu__foot">
          <a className="btn btn--book" href="#book">Book an appointment</a>
          <a className="menu__phone" href={business.phoneHref}>
            <Icon name="phone" />
            {business.phoneDisplay}
          </a>
          <address className="menu__address">{business.address}</address>
        </div>
      </div>
    </div>
  );
}

export function Footer({ year }) {
  return (
    <footer className="site-footer on-slate">
      <div className="wrap site-footer__in">
        <p className="wordmark">White Stone Salon</p>
        <nav className="site-footer__nav" aria-label="Footer">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}><a href={link.href}>{link.label}</a></li>
            ))}
            <li><a href="#book">Book</a></li>
          </ul>
        </nav>
        <div className="site-footer__contact">
          <address>{business.address}</address>
          <a href={business.phoneHref}>{business.phoneDisplay}</a>
        </div>
        <p className="site-footer__legal">
          <a href="/privacy">Privacy</a>
          <span>&copy; <span id="year">{year}</span> White Stone Salon</span>
        </p>
      </div>
      {/* The name once more, large. It rises letter by letter as the page ends. */}
      <p className="site-footer__big" aria-hidden="true">White Stone</p>
    </footer>
  );
}

// Selected-services bar. Shown by site.js while one or more services are selected.
export function PickedBar() {
  return (
    <aside className="picked on-slate" id="picked" aria-label="Selected services">
      <p className="picked__count" id="picked-count">No services selected</p>
      <a className="btn btn--book picked__go" href="#book">Book these</a>
    </aside>
  );
}

// Bottom action bar (phones and tablets). Hidden by site.js while the booking form is on screen
// or a field has focus. WhatsApp and Directions are unconfirmed until the owner checks them.
export function ActionBar() {
  return (
    <nav className="actionbar" id="actionbar" aria-label="Quick actions">
      <a className="actionbar__item actionbar__item--book" href="#book">
        <Icon name="calendar" />
        Book
      </a>
      <a className="actionbar__item" href={business.phoneHref}>
        <Icon name="phone" />
        Call
      </a>
      <a className="actionbar__item" data-todo="" href={business.whatsappHref} target="_blank" rel="noopener">
        <Icon name="chat" />
        WhatsApp<span className="visually-hidden"> (opens in a new tab)</span>
      </a>
      <a className="actionbar__item" data-todo="" href={business.mapsHref} target="_blank" rel="noopener">
        <Icon name="pin" />
        Directions<span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    </nav>
  );
}

// Gallery lightbox. site.js puts the photo inside #lightbox-frame.
export function Lightbox() {
  return (
    <dialog className="lightbox on-slate" id="lightbox" aria-label="Gallery photo">
      <div className="lightbox__in">
        <button className="icon-btn lightbox__close" type="button" id="lightbox-close" aria-label="Close photo">
          <Icon name="close" />
        </button>
        <figure className="photo lightbox__frame" id="lightbox-frame" data-slot="gallery" />
        <div className="lightbox__bar">
          <button className="icon-btn" type="button" id="lightbox-prev" aria-label="Previous photo">
            <Icon name="left" />
          </button>
          <p className="lightbox__count" id="lightbox-count" aria-live="polite" />
          <button className="icon-btn" type="button" id="lightbox-next" aria-label="Next photo">
            <Icon name="right" />
          </button>
        </div>
      </div>
    </dialog>
  );
}

// The "View" cursor that follows a mouse over gallery photos. Moved by site.js.
export function Cursor() {
  return (
    <div className="cursor" aria-hidden="true">
      <span className="cursor__in">View</span>
    </div>
  );
}

// Spoken updates for screen readers ("2 services selected").
export function LiveRegion() {
  return <p className="visually-hidden" id="live" role="status" />;
}
