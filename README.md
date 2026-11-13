# White Stone Salon website

One page for White Stone Salon, Kharadi, Pune. It is a Next.js app. Vercel installs the packages and builds it; nothing is ever run on this machine.

Standing rules for anyone (or any assistant) editing this project are in `CLAUDE.md`. Read them first.

## What is where

```
package.json              the five packages (next, react, react-dom, gsap, lenis)
next.config.mjs           one setting: where the sample photos come from
app/                      the pages
  layout.jsx              the html shell: fonts, title, stylesheets
  page.jsx                the home page: lists the sections in order
  privacy/page.jsx        the privacy note
  not-found.jsx           shown for an address that does not exist
  next.css                a few styles only this build needs
  icon.svg                the WS icon
components/               the sections, as React components
data/
  site.js                 every fact and list on the page: phone, address, services, offers, combos, questions,
                          and the two settings (which view to show; whether Google may list the site)
  photos.js               every photo
public/photos/            the salon's own photos go here
site/assets/css/site.css  the stylesheet
site/assets/js/site.js    all behaviour and motion (menu, booking form, animation)
site/assets/img/stone.svg the stone surface shown in a frame that has no photo
site/index.html ...       the earlier plain-HTML version. Not published. Kept for reference.
docs/                     design plan, photo list, photo credits, missing content
```

## Deploy on Vercel

1. Put the project in a Git repository. On GitHub this can be done on the website: create an empty repository, choose "uploading an existing file", and drag in everything **inside** the `white-stone-salon` folder (the contents, not the folder itself).
2. In Vercel choose "Add New", then "Project", and import the repository. Vercel recognises Next.js by itself. Check these settings:

| Setting | Value |
|---|---|
| Framework Preset | Next.js |
| Root Directory | leave empty. **Not `site`.** |
| Build Command | leave as it is |
| Output Directory | leave as it is |
| Install Command | leave as it is |

3. Press Deploy. Vercel runs `npm install` and `next build` and gives the site an address. Every later change pushed to the repository is built and published the same way.

**If the build fails,** open the failed deployment, copy the red lines from the build log and send them. They name the file and the line. This app has never been built: it was written on a machine where nothing can be run, so a first-build error is possible and is fixed from that log.

## Preview

- **On Vercel.** A Next.js app cannot be opened by double-clicking a file. Each push to GitHub gets its own preview address on Vercel about a minute later. That is the real site.
- **The earlier version, from the disk.** Double-click `site/index.html` in File Explorer so that it opens in Chrome or Edge. It is the first plain-HTML build: no Styles section, no sample photos, no packages, the old order of sections. It shares the stylesheet with the live site, which has moved on, so parts of it (Offers, Combos) no longer look right. It is a reference for the script, not what gets published. Judge the site on Vercel.
- **Never judge either in the Claude app's Browser pane.** That pane shows a snapshot of one file without its stylesheet and script, so the page looks unstyled and nothing moves.
- **On a machine where commands are allowed:** `npm install`, then `npm run dev`, then open the address it prints.

While looking at the site:

- The opening curtain plays once per browser session. Close the tab and open the site again to see it again.
- If Windows has "Animation effects" switched off (Settings, Accessibility, Visual effects), the browser reports that you prefer reduced motion and the site shows no animation. That is deliberate.
- To see it as a phone does: press F12, click the phone-and-tablet icon (Ctrl+Shift+M in Chrome and Edge) and choose a width near 390.
- The site has two views, set by `workingView` in `data/site.js` (see "Edit"). As delivered it is in the presentation view: clean, for showing the salon. The working view adds every empty slot, and draws a red dashed outline round everything the owner has not confirmed, including every section that still shows sample photos. See "Before launch".

## Edit

Almost everything is changed in the two files in `data/`.

| To change | Do this |
|---|---|
| Which view the site shows | `workingView` in `settings`, near the top of `data/site.js`. `false` is the presentation view, for showing the salon: Artists and Questions are left out while they hold nothing real, and nothing is outlined in red. `true` is the working view: every empty slot is shown and every unconfirmed fact is outlined in red. |
| Whether Google may list the site | `listOnSearch` in the same `settings`. Leave it `false` until launch day; set it to `true` then. |
| Phone, address, hours, Maps link, WhatsApp number | `business` at the top of `data/site.js`. The phone number also appears in the page description in `app/layout.jsx` and in the JSON-LD block at the bottom of `data/site.js`. |
| Booking times | `bookingOpen` and `bookingClose` in `data/site.js` (24-hour, for example `'09:30'`). The last time offered is 30 minutes before closing. |
| A service | `serviceColumns` in `data/site.js`. Change the same name in `bandLines`, and in any combo that uses it. |
| The price of a single service | `prices` in `data/site.js`: the service name exactly as in the menu, then the price as it should read. When all are in, delete the sentence "Prices for single services are on request" and its call link in `components/Sections.jsx`. |
| An offer (a men's package) | `offers` in `data/site.js`. Each line has the package's name (`title`), what it includes (`items`), the regular price (`was`) and the offer price (`now`). Change a price there; delete a line to end an offer; add a line with the next `id` for a new one. With no offers left, the section and its header link disappear by themselves. |
| A combo | `combos` in `data/site.js`. Service names must be spelled exactly as in the menu. When the salon confirms one, delete its `todo: true`. |
| An artist | `artists` in `data/site.js` and `artistPhotos` in `data/photos.js`, under the same `id`. Two to six artists work. When an artist is real, delete its `todo: true`. |
| An answer | `questions` in `data/site.js`: replace `a: pendingAnswer` with the answer in quotes and delete `todo: true`. |
| The reviews link | It is a row in Visit, in `components/Booking.jsx`, and uses the Maps link. A Reviews section of its own waits for real quotes. |
| A photo | Put the file in `public/photos/` with the name and size in `docs/PHOTOS.md`. In `data/photos.js` set that entry's `src` to the local path, for example `src: '/photos/hero.jpg'`, and rewrite its `alt`. |
| A style (the cuts for women, men, children) | `styles` in `data/photos.js`: the caption, the photo and its description. |
| Motion on something new | Add one attribute to the element: `data-rv="lines"` (a heading rises line by line), `data-rv="up"` (a block fades up), `data-rv="kids"` (the items of a list follow one another) or `data-rv="photo"` (a photo frame wipes open). Never on a button or link itself; put it on the element around it. |

Whenever you fill in something that had a red outline, remove its `data-todo`.

### Rules that keep the site building and working

- Never run a command on this machine. Never add `node_modules`, `.next` or a `package-lock.json` to the repository.
- Plain JavaScript only: no TypeScript, no ESLint config, no Tailwind, no new packages.
- Next.js stays on version 15 (`"next": "^15.5.29"`). Version 16 drops Safari before 16.4, which would cut off older iPhones.
- Links between pages are plain `<a>` tags, not `next/link`: the script starts once per page load.
- `site/assets/js/site.js` runs the whole page. The components only draw the markup it expects, so never rename an id, a class or a `data-` attribute in a component without changing the script.
- Colours and timings come from the tokens at the top of `site.css`.
- Lines are plain and solid. The owner had every dotted or ticked line removed; do not add one.
- Whatever motion is added, the page must stay complete when the libraries have not loaded and still when the visitor prefers reduced motion.

## Before launch

1. Set `workingView: true` in `data/site.js` and look at the page: everything outlined in red is still unconfirmed. Then search the project for `data-todo` and `todo: true`. None may be left. `docs/CONTENT-TODO.md` lists each one and what the owner has to send.
2. Every sample photo is replaced by the salon's own (`docs/PHOTOS.md`), no frame says "Photo needed", and every `alt` describes the real photo. Then delete the `remotePatterns` setting in `next.config.mjs`.
3. Send yourself a test booking from a phone and check that it arrives on the salon's WhatsApp.
4. When the site has its address, add it where `docs/CONTENT-TODO.md` says.
5. Last of all, set `listOnSearch: true` in `data/site.js`. Until then every page asks search engines not to list the site, because it still shows unconfirmed content and photos of strangers.
