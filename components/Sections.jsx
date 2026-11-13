import { Icon } from './Icons';
import Photo from './Photo';
import { business, serviceColumns, prices, bandLines, offers, combos, artists, shown, has } from '../data/site';
import { hero, gallery, styles, artistPhotos } from '../data/photos';

// The sections from the hero down to the gallery, in the order of the page.
// Content comes from data/site.js and data/photos.js.
// Motion is asked for with attributes that site/assets/js/site.js reads:
//   data-intro   the opening sequence in the hero
//   data-slide   a line that slides as the page scrolls
//   data-rv      a reveal as the element scrolls into view: "lines", "up", "kids" or "photo"
// Anything unconfirmed carries data-todo. In the working view it shows with a red dashed outline.
// shown(list) leaves out the entries still marked  todo: true  in the presentation view (data/site.js).

// Unconfirmed things carry data-todo. Spread this on the element:  {...todoFlag(item.todo)}
function todoFlag(isTodo) {
  return isTodo ? { 'data-todo': '' } : {};
}

// The two faces of an "Add" toggle. Both sit in one grid cell, so the button never changes width.
function AddFaces({ off, on }) {
  return (
    <>
      <span className="add__face add__face--off" aria-hidden="true"><Icon name="plus" />{off}</span>
      <span className="add__face add__face--on" aria-hidden="true"><Icon name="check" />{on}</span>
    </>
  );
}

/* ---------- 2. Hero ---------- */
// "Fountain Road," is kept on one line by a span, and the comma stays inside it. Do not use a
// non-breaking space instead: the library that splits the headline into lines for the opening sequence
// treats that space as an ordinary one, so the headline would break one way while it rises and jump
// to another when the sequence ends. (Tried in a browser, 11 November 2026.)
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__in">
        <div className="hero__text">
          <h1 id="hero-title" data-intro="lines">Hair, beard and skin care on <span className="nowrap">Fountain Road,</span> Kharadi</h1>
          <p className="hero__line lead" data-intro="fade">A unisex salon opposite Cheryl Society. <span className="hero__hours" data-todo="">{business.hours}</span></p>
          <div className="hero__actions" data-intro="fade">
            <a className="btn btn--book" href="#book">Book an appointment</a>
            <a className="btn btn--line" href={business.phoneHref}>
              <Icon name="phone" />
              Call<span className="wide-only"> {business.phoneDisplay}</span>
            </a>
          </div>
        </div>
        <Photo
          photo={hero}
          className="hero__photo"
          sizes="(min-width: 64em) 42vw, (min-width: 48em) 46vw, 100vw"
          eager
          todo={Boolean(hero.isSample)}
          imgProps={{ 'data-intro': 'settle' }}
        />
      </div>
    </section>
  );
}

/* ---------- 3. Service band (repeats the menu, so hidden from screen readers) ---------- */
// Two lines that slide opposite ways as the page scrolls. data-slide is how far, in percent of the
// line's own width; a negative number slides to the right.
export function Band() {
  return (
    <div className="band" aria-hidden="true">
      <p className="band__line" data-slide="22">
        {bandLines[0].map((name) => <span key={name}>{name}</span>)}
      </p>
      <div className="band__back">
        <p className="band__line band__line--outline" data-slide="-22">
          {bandLines[1].map((name) => <span key={name}>{name}</span>)}
        </p>
      </div>
    </div>
  );
}

/* ---------- 4. Services menu ---------- */
// A row: name, price slot (empty until single-service prices are confirmed), Add toggle.
// A hairline divides one row from the next. There is no leader line between the name and the button.
export function Services() {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="section__head">
          <h2 data-rv="lines" id="services-title">Services</h2>
          <p className="lead" data-rv="up">Add what you want, then book them together.</p>
        </div>

        <div className="menu-cols">
          {serviceColumns.map((column, index) => (
            <div className="menu-col" key={index}>
              {column.map((group) => (
                <details className="group" open key={group.name}>
                  <summary className="group__sum">
                    <h3 className="group__name">{group.name}</h3>
                    <Icon name="down" className="group__chev" />
                  </summary>
                  <ul className="rows" data-panel="" data-rv="kids">
                    {group.services.map((name) => (
                      <li className="row" key={name}>
                        <span className="row__name">{name}</span>
                        <span className="row__price" data-price="">{prices[name] || null}</span>
                        <button className="add" type="button" aria-pressed="false" data-add={name}>
                          <AddFaces off="Add" on="Added" />
                          <span className="visually-hidden">{'Add ' + name + ' to booking'}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          ))}
        </div>

        {/* The salon has sent package prices only. When every single price is in, delete the first sentence
            and its call link. */}
        <p className="services__note" data-rv="up">
          <span data-todo="">Prices for single services are on request:</span>{' '}
          <a href={business.phoneHref}>{'call ' + business.phoneDisplay}</a>.
          {has.offers && <>{' '}<a href="#offers">See the offers on men&rsquo;s packages</a>.</>}
        </p>
      </div>
    </section>
  );
}

/* ---------- 5. Styles: example cuts for women, men and children ---------- */
// The photos are samples until the salon sends its own. The children's group is unconfirmed.
export function Styles() {
  return (
    <section className="section section--ruled styles" id="styles" aria-labelledby="styles-title">
      <div className="wrap">
        <div className="section__head">
          <h2 data-rv="lines" id="styles-title">Styles</h2>
          <p className="lead" data-rv="up">Point at one you like, or bring a photo of your own.</p>
        </div>

        {styles.map((group) => {
          return (
            <div className="styles__group" key={group.key} {...todoFlag(group.todo)}>
              <h3 className="styles__name">{group.title}</h3>
              <ul className="styles__grid" data-rv="kids">
                {group.looks.map((item) => (
                  <li className="look" key={item.slot}>
                    <Photo photo={item} sizes="(min-width: 48em) 20vw, 46vw" reveal />
                    <p className="look__caption">{item.caption}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <p className="styles__note" data-rv="up"><span data-todo="">Sample photos for now. The salon&rsquo;s own work will replace them.</span></p>
      </div>
    </section>
  );
}

/* ---------- 6. Combos ---------- */
// data-combo lists the services a combo adds, separated by | and spelled exactly as in the services menu.
// The last cell of the list invites people to build their own, so the two-column grid on wide screens
// never ends with an empty corner.
export function Combos() {
  return (
    <section className="section section--ruled combos" id="combos" aria-labelledby="combos-title">
      <div className="wrap">
        <div className="section__head">
          <h2 data-rv="lines" id="combos-title">Combos</h2>
          <p className="lead" data-rv="up">Shortcuts for services that go together. One tap adds them all to your booking.</p>
        </div>
        <ul className="combos__list" data-rv="kids">
          {combos.map((combo) => (
            <li className="combo" key={combo.id} {...todoFlag(combo.todo)}>
              <h3 className="combo__name" id={'combo-' + combo.id + '-title'}>{combo.name}</h3>
              <ul className="combo__items">
                {combo.services.map((name) => <li className="chip" key={name}>{name}</li>)}
              </ul>
              <button
                className="add add--wide"
                type="button"
                aria-pressed="false"
                data-combo={combo.services.join('|')}
                aria-labelledby={'combo-' + combo.id + '-act combo-' + combo.id + '-title'}
              >
                <AddFaces off="Add combo to booking" on="Combo added" />
                <span className="visually-hidden" id={'combo-' + combo.id + '-act'}>Add combo to booking:</span>
              </button>
            </li>
          ))}
          <li className="combo combo--own">
            <p>Or build your own: <a href="#services">add any services from the menu</a>.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ---------- 7. Offers: the salon's men's packages ---------- */
// A price list. Each row: the package, what is in it, the regular price struck through, the offer price
// on a flag, and an Add toggle. From 1024px the rows run down two columns; --rows tells the stylesheet
// how many rows a column holds.
//
// site.js names an offer in the booking request by the text of .offer__title, so the hidden price in
// that heading is what makes the request read "Offer: Package 7 (Rs 1,149)". Keep it there.
export function Offers() {
  const list = shown(offers);
  return (
    <section className="section offers" id="offers" aria-labelledby="offers-title">
      <div className="wrap">
        <div className="section__head">
          <h2 data-rv="lines" id="offers-title">Offers on men&rsquo;s packages</h2>
          <p className="lead" data-rv="up">Add a package to your booking, or ask for it by its number at the salon.</p>
        </div>
        <ul className="offers__list" data-rv="kids" style={{ '--rows': Math.ceil(list.length / 2) }}>
          {list.map((offer) => (
            <li className="offer" key={offer.id} {...todoFlag(offer.todo)}>
              <h3 className="offer__title" id={'offer-' + offer.id + '-title'}>
                {offer.title}<span className="visually-hidden">{' (' + offer.now + ')'}</span>
              </h3>
              <p className="offer__what">{offer.items.join(', ')}</p>
              <p className="offer__price">
                <span className="visually-hidden">Regular price </span>
                <s className="offer__was">{offer.was}</s>
                <span className="visually-hidden">, offer price </span>
                <span className="offer__now">{offer.now}</span>
              </p>
              <button
                className="add"
                type="button"
                aria-pressed="false"
                data-offer={offer.id}
                aria-labelledby={'offer-' + offer.id + '-act offer-' + offer.id + '-title'}
              >
                <AddFaces off="Add" on="Added" />
                <span className="visually-hidden" id={'offer-' + offer.id + '-act'}>Add to booking:</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 8. Artists ---------- */
// Two to six artists: add or remove entries in data/site.js and data/photos.js.
// Left out of the page while every artist is still a placeholder and the presentation view is on (app/page.jsx).
export function Artists() {
  return (
    <section className="section section--ruled artists" id="artists" aria-labelledby="artists-title">
      <div className="wrap">
        <div className="section__head section__head--row">
          <h2 data-rv="lines" id="artists-title">Artists</h2>
          <div className="scroller-nav">
            <button className="icon-btn" type="button" id="artists-prev" aria-label="Previous artists" disabled>
              <Icon name="left" />
            </button>
            <button className="icon-btn" type="button" id="artists-next" aria-label="More artists" disabled>
              <Icon name="right" />
            </button>
          </div>
        </div>
        <ul className="artists__track" id="artists-track" data-rv="kids">
          {shown(artists).map((artist) => {
            // An artist with no entry in data/photos.js yet still gets a frame: the stone surface.
            const photo = artistPhotos[artist.id] || { slot: 'artist-' + artist.id, src: null, width: 800, height: 1000, alt: '' };
            return (
              <li className="artist" key={artist.id}>
                <Photo
                  photo={photo}
                  className="artist__photo"
                  sizes="(min-width: 64em) 20rem, 72vw"
                  reveal
                  todo={Boolean(artist.todo) || !photo.src}
                />
                <h3 className="artist__name" id={'artist-' + artist.id + '-name'} {...todoFlag(artist.todo)}>{artist.name}</h3>
                <p className="artist__role" {...todoFlag(artist.todo)}>{artist.role}</p>
                <a
                  className="btn btn--line"
                  href="#book"
                  data-artist={artist.id}
                  id={'artist-' + artist.id + '-act'}
                  aria-labelledby={'artist-' + artist.id + '-act artist-' + artist.id + '-name'}
                >
                  Book with this artist
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 9. Gallery ---------- */
// The button lies over its photo and opens the lightbox.
export function Gallery() {
  return (
    <section className="section section--ruled gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="wrap">
        <div className="section__head">
          <h2 data-rv="lines" id="gallery-title">Gallery</h2>
        </div>
        <ul className="gallery__grid" id="gallery-grid">
          {gallery.map((photo, index) => (
            <li className="gallery__item" key={photo.slot}>
              <Photo photo={photo} sizes="(min-width: 48em) 23vw, 46vw" reveal />
              <button
                className="gallery__open"
                type="button"
                aria-label={'View photo ' + (index + 1) + ' of ' + gallery.length + ' larger'}
              />
            </li>
          ))}
        </ul>
        <p className="sample-note" data-rv="up"><span data-todo="">Sample photos for now. The salon&rsquo;s own work will replace them.</span></p>
      </div>
    </section>
  );
}

// Reviews has no section until the salon supplies real quotes and a confirmed rating. Until then the
// link to its Google reviews is a row in the Visit fact sheet (components/Booking.jsx). When quotes
// arrive, the section goes between Gallery and Booking.
