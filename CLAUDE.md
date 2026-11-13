# White Stone Salon website

Standing instructions for every session in this project. Read all of it before doing anything.

> **Changed on 11 November 2026, at the owner's request in chat, in four steps.**
> First the site became animated throughout (section 6). Then it was rebuilt as a Next.js app that Vercel builds, with sample photos from Unsplash and a new Styles section (rules 1.2, 1.3, 1.5, 1.6 and 1.7, and sections 3, 5, 8, 9 and 10). Then, after a design review, it gained two switches in `data/site.js` (section 3), a new order of sections and a few changes of layout (sections 5 and 8). Last, the owner sent the salon's poster of men's packages and asked for every tick line to go: Offers became a real price list, and the comb was taken out of the design (sections 2 to 6). The history and the earlier rules are in `docs/DESIGN.md`, sections 9 to 12.

## 1. Rules that never change

1. **Never run a command.** This is an office machine. No npm, npx, node, python, git, curl, no dev server, no tests, no scripts of any kind. You only read, create and edit files. `.claude/settings.json` blocks the command tools; do not change that file. Vercel installs the packages and builds the site. If a step seems to need a command here, stop and tell me what and why.
2. **The site is a Next.js app that must build without ever being run here.** Nothing can be installed, built or tested on this machine, so:
   - plain JavaScript only (`.js` and `.jsx`): no TypeScript, no ESLint config, no Tailwind, no CSS-in-JS;
   - `package.json` lists `next`, `react`, `react-dom`, `gsap` and `lenis`. Add no package without my say;
   - `next` stays on version 15. Version 16 no longer supports Safari before 16.4, and section 8 asks for iOS 15;
   - the App Router, with server components. The only client component is `components/SiteScript.jsx`;
   - no `package-lock.json` (it cannot be made here), and never a `node_modules` or `.next` folder in the repository;
   - write only what you are sure builds. When unsure how a Next.js feature works in the installed version, look it up first.
3. **Vercel publishes the repository root.** Framework Preset "Next.js", Root Directory left empty. The `site/` folder holds the earlier plain-HTML version; it is not published, but the app uses three of its files: `site/assets/css/site.css`, `site/assets/js/site.js` and `site/assets/img/stone.svg`. Plans and notes live in `docs/`.
4. **Never invent facts about the business.** Prices, offers, discounts, staff names, years of experience, awards, reviews, ratings, opening times and answers to questions come only from sections 2 and 3. Section 3 says what to show while something is missing.
5. **Photos.** At launch, only the salon's own photos, from `public/photos/`. Until they arrive, sample photos from Unsplash (free licence) stand in for the hero, the gallery and the Styles section. Every sample is listed in `docs/PHOTO-CREDITS.md`, and its section is marked `data-todo`. Never use a sample for a hair artist or for the shopfront: a stranger is not staff, and another shop is not this one. Never take an image from anywhere else on the internet, never make up an image URL, never use an AI-generated image. Open and look at a sample before adding it.
6. **Fonts and libraries are fixed.** Marcellus and Hanken Grotesk through `next/font/google` in `app/layout.jsx`. GSAP 3.15.0 (core, ScrollTrigger, SplitText) and Lenis 1.3.27 from npm, loaded by `components/SiteScript.jsx`. All are free. Add nothing else: no other library, CDN, icon font, analytics or tracker. Icons are inline SVG that you draw, one stroke width throughout.
7. **Keep the tested code.** `site/assets/js/site.js` and `site/assets/css/site.css` were tested in a browser, and the React components only draw the markup that script expects. Do not rename an id, a class or a `data-` attribute without changing the script to match. Do not move the page's behaviour into React state. Link between pages with a plain `<a>`, never `next/link`: the script starts once per page load, so every page must load afresh. Keep `method="dialog"` on the booking form: it makes the button do nothing if the script has not started, instead of putting the visitor's name and number in the address bar. Keep the script's safety net whatever else changes: the page must be complete and usable when the libraries have not loaded, and when the visitor prefers reduced motion.

## 2. The business (confirmed facts, use exactly)

- **Name:** White Stone Salon. A unisex salon. Google lists it as "White Stone Unisex Salon", category hair salon.
- **Address:** Shop No. 13, Xenia Society, Fountain Road, opp. Cheryl Society, Downtown, Kharadi, Pune, Maharashtra 411014.
- **Phone:** +91 90271 56238. Link it as `tel:+919027156238`.
- **Closing time:** 10:30 pm (Google listing, November 2026).
- **Google plus code:** HW6V+7R Pune, Maharashtra.
- **Services,** exactly as the owner listed them, in the groups to use on the page:
  - Hair: Haircut, Hairstyling, Balayage, Shampoo & conditioning
  - Beard and shave: Beard trimming, Shaving
  - Skin and make-up: Facials, Make-up
  - Waxing and threading: Waxing, Body waxing, Brazilian waxing, Eyebrow threading, Hair threading
  - Feet and massage: Pedicure, Massage
- Google's review topics for the salon include head massage, spa and beard, so give Massage and Beard trimming a prominent place. Do not add services that are not in the list.
- **Offers:** twelve packages for men, numbered 1 to 12, from the salon's printed poster "Offers on Mens Packages" (photo sent on 11 November 2026). Each has what it includes, a regular price and an offer price. They are written in `offers` in `data/site.js`; use them exactly. A package may name a service that is not in the menu above (hair colour, hair spa, D-tan, facials by brand): that is the poster's wording and stays inside the package; it does not add a service to the menu. The poster gives no end date, so the page shows none.
- **Visitors:** mostly people nearby on Android phones, arriving from Google Maps. They want to see what is offered, where it is, whether it is open, and to book, in under a minute.

These facts are written once, in `data/site.js`.

## 3. Not yet provided, and what to show until it is

Mark every unconfirmed fact with the attribute `data-todo`. In JSX that is `data-todo=""`; in the lists in `data/` it is `todo: true`. Zero may remain at launch.

The page has two views, chosen by `settings.workingView` in `data/site.js`:

- **Working view (`true`).** Everything in the table below is shown, and every mark is outlined in red.
- **Presentation view (`false`),** for showing the salon. Offers, Artists and Questions leave out each entry still marked `todo: true`, because such an entry holds no content; a section with none left is left out, with its link in the header. The "Preferred artist" field is left out when no artist is shown. Nothing is outlined, and an empty photo frame shows the stone surface without words. Everything else in the table is shown as written.

The marks stay in the code in both views. Never delete a mark to make the page look finished: confirm the fact, or switch the view.

`settings.listOnSearch` stays `false` until launch day. While it is, every page asks search engines not to list the site.

| Missing | Until the owner supplies it |
|---|---|
| Opening time and weekly hours | Show "Open till 10:30 pm" with `data-todo`. Build booking times from `data-open="10:00"` and `data-close="22:30"` on the form, and mark the time field `data-todo`. |
| WhatsApp number | Assume +91 90271 56238 is on WhatsApp. List it in `docs/CONTENT-TODO.md`. |
| Prices of single services | Show no numbers. Each service row keeps an empty price slot. One line under the menu, "Prices for single services are on request", with `data-todo`, followed by a link to the offers. (Package prices are confirmed: section 2.) |
| An end date for the offers | Show none. |
| What the second number on the poster is for (85306 82828) | Leave it off the site. List it in `docs/CONTENT-TODO.md`. |
| Combo offers | Show these five suggested groupings, no price, each `data-todo`: Cut and beard (Haircut, Beard trimming). Wash, cut and style (Shampoo & conditioning, Haircut, Hairstyling). Facial and threading (Facials, Eyebrow threading). Occasion ready (Make-up, Hairstyling). Feet and shoulders (Pedicure, Massage). |
| Hair artists | Three slots: "Artist name", "Speciality", photo frame, each `data-todo`. The layout must work for two to six artists. |
| Rating and reviews | No rating number and no quotes. (Two Google screenshots disagree: 4.4 from 172 reviews, and 5.0 from 50.) Show only a "Read our reviews on Google" link, as a row in Visit, with `data-todo`. There is no Reviews section until there are real quotes. |
| Google Maps link | Use `https://www.google.com/maps/search/?api=1&query=White%20Stone%20Unisex%20Salon%2C%20Fountain%20Road%2C%20Kharadi%2C%20Pune%20411014` for directions and reviews, with `data-todo`. No embedded map. |
| Answers to questions | Build the section with these questions and a `data-todo` answer each: Do you take walk-ins? How can I pay? Is there parking? Do you cut children's hair? Can I change or cancel a booking? |
| Whether the salon cuts children's hair | The Children group in Styles carries `data-todo`. It is the same open question as above. |
| Photos | Sample photos from Unsplash in the hero, the gallery and Styles; the hero frame and a note under each of the other two carry `data-todo`. Frames with no photo (artists, shopfront) show a drawn stone surface (`site/assets/img/stone.svg`) and name their slot. Slots are fixed in section 9. |
| Logo | Set the name in Marcellus as a wordmark. The icon is `app/icon.svg`: the letters WS in stone on slate. |
| Social links, website address | Leave out, including canonical and Open Graph URL tags. List both in `docs/CONTENT-TODO.md`. |

## 4. Design direction

**The idea is the name.** White stone: honed marble and river pebbles. Cool, quiet, heavy. On it sits one warm colour from this place: marigold, the flower strung across shop fronts in Pune. Lines are plain and solid: a rule between sections, a hairline between rows. There is no comb (rows of small ticks) and no dotted or dashed line anywhere on the page: the owner had every one removed on 11 November 2026, so do not bring one back. Nothing is decoration, except the stone surface that stands in for a photo until the photo arrives.

- **Colour.** Tokens are in `site.css`; use no other colours. The page is stone, text is slate. Ash is for secondary text on stone or chalk only. On pebble, use slate text only. Dark sections are slate with stone text and mist secondary text. Marigold is only for the booking action and offer flags, always with slate text; on a light surface give it a slate outline, because marigold on stone alone is too faint to read as a button.
- **Type.** Marcellus for the wordmark, h1 and h2: its letters are modelled on Roman inscriptions cut in stone. It has one weight, so never bold and never italic. Hanken Grotesk for everything else: 400 for text, 500 for labels and buttons. Sentence case everywhere. Body text 16 to 18px, lines under 70 characters.
- **Layout.** Mobile first: design at 360 to 430px wide, then adapt at 768, 1024 and 1280px. Text is left-aligned; no centred hero. Services and offers are typeset lists of rows divided by hairlines, not grids of cards. Give each section its own layout; do not repeat one card pattern down the page.
- **Shape.** Photos have 2px corners, like cut stone. Buttons and fields 10px. Chips are pills. No shadows, except under the bottom action bar and open overlays.
- **Photographs do the selling:** real photos of this salon, its people and their work, in tall 4:5 crops on phones.
- **Words** are plain and specific, written for someone standing outside deciding whether to come in. A button says what it does ("Send request on WhatsApp", never "Submit"). No slogans.

**Signs of a generated page. Use none of them:** cream background with a terracotta accent; purple or pink gradients; frosted-glass panels; everything centred; rows of identical rounded cards with soft grey shadows; small all-caps labels above headings; one word of a headline in italics or another colour; numbered markers (01, 02, 03) on things that are not steps; facts joined with middle dots; arrows after button labels; emoji as icons; counters or badges with made-up numbers.

## 5. The page

One page, `app/page.jsx`, in this order:

1. **Header.** Wordmark, links to Services, Styles, Offers, Artists, Gallery and Visit, and a "Book" button. On phones: wordmark and a menu button that opens a full-screen menu with large links, the phone number and the address. The links come from `navLinks` in `data/site.js`, which drops the link to a section that is left out.
2. **Hero.** One tall photo (slot `hero`). An h1 that says what and where in plain words: "Hair, beard and skin care on Fountain Road, Kharadi". Keep "Fountain Road," on one line with the `nowrap` span, never with a non-breaking space: the library that splits the headline into lines ignores that space, and the headline would jump when the opening sequence ends. One line with the landmark ("Opposite Cheryl Society") and the closing time. Two actions: "Book an appointment" (goes to the booking form) and "Call". From 768 to 1023px the text and the photo share the row equally.
3. **Service band.** Two lines of the fifteen service names that slide in opposite directions as the page scrolls, with a thin bar between names. It repeats the menu, so hide it from screen readers.
4. **Services menu.** The five groups. Each row: service name, price slot, and an "Add" toggle that adds the service to the booking, with a hairline between rows and no leader line. Groups collapse on phones; two columns on desktop. Under the menu, the line about single-service prices and a link to the offers. When one or more services are selected, a slim bar shows "2 services selected" and "Book these". A package counts as a package: "1 service and 1 package selected".
5. **Styles.** Example cuts in three groups, Women, Men and Children: four tall photos each, with a short caption that describes the cut. The captions describe photos; they are not a price list and add no service. It follows Services so that photographs come early.
6. **Combos.** The five groupings, each listing its services, with "Add combo to booking".
   - **Intro line:** "Shortcuts for services that go together. One tap adds them all to your booking." Claim no price and no saving: the combos are unconfirmed.
   - **Turning a combo off** removes only the services that combo added itself. A service chosen on its own stays, and so does one that another chosen combo still needs. If the combo added nothing, all its services go.
   - **Build your own:** the last cell of the list invites people to build their own from the menu.
   - **From 1024px** the list is two columns, each cell with the name and services on the left and the button on the right, so that no row has a hole in its middle.
7. **Offers.** The salon's twelve men's packages, below Combos, as a price list on a pebble band. Each row: the package's name ("Package 7", the salon's own number), what it includes, the regular price struck through, the offer price on a marigold flag, and an "Add" toggle. On phones a row reads in three lines: the name with its prices, then what it includes across the full width at 16px, then the toggle at the right. From 768px the toggle sits beside the contents. Two columns from 1024px, read down the first and then the second. Adding one puts "Offer: Package 7 (Rs 1,149)" in the booking request: `site.js` takes that from the text of `.offer__title`, which is why the heading carries the price in a visually hidden span. The section after Offers has no rule above it; the edge of the band divides them.
8. **Artists.** A sideways scroller with scroll-snap: tall portraits (slots `artist-1` and up), name, speciality, and "Book with this artist", which fills the artist field. Previous and next buttons on desktop.
9. **Gallery.** Eight photos (slots `gallery-1` to `gallery-8`) in an offset grid. A tap opens a `<dialog>` lightbox with previous, next, swipe and Escape.
10. **Booking.** A dark slate section holding the form in section 7.
11. **Visit.** Address, landmark, hours, plus code, phone, the "Read our reviews on Google" link, "Get directions", "Call", and one photo of the shopfront (slot `visit`), in that order in the markup and on phones. From 1024px the photo sits on the left.
12. **Questions.** An accordion. From 1024px the heading sits on the left and the list on the right, on the same split as Booking.
13. **Footer.** Wordmark, address, phone, section links, link to the privacy page, the year.

There is no Reviews section until the salon supplies real quotes and a confirmed rating. When it does, the section goes between Gallery and Booking.

On phones, a **bottom action bar** stays fixed: Book, Call, WhatsApp, Directions. Four equal targets at least 44px tall, clear of the phone's safe area. The page reserves space for it. It hides while the booking form is on screen or a field has focus.

## 6. Motion

The site is animated throughout. It moves in five ways.

1. **One opening sequence**, once per browser session: a slate curtain carrying the wordmark lifts, the hero headline rises line by line, the supporting line and the actions fade up, and the hero photo settles. In the markup: `data-intro="lines"` on the h1, `data-intro="fade"` on the supporting line and the actions, `data-intro="settle"` on the hero photo, and the `.curtain` element at the top of the body. A visitor never waits more than about a second:
   - The curtain is gone 0.9 seconds after the script starts.
   - The start-up guard in `app/layout.jsx` uncovers the page, and skips the sequence, if the script has not started within 0.8 seconds of the first paint.
   - Do not lengthen either time.
2. **Motion tied directly to scrolling.** The service band (`data-slide` on each line, inside a band that hides overflow; a negative number slides the other way). Photo drift (`data-drift="6"` on an `<img>`, inside its `.photo` frame). The hero photo and the gallery columns moving at different speeds. The large wordmark rising in the footer. The progress line under the header.
3. **Reveals, once, as content scrolls into view.** `data-rv="lines"`: a heading rises line by line. `data-rv="up"`: a block fades up. `data-rv="kids"`: the children of a list or grid follow one another. `data-rv="photo"`: a photo frame wipes open. The rule at the top of a section draws from the left.
4. **Smooth wheel scrolling on desktop** (Lenis). Phones and tablets keep their own scrolling.
5. **Everything a visitor operates answers with motion:** the menu overlay, "Add" toggles and the selected-services bar, collapsing groups, the artist scroller, the lightbox, the accordion, field focus and errors, the pressed state of buttons, the confirmation after sending, the action bar and the header hiding and showing. With a mouse: buttons fill, links underline, menu rows shift, and a "View" cursor follows the pointer over gallery photos.

Rules for all of it:
- Content never depends on motion. Start states for kinds 1 to 3 are set by the script, and only after the library has loaded and the visitor allows motion. Without the library, or with reduced motion, the page is complete and still.
- A reveal changes `opacity`, `transform` and `clip-path` only. Never use `visibility` or `display` to hide something that will be revealed: keyboard focus and screen readers must reach everything at any time.
- Nothing moves by itself for more than five seconds. Longer motion is driven by the visitor's scrolling or pointer.
- Never put `data-rv="up"` on a button or a link itself (their own press transition fights the reveal). Put it on the element around it.

Rules for the fifth kind:
- CSS transitions with the timing tokens in `site.css`, so they work without the library and switch off for visitors who prefer reduced motion.
- Animate `transform`, `opacity` and `clip-path` only. A panel that opens changes height at once and its content fades in over 150ms; never animate height.
- Things entering or leaving use the ease-out token. Small controls 150 to 220ms, overlays up to 320ms. A pressed button scales to 0.97.
- Hover styles only inside `@media (hover: hover) and (pointer: fine)`. Name the properties in every transition; never `transition: all`.

**Never:** smooth or hijacked scrolling on touch devices; pinned sections; carousels that move by themselves; a loading screen that waits for content (the opening curtain is timed, lifts within about a second, and is removed by the start-up guard if the script is slow).

## 7. Booking

The form sends a request through WhatsApp. There is no server-side code for it. Use the tested helpers on `window.WS`.

Fields, in this order:
1. **Services:** chips for what was selected on the page, removable, plus "Add a service or package". That list holds the menu's services in their groups and, while Offers is on the page, a group "Men's packages" labelled as the package headings read ("Package 7 (Rs 1,149)"). Choosing a package adds it exactly as its Add button does. At least one service or package is required.
2. **Preferred artist:** optional, default "No preference".
3. **Date:** native date input, from `WS.isoDate(0)` to `WS.isoDate(60)`.
4. **Time:** a select built with `WS.timeSlots(open, close, 30, 30, notBefore)`, reading `data-open` and `data-close` from the form. For today, pass the time 30 minutes from now as `notBefore`. If no times are left today, say so and suggest tomorrow.
5. **Name:** required, `autocomplete="name"`.
6. **Mobile number:** required, `inputmode="tel"`, `autocomplete="tel"`, checked with `WS.normaliseMobile`.
7. **Note:** optional, 200 characters at most.

Behaviour:
- The button reads "Send request on WhatsApp". Beside it: "This sends a request, not a confirmed booking."
- Check fields when they lose focus and again on submit. An error says what to fix, sits under its field, and is tied to it with `aria-describedby`. On submit, focus the first field with an error. Never clear what the visitor typed.
- Save the draft in `sessionStorage` under `ws-booking` as the visitor types, and restore it on load.
- On a valid submit, build these lines and open `WS.whatsappUrl('919027156238', lines)` in a new tab by clicking a temporary `<a target="_blank" rel="noopener">` inside the submit handler:

```
Booking request from the website
Name: Asha Kulkarni
Mobile: +91 98765 43210
Services: Haircut, Beard trimming
Date: Sat 14 Nov 2026
Time: 6:30 pm
Artist: No preference
Note: (leave this line out when the note is empty)
```

- Then replace the form with a confirmation panel and move focus to it: "WhatsApp should now be open with your request. It is not sent until you press send there." Three actions: "Open WhatsApp again", "Copy the request" (clipboard, with a select-the-text fallback) and "Call +91 90271 56238".

All of this is in `site/assets/js/site.js`. `components/Booking.jsx` only draws the form.

## 8. Quality bar

- **Speed.** Every photo goes through `components/Photo.jsx` (which uses `next/image`) with its `width`, `height`, `alt` and `sizes`. The hero is the only one loaded eagerly, with high priority; it is covered only by the opening curtain. Nothing may shift the layout after it appears. Keep the stylesheets (`site.css` and `app/next.css` together) under 60 KB and `site.js` under 60 KB.
- **Access (WCAG 2.2 AA).** Real landmarks, one h1, headings in order, a working skip link. Everything works by keyboard with a visible focus ring. Targets at least 44 by 44px. The menu and lightbox trap focus and close on Escape. Every field has a label. Errors are announced. Colour is never the only signal. Text survives 200% zoom.
- **Search.** Keep the title and description (in `app/layout.jsx`). JSON-LD of type `HairSalon` with the name, address and telephone only (in `data/site.js`): no rating, no hours until they are confirmed. Until launch, `settings.listOnSearch` is `false` and every page carries a "noindex" instruction: Vercel hides preview addresses from search engines, but not a project's main address. `public/robots.txt` still allows everything, so that search engines can read that instruction.
- **Browsers.** Chrome on Android, Safari on iOS 15 and later, Firefox, Edge. Anything newer than those support must fail quietly.
- **Privacy page.** State only what is true: the site has no database and no accounts and stores nothing about visitors; it is hosted by Vercel, which sees each request as any host does; the booking draft stays in the visitor's browser until they send it through WhatsApp; fonts and scripts are served from the site itself; the sample photos are fetched from Unsplash by the host, not by the visitor's browser; there are no cookies and no analytics.

## 9. Files

```
package.json                   the five packages and the build scripts
next.config.mjs                allows the sample photos' address
app/layout.jsx                 the html shell: fonts, title, start-up guard, stylesheets
app/page.jsx                   the page: the components in order
app/next.css                   styles only this build needs (fonts, Styles, Questions, presentation view)
app/privacy/page.jsx           the privacy note
app/not-found.jsx              not-found page with a link home
app/icon.svg                   the WS icon
components/Chrome.jsx          header, phone menu, footer, the two bars, lightbox, curtain
components/Sections.jsx        hero, band, services, styles, combos, offers, artists, gallery
components/Booking.jsx         booking form, visit (with the reviews link), questions
components/Photo.jsx           one photo frame
components/Icons.jsx           the icon sprite
components/SiteScript.jsx      loads GSAP and Lenis, then runs site.js
data/site.js                   every fact and list on the page, and the two settings (section 3)
data/photos.js                 every photo
public/photos/                 the salon's own photos
public/robots.txt              allow everything
site/assets/css/site.css       the stylesheet (tested)
site/assets/js/site.js         all behaviour and motion (tested)
site/assets/img/stone.svg      the stone surface for empty photo frames
site/index.html and the rest   the earlier plain-HTML version: kept for reference, not published
docs/DESIGN.md                 the design plan and its history
docs/PHOTOS.md                 every photo slot, for the owner
docs/PHOTO-CREDITS.md          every sample photo and its photographer
docs/CONTENT-TODO.md           every missing fact, where it shows, what the owner must send
README.md                      how to deploy, preview and edit
```

Photo slots (JPEG, quality about 75). Use these names and sizes in `data/photos.js` and in `docs/PHOTOS.md`:

| File | Pixels | Shows | Largest size |
|---|---|---|---|
| `hero.jpg` | 1200 x 1500 | the salon inside, or an artist at work | 220 KB |
| `artist-1.jpg` to `artist-3.jpg` | 800 x 1000 | one portrait each | 120 KB |
| `gallery-1.jpg` to `gallery-8.jpg` | 900 x 1125 | finished hair, beard and skin work; details of the room | 140 KB |
| `style-women-1.jpg` to `-4`, `style-men-1.jpg` to `-4`, `style-children-1.jpg` to `-4` | 800 x 1000 | one finished cut each | 120 KB |
| `visit.jpg` | 1200 x 800 | the shopfront as seen from Fountain Road | 160 KB |

Markup for every photo, drawn by `<Photo photo={...} />`: `<figure class="photo" data-slot="hero"><img data-photo src="..." width="1200" height="1500" alt="..."></figure>`.

The README gives the Vercel settings: Framework Preset "Next.js", Root Directory empty, Build and Output settings left as they are.

## 10. How to work

1. Read this file, `data/`, `components/`, `app/` and the two tested files in `site/assets/`.
2. For a change of design, update `docs/DESIGN.md` first: what changes and why. Check it against section 4 and the list of signs of a generated page.
3. Keep `docs/PHOTOS.md`, `docs/PHOTO-CREDITS.md` and `docs/CONTENT-TODO.md` true to the page.
4. Make the change in the smallest number of files. Content goes in `data/`, markup in `components/`, styles in the stylesheets, behaviour in `site.js`.
5. You cannot build or run the site, so check it by reading it:
   - every `import` points at a file that exists, and every imported name is exported by that file;
   - every id, class and `data-` attribute that `site.js` looks for is drawn by a component, spelled the same;
   - the JSX is valid: `className` and `htmlFor`, every tag closed, one parent per `return`, no `value` on a field without a handler;
   - `site.js` stays a plain script with no `import` or `export` of its own and no `fetch(`; no `http://` anywhere (the `xmlns` namespace that every `.svg` file must carry is the one exception: it is a name, not a request);
   - every photo has `width`, `height` and `alt`; every field has a label; ids are unique;
   - every control is a real `<button>`, `<a>`, `<input>`, `<select>`, `<details>` or `<dialog>`;
   - every missing fact is shown as section 3 says and listed in `docs/CONTENT-TODO.md`;
   - the page is right in both views: read it once with `settings.workingView` as `true` and once as `false`;
   - nothing from the list of signs of a generated page crept in.
6. Finish with a report: the files changed; every `data-todo` and where it is; what you could not verify without a build; what I should look at first on the Vercel preview.

When I send screenshots or a Vercel build log later, describe what you see before you change any code.

## 11. Skills

If these skills are installed, use them: `frontend-design` at step 2. `emil-design-engineering`, `make-interfaces-feel-better` and `web-animation-design` while writing the CSS and motion. `ux-copy` for every label, error and empty state. `accessibility-review` and `ui-review` at step 5, saying plainly that the review was of code and not of a rendered page. Where a skill disagrees with this file, this file wins.

**Impeccable** (`impeccable`, by Paul Bakaus, copied by hand from github.com/pbakaus/impeccable into the user folder `~/.claude/skills/impeccable`) is for reviews and refinements: `critique`, `audit`, `polish`, `clarify`, `layout`, `typeset`, `adapt`, `harden`, `optimize`, `animate`, `quieter`, `distill`. In this project:

- Its setup runs a launcher script (`scripts/impeccable context`). Rule 1.1 forbids that, so always take the skill's own fallback: say that its context did not load, then read this file, `data/` and `docs/DESIGN.md` instead.
- Never use anything that runs its scripts, a server or a browser: `detect`, `hooks`, `pin`, `doctor`, `live`, `generate`. Never turn on its design hook: it runs a downloaded program, unsandboxed, after every edit.
- Do not run `init` or `document`. The product context is sections 2 and 3 of this file, and the design is `docs/DESIGN.md`. A `PRODUCT.md` or a second `DESIGN.md` would repeat them and drift apart.
- `bolder`, `colorize`, `delight` and `overdrive` change the look that section 4 fixes: use them only when I ask.
