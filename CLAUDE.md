# White Stone Salon website

Guide for every session in this repo. Read it first. Before you change content, design, motion or booking, also read `docs/BRIEF.md`, the owner's full brief. Older notes in the code and in `docs/DESIGN.md` cite "CLAUDE.md section N": since 13 November 2026 that means `docs/BRIEF.md` section N.

"The owner" in these files is the person who runs this project and talks to Claude. Facts about the business come from the salon, through the owner.

## Overview

- A one-page website for White Stone Salon, a unisex salon on Fountain Road, Kharadi, Pune: services, sample styles, combos, the salon's twelve men's packages with prices, a gallery and how to get there. A booking request goes to the salon through WhatsApp.
- Visitors are mostly people nearby on Android phones, arriving from Google Maps. There are no accounts and no database, and booking needs no server code.
- Live at https://white-stone-salon.vercel.app, built by Vercel from `main`. Search engines are asked not to list it until launch.

## Tech stack

- Next.js 15, App Router, server components (`"next": "^15.5.29"`); React 19 (`^19.3.1`). Plain JavaScript and JSX, plain CSS: no TypeScript, ESLint, Tailwind or CSS-in-JS.
- GSAP 3.15.0 (core, ScrollTrigger, SplitText) and Lenis 1.3.27, pinned exactly in `package.json`. Those five are the only packages.
- Fonts: Marcellus (headings) and Hanken Grotesk (text) through `next/font/google`, downloaded at build time and served by the site.
- Hosting: Vercel, connected to the GitHub repo. No lockfile, tests, linter, CI config or Docker.
- The version that matters: Next.js stays on 15. Version 16 drops Safari before 16.4, and the site must work on iOS 15.

## Setup on a fresh machine

Needs Git and a Node.js LTS release, ideally the one set in the Vercel project's settings (unverified which; Next.js 15 needs at least 18.18). Nothing else: no database, no keys.

1. `git clone https://github.com/jyotiram7402/white-stone-salon.git`, then `cd white-stone-salon`.
2. Allow commands. `.claude/settings.json` denies Claude the Bash, PowerShell and Monitor tools. That was for the old office laptop, where nothing could be run (the parent folder's `CLAUDE.md` there still forbids it). On the new laptop the owner allowed commands (13 November 2026): the owner removes that `deny` list, or asks Claude to, and commits the change.
3. `npm install`, then `npm run dev` and open http://localhost:3000.
4. `npm run build` once. It is what Vercel runs, so a clean build here means a push will build there.
5. Office network: npm failed there with `UNABLE_TO_VERIFY_LEAF_SIGNATURE` (probably HTTPS inspection with a company certificate that Node does not trust; IT never confirmed). Fix to try in PowerShell (unverified; needs a recent Node): `$env:NODE_OPTIONS="--use-system-ca"`, then `npm.cmd install` (`npm.cmd` gets round PowerShell's script blocking). `next/font` downloads the fonts from Google during `dev` and `build`, so it may hit the same error (unverified). Never `npm config set strict-ssl false` or `NODE_TLS_REJECT_UNAUTHORIZED=0`: they switch certificate checks off.
6. Skills live in the user folder, not in this repo. Impeccable: download the ZIP of github.com/pbakaus/impeccable and copy only its `.claude/skills/impeccable` folder to `%USERPROFILE%\.claude\skills\impeccable`. Never copy that repo's `.claude/settings.json`, hooks or agents. The other skills named in `docs/BRIEF.md` section 11 came with the Claude app's plugins (unverified on a new machine).
7. Vercel needs nothing on the laptop.

## Commands

```
npm install      install the five packages
npm run dev      dev server, http://localhost:3000
npm run build    production build, the same as Vercel's
npm start        serve the last build
git push         deploy: Vercel builds and publishes every push to main, in about a minute
```

- There are no tests, no lint or format scripts and no database migrations. A check is `npm run build`, then the page in a browser at 360 to 430px wide and at desktop width, then the reading checklist in `docs/BRIEF.md` section 10.
- No Vercel CLI. A failed Vercel build shows its errors in that deployment's build log.

## Project map

```
app/layout.jsx            html shell: fonts, title and description, the noindex switch, start-up guard, both stylesheets
app/page.jsx              the only page: the sections in order, the JSON-LD, then <SiteScript />
app/next.css              styles only the Next build needs (fonts, Styles, Questions, presentation view)
app/privacy/page.jsx      privacy note (app/not-found.jsx is the 404; app/icon.svg the icon)
components/Chrome.jsx     header, phone menu, footer, the two bars, lightbox, curtain, cursor
components/Sections.jsx   hero, band, services, styles, combos, offers, artists, gallery
components/Booking.jsx    booking form, visit, questions
components/Photo.jsx      every photo frame, through next/image
components/Icons.jsx      the inline SVG icon sprite
components/SiteScript.jsx the only client component: loads GSAP and Lenis, then site.js
data/site.js              every fact and list, the two settings, and derived values (has, navLinks, offersFrom, jsonLd)
data/photos.js            every photo: src, width, height, alt (Unsplash samples for now)
site/assets/js/site.js    all behaviour and motion: 1 helpers (window.WS), 2 missing photos, 3 features, 4 motion
site/assets/css/site.css  the stylesheet, with the colour and timing tokens at the top
site/assets/img/stone.svg the stone surface in frames that have no photo
site/*.html               the first plain-HTML version: not published, reference only
docs/BRIEF.md             the owner's full brief: facts, what to show while missing, design, page order, motion, booking, quality bar, photo slots
docs/DESIGN.md            design plan; sections 9 to 16 record every change and both critiques
docs/CONTENT-TODO.md      every missing fact and what the salon must send
docs/PHOTOS.md            photo slots, for the salon (docs/PHOTO-CREDITS.md: the samples and their photographers)
public/photos/            the salon's own photos (none yet); public/robots.txt allows everything, on purpose
```

How the parts connect:
- The components draw the page on the server from `data/`. There are no API routes; apart from drawing the page, the only server work is Vercel resizing photos.
- In the browser, `components/SiteScript.jsx` imports `gsap`, `gsap/ScrollTrigger`, `gsap/SplitText` and `lenis`, puts them on `window`, then imports `site/assets/js/site.js`. That script finds the markup by id, class and `data-` attribute and runs every feature.
- Booking: `site.js` checks the form, keeps the draft in `sessionStorage` (`ws-booking`), builds the request lines and opens `https://wa.me/919027156238?text=...` in a new tab.
- Photos: `components/Photo.jsx` uses `next/image`; Vercel fetches and resizes the Unsplash samples (`remotePatterns` in `next.config.mjs`).

## Where to start for common tasks

- **A fact, price, package, combo, artist or answer:** `data/site.js`. The README's "Edit" table names each field. When the salon confirms something, remove its `todo: true` or `data-todo` and update `docs/CONTENT-TODO.md`.
- **A salon photo:** put the file in `public/photos/` with the name and size from `docs/PHOTOS.md`, set `src: '/photos/<name>.jpg'` and a true `alt` in `data/photos.js`, and update `docs/PHOTO-CREDITS.md`. When no Unsplash photo is left, delete `remotePatterns` in `next.config.mjs`.
- **A section's markup:** its component (map above). Then search `site/assets/js/site.js` for every id, class and `data-` attribute you touched.
- **Behaviour or motion:** `site/assets/js/site.js`, part 3 (features) or part 4 (motion). Motion on a new element is one attribute: `data-rv="lines"`, `"up"`, `"kids"` or `"photo"`.
- **Colour, spacing, timing:** the tokens at the top of `site/assets/css/site.css`.
- **A new section:** a component, its place in `app/page.jsx` (the order is in `docs/BRIEF.md` section 5) and a link in `navLinks` in `data/site.js`.
- **A design change:** write it into `docs/DESIGN.md` first and check it against `docs/BRIEF.md` section 4.
- **A review:** Impeccable `critique` or `polish`, run against the live site (its limits are in `docs/BRIEF.md` section 11).
- **Launch:** the README's "Before launch", ending with `listOnSearch: true` in `data/site.js`.

## Conventions

- **Never invent facts about the business.** Prices, offers, staff, hours, reviews, ratings and answers come only from `docs/BRIEF.md` sections 2 and 3. Mark anything unconfirmed: `data-todo=""` in JSX, `todo: true` in `data/`. Never delete a mark to make the page look finished.
- **Packages:** only the five. Add none without the owner's say. Next.js stays on 15.
- **React:** server components; the one client component is `components/SiteScript.jsx`. Don't move the page's behaviour into React state.
- **`site.js` stays a classic script:** no `import` or `export`, no `fetch(`. No `http://` anywhere, except the `xmlns` of SVG files.
- **Ids, classes and `data-` attributes** are the contract between the components and `site.js`: rename one only together with the script.
- **Links between pages** are plain `<a>`, never `next/link`: the script starts once per page load.
- **The booking form keeps `method="dialog"`:** without the script, the button then does nothing instead of putting the visitor's details in the address bar.
- **The page must be complete** without the libraries and with reduced motion: only the script sets start states for animation.
- **Photos** go through `components/Photo.jsx` with `width`, `height`, `alt` and `sizes`. Until the salon's arrive, Unsplash samples only, each in `docs/PHOTO-CREDITS.md`. Never a sample for an artist or the shopfront; no AI images; no made-up image URLs.
- **No other fonts, libraries, CDNs, analytics, trackers or icon fonts.** Icons are inline SVG in `components/Icons.jsx`, one stroke width.
- **Where things go:** content in `data/`, markup in `components/`, styles in the two stylesheets, behaviour in `site.js`. Touch as few files as possible.
- **Design** (all of it in `docs/BRIEF.md` section 4): colours only from the tokens; marigold only for booking and offer flags, with slate text; no dotted, dashed or tick lines; no shadows except under the bottom bar and open overlays; Marcellus only for the wordmark, h1 and h2, never bold or italic; sentence case; text left-aligned; none of the "signs of a generated page".
- **Motion:** animate `transform`, `opacity` and `clip-path` only, never height; name the properties, never `transition: all`; hover styles only inside `@media (hover: hover) and (pointer: fine)`; never `data-rv="up"` on a button or link itself.
- **Words:** British spelling (colour, centred), plain and specific; a button says what it does ("Send request on WhatsApp").
- **Docs stay true to the page:** `docs/PHOTOS.md`, `docs/PHOTO-CREDITS.md` and `docs/CONTENT-TODO.md`.
- **Budgets:** `site.css` and `app/next.css` together under 60 KB; `site.js` under 60 KB.
- **How to work,** step by step, with the reading checklist and the closing report: `docs/BRIEF.md` section 10.
- **Every push to `main` goes live.** Ask the owner before any commit or push.

## Env variables & external services

- **Env variables: none.** Nothing reads `process.env` and there is no `.env` file, so there is no `.env.example`.
- **GitHub:** https://github.com/jyotiram7402/white-stone-salon, branch `main`, the only branch.
- **Vercel:** builds and hosts; production https://white-stone-salon.vercel.app. Its settings are in the README, "Deploy on Vercel". The dashboard is the owner's Vercel account (unverified which login).
- **Unsplash:** the sample photos, fetched by Vercel's image optimiser, never by the visitor's browser.
- **Google Fonts:** fetched by `next/font` at build time only.
- **Google Maps:** plain links (`mapsHref` in `data/site.js`): no embed, no API key.
- **WhatsApp:** `wa.me` links to +91 90271 56238; no API.
- **Nothing else:** no analytics, cookies, database or accounts. `app/privacy/page.jsx` says so; keep it true.

## Gotchas

- **Never Next.js 16** (see Tech stack). With no lockfile, a Vercel build can pick up a newer 15.x or 19.x than the last one, without any commit.
- **`site/` is not published but is needed:** the app imports `site/assets/css/site.css` and `site/assets/js/site.js`, and the CSS loads `site/assets/img/stone.svg`. `site/index.html` shares that CSS, which has moved on, so it no longer looks right: don't judge the site from it.
- **Hero headline:** keep "Fountain Road," together with the `nowrap` span, never a non-breaking space. SplitText ignores that space and the headline jumps when the opening ends.
- **Opening sequence:** the curtain lifts 0.9 s after the script starts; the guard in `app/layout.jsx` uncovers the page if the script has not started within 0.8 s. Don't lengthen either, and keep the guard's logic exactly. `suppressHydrationWarning` on `<html>` is intended.
- **The curtain plays once per browser session** (`sessionStorage` key `ws-intro`). With Windows "Animation effects" off, the browser asks for reduced motion and nothing moves, by design.
- **Two switches** in `settings` in `data/site.js`. `workingView: false` (now) leaves out unconfirmed artists and answers and outlines nothing; `true` shows every gap, outlined in red. Look at both before a push. `listOnSearch: false` (until launch) puts noindex on every page; `public/robots.txt` allows everything so search engines can read it.
- **"Rs 399"** is `offersFrom`, worked out from `offers`: never type it. `.offer__title` holds a visually hidden price because `site.js` reads that text for the request line.
- **Claude app Browser pane:** a local `.html` file opens as a snapshot without its CSS and JS, so it looks broken. Use the live URL (or the `npm run dev` address, unverified in the pane). When the pane is hidden or the window unfocused, the page gets about 2 frames a second and screenshots catch reveals half-done: show the pane, or run `gsap.ticker.lagSmoothing(0)` in the page and wait about 2.6 s per shot. For phones, `resize_window` preset `mobile`, then navigate again; if shots crop at the right edge, use 360x780.
- **The footer year** comes from `new Date()` in `app/page.jsx`. If the page is prerendered at build, as Next.js does for a page like this, it changes only with a new build (unverified).

## Current status (13 November 2026)

- Live in the presentation view. Last commit `b9070c7`, "Signpost prices, Styles rows on phones, clearer combos, one Book button". `main` matches `origin/main`.
- **Waiting for the salon:** everything in `docs/CONTENT-TODO.md`: weekly hours, single-service prices, artists, its own photos (21 Unsplash samples stand in), the five answers, its Maps share link, WhatsApp confirmation and the domain. The working view has 31 `data-todo` marks; none may remain at launch.
- **Waiting for the owner:** the design decisions listed at the end of `docs/DESIGN.md` section 16.
- **Open:** whether to commit a `package-lock.json` now that npm can run. The repo has never had one, because the old laptop could not make it (the owner's call).
- **TODO/FIXME:** none in the code. The to-dos are the `data-todo` and `todo: true` marks.
- **Known bugs:** none recorded. Not recorded as done: a local build, a test on a real iPhone (iOS 15 or later), a test booking reaching the salon's WhatsApp (README, "Before launch", step 3).
- **Next:** set up the new laptop, run `npm run build` once, fill in content as the salon sends it, and launch by the README's "Before launch".

When you change commands, structure, env vars or conventions, update this file in the same commit.
