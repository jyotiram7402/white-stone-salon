import { Icon } from './Icons';
import Photo from './Photo';
import { business, questions, has, shown } from '../data/site';
import { visit } from '../data/photos';

// Booking, Visit and Questions.
//
// The form has no React state on purpose. site/assets/js/site.js fills the lists, checks the fields,
// saves the draft, builds the WhatsApp message and swaps the form for the confirmation panel. That script
// was tested in a browser; these components only draw the same markup it expects. Do not rename ids.

/* ---------- 10. Booking ---------- */
// data-open and data-close set the first and last hour offered. data-whatsapp is the number the request goes to.
export function Booking() {
  const addLabel = has.offers ? 'Add a service or package' : 'Add a service';
  return (
    <section className="book on-slate" id="book" aria-labelledby="book-title">
      <div className="wrap book__in">
        <div className="book__intro">
          <h2 data-rv="lines" id="book-title">Book an appointment</h2>
          <p className="lead" data-rv="up">Pick your services, a day and a time. The request goes to the salon on WhatsApp.</p>
          <p className="book__alt" data-rv="up">Rather talk? <a href={business.phoneHref}>{'Call ' + business.phoneDisplay}</a></p>
        </div>

        <div className="sheet" data-rv="up">
          <noscript>
            <p className="sheet__noscript">{'This form needs JavaScript, which is switched off in your browser. Call ' + business.phoneDisplay + ' to book.'}</p>
          </noscript>

          {/* method="dialog": if the script has not started, pressing the button does nothing at all,
              instead of reloading the page with the visitor's name and number in the address bar. */}
          <form
            className="form"
            id="booking-form"
            method="dialog"
            noValidate
            data-open={business.bookingOpen}
            data-close={business.bookingClose}
            data-whatsapp={business.whatsapp}
          >
            <p className="form__status" id="form-status" role="alert" />
            <p className="form__note">Every field is needed unless it says optional.</p>

            <div className="field">
              <p className="field__label" id="chips-label">Services</p>
              <ul className="chips" id="chips" aria-labelledby="chips-label" />
              {/* While Offers is on the page, site.js also lists the men's packages in this select. */}
              <p className="field__hint" id="chips-empty">
                {has.offers
                  ? 'Nothing added yet. Choose from the list below, or tap Add next to any service or package on this page.'
                  : 'Nothing added yet. Choose from the list below, or tap Add next to any service on this page.'}
              </p>
              <label className="visually-hidden" htmlFor="service-add">{addLabel}</label>
              <div className="control control--select">
                <select id="service-add" aria-describedby="services-error">
                  <option value="">{addLabel}</option>
                </select>
              </div>
              <p className="field__error" id="services-error" aria-live="polite" />
            </div>

            {/* Hidden while the Artists section is left out: the list would hold only "No preference".
                The field stays in the form, so the script still finds it and the request still says so. */}
            <div className="field" hidden={!has.artists}>
              <label className="field__label" htmlFor="artist">Preferred artist <span className="field__opt">(optional)</span></label>
              <div className="control control--select">
                <select id="artist" name="artist">
                  <option value="">No preference</option>
                </select>
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label className="field__label" htmlFor="date">Date</label>
                <div className="control">
                  <input type="date" id="date" name="date" required aria-describedby="date-error" />
                </div>
                <p className="field__error" id="date-error" aria-live="polite" />
              </div>

              <div className="field" data-todo="">
                <label className="field__label" htmlFor="time">Time</label>
                <div className="control control--select">
                  <select id="time" name="time" required aria-describedby="time-error">
                    <option value="">Choose a date first</option>
                  </select>
                </div>
                <p className="field__hint" id="time-note" hidden>No times are left today. <button className="link-btn" type="button" id="time-tomorrow">Choose tomorrow</button></p>
                <p className="field__error" id="time-error" aria-live="polite" />
              </div>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="name">Name</label>
              <div className="control">
                <input type="text" id="name" name="name" autoComplete="name" autoCapitalize="words" spellCheck={false} required aria-describedby="name-error" />
              </div>
              <p className="field__error" id="name-error" aria-live="polite" />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="mobile">Mobile number</label>
              <div className="control">
                <input type="tel" id="mobile" name="mobile" inputMode="tel" autoComplete="tel" required aria-describedby="mobile-hint mobile-error" />
              </div>
              <p className="field__hint" id="mobile-hint">A 10-digit Indian mobile number.</p>
              <p className="field__error" id="mobile-error" aria-live="polite" />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="note">Note <span className="field__opt">(optional)</span></label>
              <div className="control">
                <textarea id="note" name="note" rows={3} maxLength={200} aria-describedby="note-hint" data-lenis-prevent="" />
              </div>
              <p className="field__hint" id="note-hint">Up to 200 characters.</p>
            </div>

            <div className="form__send">
              <button className="btn btn--book btn--big" type="submit">
                <Icon name="chat" />
                Send request on WhatsApp
              </button>
              <p className="form__fine">This sends a request, not a confirmed booking.</p>
            </div>
          </form>

          {/* Shown in place of the form after a valid request. */}
          <div className="confirm" id="confirm" role="group" aria-labelledby="confirm-title" tabIndex={-1} hidden>
            <h3 className="confirm__title" id="confirm-title">One more step: press send in WhatsApp</h3>
            <p>WhatsApp should now be open with your request. It is not sent until you press send there.</p>
            <pre className="confirm__text" id="request-text" />
            <div className="confirm__actions">
              <a className="btn btn--book" id="wa-again" href={business.whatsappHref} target="_blank" rel="noopener">
                Open WhatsApp again<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
              <button className="btn btn--line" type="button" id="copy-request">
                <Icon name="copy" />
                Copy the request
              </button>
              <a className="btn btn--line" href={business.phoneHref}>
                <Icon name="phone" />
                {'Call ' + business.phoneDisplay}
              </a>
            </div>
            <p className="confirm__status" id="copy-status" role="status" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 11. Visit ---------- */
// Order: heading, facts, buttons, photo. On phones the section stacks in this order, so someone looking for
// the address meets it first. From 1024px the grid in site.css places the photo on the left.
export function Visit() {
  return (
    <section className="section visit" id="visit" aria-labelledby="visit-title">
      <div className="wrap visit__in">
        <h2 className="visit__title" data-rv="lines" id="visit-title">Visit</h2>
        <div className="visit__text">
          <dl className="facts" data-rv="kids">
            <div className="fact">
              <dt>Address</dt>
              <dd><address>{business.address}</address></dd>
            </div>
            <div className="fact">
              <dt>Landmark</dt>
              <dd>{business.landmark}</dd>
            </div>
            <div className="fact">
              <dt>Hours</dt>
              <dd><span data-todo="">{business.hours}</span></dd>
            </div>
            <div className="fact">
              <dt>Plus code</dt>
              <dd>{business.plusCode}</dd>
            </div>
            <div className="fact">
              <dt>Phone</dt>
              <dd><a href={business.phoneHref}>{business.phoneDisplay}</a></dd>
            </div>
            {/* Reviews: only this link until the salon supplies real quotes and a confirmed rating. */}
            <div className="fact">
              <dt>Reviews</dt>
              <dd>
                <a data-todo="" href={business.mapsHref} target="_blank" rel="noopener">
                  Read our reviews on Google<span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>
          <div className="visit__actions" data-rv="up">
            <a className="btn btn--solid" data-todo="" href={business.mapsHref} target="_blank" rel="noopener">
              <Icon name="pin" />
              Get directions<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <a className="btn btn--line" href={business.phoneHref}>
              <Icon name="phone" />
              Call<span className="visually-hidden">{' ' + business.phoneDisplay}</span>
            </a>
          </div>
        </div>
        <Photo photo={visit} className="visit__photo" sizes="(min-width: 64em) 55vw, 100vw" reveal imgProps={{ 'data-drift': '6' }} />
      </div>
    </section>
  );
}

/* ---------- 12. Questions ---------- */
// When an answer is confirmed: put it in data/site.js and remove  todo: true  from that question.
// Left out of the page while every answer is still missing and the presentation view is on (app/page.jsx).
// On wide screens the heading sits on the left and the list on the right (.faq__in in app/next.css).
export function Questions() {
  return (
    <section className="section section--ruled faq" id="questions" aria-labelledby="questions-title">
      <div className="wrap">
        <div className="faq__in">
          <div className="section__head">
            <h2 data-rv="lines" id="questions-title">Questions</h2>
          </div>
          <div className="faq__list" data-rv="kids">
            {shown(questions).map((item) => {
              const flag = item.todo ? { 'data-todo': '' } : {};
              return (
                <details className="q" key={item.q}>
                  <summary className="q__sum">
                    <h3 className="q__text">{item.q}</h3>
                    <Icon name="down" className="q__chev" />
                  </summary>
                  <div className="q__panel" data-panel="">
                    <p {...flag}>{item.a}</p>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
