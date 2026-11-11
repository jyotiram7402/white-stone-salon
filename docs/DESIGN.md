# Design plan: White Stone Salon

Written before the build, then revised against CLAUDE.md section 4. The revisions are listed at the end.
The `frontend-design` skill named in CLAUDE.md section 11 is not installed on this machine, so this plan was written without it.

## 1. The idea in one paragraph

A slab of honed stone with a typeset price list on it. The page is cool stone white, the text is slate, and the only warm thing on it is marigold, kept for the one action that matters: booking. The only ornament is the comb: fine vertical teeth, 1px wide and 6px apart. It appears in exactly two jobs: as the leader between a service name and its "Add" control, and as the rule between sections (a 1px spine with teeth hanging under it). Photographs carry the rest.

## 2. Type scale

Marcellus: wordmark, h1, h2 only. One weight, never bold, never italic.
Hanken Grotesk: everything else. 400 for text, 500 for labels, buttons and h3.
(The starter base sets h3 in Marcellus. Part 2 of the CSS moves h3 to Hanken Grotesk 500 so the rule above holds.)

| Role | Font | Size | Line height | Used for |
|---|---|---|---|---|
| h1 | Marcellus | clamp(2.25rem, 1.2rem + 5.2vw, 4.5rem) = 39px at 390, 72px at 1280 | 1.05 | hero headline |
| h2 | Marcellus | clamp(1.75rem, 1.3rem + 2.2vw, 2.75rem) = 29px at 390, 44px at 1280 | 1.1 | section headings |
| Wordmark | Marcellus | 1.375rem (22px), 1.5rem from 1024 | 1 | header, footer |
| Band | Hanken 400 | clamp(1.5rem, 1rem + 2.6vw, 3rem) | 1.2 | sliding service line |
| Menu link | Hanken 400 | 1.75rem (28px) | 1.2 | full-screen phone menu |
| h3 | Hanken 500 | 1.125rem, 1.25rem from 768 | 1.3 | group names, offer titles, combo and artist names |
| Lead | Hanken 400 | 1.125rem (18px) | 1.5 | hero line, section intros |
| Body | Hanken 400 | 1rem, 1.0625rem from 768 | 1.55 | text, service names, answers |
| Label | Hanken 500 | 1rem | 1.3 | buttons, field labels, nav links |
| Small | Hanken 400 | 0.875rem (14px) | 1.45 | hints, errors, footer notes. Nothing is smaller. |

Sentence case everywhere. Text blocks are capped at 34rem so lines stay under 70 characters.

## 3. Spacing scale

4, 8, 12, 16, 24, 32, 48, 64, 96px (`--s1` to `--s9`).

- Page gutter: `--page-pad` (16px at 390, 48px at 1280). Content is capped at 75rem.
- Section padding, top and bottom: clamp(3rem, 2rem + 5vw, 6rem).
- Heading to content: 24px on phones, 32px from 768.
- Rows in the services menu: 56px tall (the "Add" control inside is 44px).
- Tap targets: 44px minimum everywhere (`--tap`), 48px for the main buttons.
- Shape: photos 2px corners; buttons and fields 10px; chips are pills; no shadows except the bottom action bar and open overlays.

## 4. Colour use

Only the tokens in `site.css`. Two derived values are slate with transparency, used for the two permitted shadows and the lightbox veil.

| Surface | Text | Secondary | Where |
|---|---|---|---|
| Stone | slate | ash | most of the page |
| Chalk | slate | ash | the booking sheet, form fields, the action bar |
| Pebble | slate only | slate only | service band, offers band, photo frames |
| Slate | stone | mist | booking section, selected-services bar, footer |
| Marigold | slate | none | Book buttons, "Send request on WhatsApp", offer flags. On a light surface it always carries a slate outline. |

## 5. Sections at 390px and at 1280px

Legend: `[ ]` button or link, `|||||` comb teeth, `#` photo frame.

### 5.1 Header

```
390                                  1280
White Stone Salon         [Menu]     White Stone Salon   Services Offers Artists Gallery Visit   [Book]
```

- At every width the header stays at the top, steps aside while the visitor scrolls down and returns when they scroll up. A thin progress line runs along the top edge.
- 390: "Menu" is a labelled button, not a bare icon.
- Menu overlay: full screen, stone. Top row: wordmark, [Close]. Then five links at 28px, [Book an appointment], the phone number, the address. Left-aligned.
- 1280: solid stone, 1px pebble line under it. No blur.

### 5.2 Hero

```
390                                  1280
Hair, beard and skin care            Hair, beard and skin        ##############
on Fountain Road, Kharadi            care on Fountain Road,      ##############
A unisex salon opposite Cheryl       Kharadi                     ##  hero    ##
Society. Open till 10:30 pm.         A unisex salon opposite     ##  4:5     ##
[Book an appointment] [Call]         Cheryl Society. Open ...    ##############
  ##########################         [Book an appointment][Call] ##############
  ##  hero 4:5, bleeds    ##
  ##  off the right edge  ##
```

- 390: text first, so what, where and the two actions are on screen before any scrolling; the photo starts under them and runs off the right edge.
- 1280: text in the left 6 of 12 columns, set low; photo in the right 5 columns.
- No overlay on the photo, no text on the photo.

### 5.3 Service band

```
Haircut ||| Hairstyling ||| Balayage ||| Shampoo & conditioning ||| Beard trimming ||| ...
```

Two lines on pebble: the first solid and sliding left as the page scrolls, the second in outline and sliding right. Three comb teeth separate the names. Hidden from screen readers. Same at both widths, larger type on desktop.

### 5.4 Services menu

```
390                                  1280
Services                             Services
Add what you want, then book         Add what you want, then book them together.
them together.                       Hair                      v     Skin and make-up          v
Hair                          v      Haircut |||||||||| [+ Add]      Facials ||||||||||| [+ Add]
Haircut ||||||||||||| [+ Add]        ...                             Make-up ||||||||||| [+ Add]
Hairstyling ||||||||| [+ Add]        Beard and shave                 Waxing and threading
Balayage |||||||||||| [+ Add]        Beard trimming ||| [+ Add]      Waxing |||||||||||| [+ Add]
Shampoo & cond. ||||| [+ Add]        Shaving |||||||||| [+ Add]      ...
Beard and shave               v      Feet and massage
...                                  Pedicure ||||||||| [+ Add]
Prices on request                    Massage |||||||||| [+ Add]
```

- Five groups, each a `<details>`: all open on arrival so every service is visible without a tap; on phones each can be folded. From 1024 the groups stay open and the fold control goes away.
- Group order: Hair, Beard and shave, Feet and massage, Skin and make-up, Waxing and threading. Beard and massage sit second and third because Google's review topics name them. Service names and their order inside a group are the owner's.
- Row: name, comb leader, empty price slot, "Add" toggle. Pressed, the toggle turns slate and reads "Added" with a tick; its width never changes.
- Selected-services bar: slate, slim (56px), fixed at the bottom (above the action bar on phones; bottom left on desktop): "2 services selected" and [Book these].
- Without JavaScript the "Add" controls, the Menu button and the form are left out, so nothing on the page is a dead control; the menu still reads as a list of services.

### 5.5 Offers

```
390                                  1280 (pebble band)
Offers                               Offers
[Offer]                              [Offer]           | [Offer]           | [Offer]
Offer title                          Offer title       | Offer title       | Offer title
What it includes                     What it includes  | What it includes  | What it includes
Valid till                           Valid till        | Valid till        | Valid till
[Add to booking]                     [Add to booking]  | [Add to booking]  | [Add to booking]
------------------
[Offer] ...
```

A pebble band. Each offer is a slip with a marigold flag (slate text, slate outline) at its top left. Slips are separated by plain slate rules: horizontal on phones, vertical on desktop. No boxes, no shadows.

### 5.6 Combos

```
390                                  1280
Combos                               Combos
Cut and beard                        Cut and beard        (Haircut) (Beard trimming)        [Add combo to booking]
(Haircut) (Beard trimming)           Wash, cut and style  (Shampoo & c.) (Haircut) (Hairst.) [Add combo to booking]
[Add combo to booking]               ...
...                                  Or build your own from the services menu.
Or build your own from the
services menu.
```

A ledger: one line per combo on desktop (name, service chips, action), stacked on phones. Pebble hairlines between lines. The chips are pills and are not interactive.

### 5.7 Artists

```
390                                  1280
Artists                              Artists                                   [<] [>]
########  ####                       ########  ########  ########
# 4:5  #  #                          # 4:5  #  # 4:5  #  # 4:5  #
########  ####                       ########  ########  ########
Artist name                          Artist name   Artist name   Artist name
Speciality                           Speciality    Speciality    Speciality
[Book with this artist]              [Book with..] [Book with..] [Book with..]
```

Sideways scroller with scroll-snap. On phones a slot is 72% of the screen wide, so the next portrait shows at the edge. On desktop slots are 18rem; previous and next buttons sit top right and are disabled when there is nothing to scroll to. Two artists leave space; six scroll.

### 5.8 Gallery

```
390 (2 columns)                      1280 (4 columns)
Gallery                              Gallery
####  ....                           ####  ....  ####  ....
#1 #  ####                           #1 #  ####  #3 #  ####
####  #2 #                           ####  #2 #  ####  #4 #
....  ####                           ####  ####  ####  ####
####  ....                           #5 #  #6 #  #7 #  #8 #
```

Even-numbered photos sit 40px lower (56px on desktop), which gives the offset. Each photo opens the lightbox: slate veil, photo, [Close], [Previous], [Next], "Photo 3 of 8".

### 5.9 Reviews

```
Reviews
Customers review the salon on its Google listing.
[Read our reviews on Google]
```

A heading, one sentence, one link. Left-aligned. No stars, no numbers, no quotes.

### 5.10 Booking (slate)

```
390                                  1280
Book an appointment                  Book an appointment        +-----------------------------+
Pick your services, a day            Pick your services, a      | Services                    |
and a time. ...                      day and a time. The        | (Haircut x) [Add a service] |
+---------------------------+        request goes to the        | Preferred artist  [select]  |
| Services                  |        salon on WhatsApp.         | Date [    ]   Time [    ]   |
| (Haircut x) (Massage x)   |        Rather talk?               | Name [                    ] |
| [Add a service]           |        [Call +91 90271 56238]     | Mobile number [           ] |
| Preferred artist [select] |                                   | Note [                    ] |
| Date [     ]              |                                   | [Send request on WhatsApp]  |
| Time [     ]              |                                   | This sends a request, not   |
| Name ... Mobile ... Note  |                                   | a confirmed booking.        |
| [Send request on WhatsApp]|                                   +-----------------------------+
+---------------------------+
```

Slate section; the form lies on a chalk sheet so labels, hints and errors keep full contrast. After sending, the sheet shows the confirmation panel in place of the form.

### 5.11 Visit

```
390                                  1280
Visit                                ######################   Visit
######################               ##  visit 3:2       ##   Address   Shop No. 13, Xenia Society ...
##  visit 3:2       ##               ##                  ##   Landmark  Opposite Cheryl Society
######################               ######################   Hours     Open till 10:30 pm
Address   Shop No. 13 ...                                     Plus code HW6V+7R Pune, Maharashtra
Landmark  Opposite Cheryl Society                             [Get directions] [Call]
Hours     Open till 10:30 pm
Plus code HW6V+7R Pune
[Get directions] [Call]
```

A fact sheet (label and value pairs: address, landmark, hours, plus code, phone), not prose. The shopfront photo is the one photo that drifts.

### 5.12 Questions

```
Questions
Do you take walk-ins?                           v
-------------------------------------------------
How can I pay?                                  v
...
```

Accordion of `<details>`, one column, capped at 44rem, left-aligned at both widths.

### 5.13 Footer (slate)

```
390                                  1280
White Stone Salon                    White Stone Salon     Services   Offers    Shop No. 13, Xenia Society ...
Shop No. 13 ...                                            Artists    Gallery   +91 90271 56238
+91 90271 56238                                            Visit      Book
Services Offers Artists ...          Privacy                                    2026 White Stone Salon
Privacy     2026
```

### 5.14 Bottom action bar (below 1024 only)

```
[ Book ][ Call ][ WhatsApp ][ Directions ]
```

Chalk, fixed, four equal targets 60px tall plus the safe area, one shadow above it. Book is marigold with a slate outline. Icon above label on every target.

## 6. Motion map

| What | Trigger | Moves | Time and easing |
|---|---|---|---|
| Opening curtain (GSAP) | first load in a session | slate curtain with the wordmark: comb line draws, letters leave upward, curtain lifts | 1.7s in all |
| Hero sequence (starter, GSAP) | as the curtain starts to lift | h1 lines rise, line and actions fade up, photo settles | starter values |
| Service band (starter, GSAP) | scroll | two lines slide 22% in opposite directions | tied to scroll |
| Visit photo drift (starter, GSAP) | scroll | image drifts 6% inside its frame | tied to scroll |
| Hero photo, gallery columns (GSAP) | scroll | the hero frame travels 7%; odd and even gallery photos travel 26px and 18px opposite ways | tied to scroll |
| Footer name (GSAP) | scroll, at the end of the page | "White Stone", very large, rises letter by letter | tied to scroll |
| Progress line | scroll | a slate line along the top edge grows left to right | tied to scroll |
| Headings (GSAP) | first time in view | rise line by line from behind a mask | 0.9s power3.out |
| Blocks, lists (GSAP) | first time in view | fade up 24 to 28px; list items follow one another 60ms apart | 0.7 to 0.8s power3.out |
| Comb leaders and rules | first time in view | draw from the left (scaleX) | 0.9 to 1.1s |
| Photo frames (GSAP) | first time in view | wipe open from the top edge (clip-path) | 1.1s power3.inOut |
| Smooth scrolling (Lenis) | mouse wheel, desktop only | the page eases to where the wheel sends it | lerp 0.12 |
| Header | scrolling down, scrolling up | slides out of the way, slides back | 320ms ease-out |
| Buttons, links, rows | mouse over | a lighter fill rises through a button; nav underline draws; a menu row's name shifts 6px | 220 to 320ms ease-out |
| "View" cursor | mouse over a gallery photo | a slate disc follows the pointer | 220ms in, 350ms follow |
| Buttons | press | scale 0.97 | 150ms ease-out |
| Phone menu | Menu, Close, Escape, a link | overlay wipes down with clip-path; content fades | 320ms ease-out; out 220ms |
| "Add" toggle | tap | the two faces ("Add" with a plus, "Added" with a tick) swap with opacity and scale 0.85 to 1; the slate fill fades | 150ms ease-out |
| Selected-services bar | first service added, last removed | slides up from the edge, opacity | 220ms ease-out |
| Service groups, questions | tap on the heading | height changes at once; content fades in; chevron turns | 150ms ease-out |
| Artist scroller | swipe, previous, next | native scroll with snap | browser |
| Gallery lightbox | tap a photo, Close, Escape | veil and photo fade, photo scales from 0.97 | 220ms ease-out |
| Lightbox photo change | previous, next, swipe, arrow keys | new photo fades in | 150ms ease-out |
| Field focus | focus | a slate bar draws under the field from the left (scaleX) | 220ms ease-out |
| Field error | blur, submit | message fades in and settles 4px | 150ms ease-out |
| Service chip in the form | add, remove | chip fades in from scale 0.9 | 150ms ease-out |
| Confirmation | valid submit | panel fades in and settles 8px | 220ms ease-out |
| Action bar | booking form on screen, field focus | slides down out of view and back | 220ms ease-out |

Everything a visitor operates is a CSS transition on transform, opacity or clip-path, and works without the library. Hover styles exist only under `(hover: hover) and (pointer: fine)`.

The reveals, the speeds and the smooth scrolling need the library, and their start states are set by the script alone. So when the library has not loaded, or the visitor prefers reduced motion, nothing is hidden and nothing moves: the page is complete and still. A reveal never uses `visibility` or `display`, so the keyboard and screen readers reach every control before it has been revealed.

This table replaced a much shorter one on 11 November 2026. The earlier rules are kept in section 9.

## 7. Icons

Inline SVG, drawn on a 24px grid, stroke 1.5px, round caps and joins, no fills. One sprite at the top of the body.

| Id | Drawing | Used in |
|---|---|---|
| `i-menu` | three lines | Menu button |
| `i-close` | cross | menu, lightbox, service chips |
| `i-calendar` | calendar | action bar Book |
| `i-phone` | handset | Call buttons, action bar |
| `i-chat` | speech bubble | WhatsApp in the action bar and on the send button |
| `i-pin` | map pin | directions |
| `i-plus` | plus | "Add" toggles, "Add a service" |
| `i-check` | tick | the "Added" state of every toggle |
| `i-down` | chevron down | groups, questions |
| `i-left`, `i-right` | chevrons | artist scroller, lightbox |
| `i-copy` | two sheets | "Copy the request" |
| `i-alert` | circle with exclamation mark | field errors |

## 8. Check against section 4, and what I changed

I read the first draft of this plan against the direction and the list of signs of a generated page. These were defaults, and this is what replaced them:

1. **Offers were three bordered, rounded cards in a row.** That is the card pattern the brief rules out. They are now slips on a pebble band, separated by plain rules, each with a flag tab.
2. **Combos were numbered 01 to 05.** They are not steps. The numbers are gone; a combo is a line in a ledger.
3. **The service band joined names with middle dots.** Replaced by three comb teeth, which also gives the comb a second appearance that is not decoration for its own sake.
4. **Section headings had a small all-caps label above them** ("OUR SERVICES" over "Services"). Removed. A heading stands alone.
5. **The hero was a full-bleed photo with centred white text over a dark gradient.** Now left-aligned text with the photo beside or below it; nothing is laid over the photograph.
6. **The header was translucent with a blur.** Now solid stone with a pebble line.
7. **Buttons ended in arrows** ("Book an appointment" with an arrow). Removed everywhere. Chevrons remain only on controls that move something sideways or open something.
8. **The reviews block was centred with five outlined stars.** Stars imply a rating we may not state. Now a left-aligned heading, sentence and link.
9. **Artist slots were rounded cards with shadows.** Now flat: a 2px-cornered portrait, then text, then the action.
10. **h3 inherited Marcellus from the starter base.** Section 4 limits Marcellus to the wordmark, h1 and h2, so h3 is Hanken Grotesk 500.
11. **Drift was planned on three photos** (visit plus two gallery photos). Two drifting tiles among eight still ones looked like a fault, so only the visit photo drifts.
12. **Service groups were closed on phones except the first.** A visitor wants to see what is offered without tapping, so all five are open on arrival and can be folded.
13. **Form errors were red text on slate,** which fails contrast. The form now lies on a chalk sheet, where the error colour reads clearly, and every error also carries an icon.

## 9. The change of 11 November 2026: from a quiet page to an animated one

The first build followed the motion rules below, which were then section 6 of `CLAUDE.md`. The owner looked at the result and asked for a richly animated site instead. `CLAUDE.md` was rewritten to match (rules 1.6 and 1.7, one line each in sections 3, 4 and 5, all of section 6, the JavaScript budget in section 8), and the motion layer in section 6 of this document was built.

What was added to the page:

- An opening curtain before the hero sequence.
- A second, outlined line in the service band, sliding the other way.
- Reveals on every section as it scrolls into view.
- Speeds: the hero photo and the gallery columns move at their own rates.
- The name, very large, rising at the end of the footer.
- A progress line, and a header that stays at the top at every width and steps aside on the way down.
- Smooth wheel scrolling on desktop (Lenis 1.3.27, one more script from jsDelivr).
- Mouse effects: button fills, a drawn nav underline, shifting menu rows, a "View" cursor in the gallery.
- A drawn stone surface (`site/assets/img/stone.svg`) inside every photo frame until the photo arrives.

What did not change: the content, the booking form and its logic, the colours and type, and the rule that the page must be complete without the library and still for visitors who prefer reduced motion.

### The earlier rules, as they stood

> The page moves in three ways and no others.
>
> 1. **One opening sequence** in the hero, once per browser session. The starter does it: put `data-intro="lines"` on the h1, `data-intro="fade"` on the supporting line and the actions, `data-intro="settle"` on the hero photo.
> 2. **Two effects tied directly to scrolling.** The service band (`data-slide="15"` on the line, inside a band that hides overflow). A slow drift on at most three photos below the hero (`data-drift="6"` on the `<img>`, inside its `.photo` frame).
> 3. **Everything a visitor operates answers with motion:** the menu overlay, "Add" toggles and the selected-services bar, collapsing groups, the artist scroller, the lightbox, the accordion, field focus and errors, the pressed state of buttons, the confirmation after sending, the action bar hiding and showing.
>
> **Never:** sections fading or sliding in as they scroll into view; a smooth-scrolling library; pinned or hijacked scrolling; carousels that move by themselves; a loading screen.

The other earlier rules that changed: rule 1.6 allowed only the three GSAP files; rule 1.7 listed part 4 of `site.js` as tested code not to be touched; section 8 capped the site's own JavaScript at 40 KB (now 60 KB).

## 10. The rebuild of 11 November 2026: Next.js, sample photos, a Styles section

Later the same day the owner asked for the site to be rebuilt in Next.js, built by Vercel, with photos from the internet and sections for women, men and children. `CLAUDE.md` was rewritten again to match.

### How the Next.js app is put together

Nothing can be run on the machine this was written on, so the app is arranged to carry as little untested code as possible:

- **The markup is React.** `app/page.jsx` lists the sections; `components/` draws them from the lists in `data/`. They are server components: the page is built once into plain HTML.
- **The styles are the same file.** `app/layout.jsx` imports `site/assets/css/site.css`, then `app/next.css` for the few rules only this build needs.
- **The behaviour is the same script.** `components/SiteScript.jsx`, the only client component, loads GSAP and Lenis from the installed packages, puts them where the script expects them, and runs `site/assets/js/site.js` unchanged. That script was tested in a browser in the plain-HTML version: every toggle, the booking form, the lightbox, the curtain and the reveals.
- **So the components must draw exactly the markup the script looks for.** Ids, classes and `data-` attributes are the contract between the two.

What Next.js adds: photos resized and served by the site itself (`next/image`), fonts served by the site itself (`next/font`), content edited in two data files instead of in the markup, and a real not-found page at any address.

What it costs: the site can no longer be opened from the disk, and a mistake shows up as a failed build on Vercel instead of a broken page.

### The Styles section

```
390                                  1280
Styles                               Styles
Point at one you like, or            Point at one you like, or bring a photo of your own.
bring a photo of your own.           --------------------------------------------------------
---------------------------          Women      ####  ####  ####  ####
Women                                           ####  ####  ####  ####
####  ####                                      Chin-length bob   Shoulder-length waves ...
####  ####                           --------------------------------------------------------
Chin-length bob   Shoulder-...       Men        ####  ####  ####  ####
####  ####                           --------------------------------------------------------
Long layers       Balayage           Children   ####  ####  ####  ####
---------------------------
Men ...
```

A ledger of three groups, like the combos: a label on the left, four tall photos with a caption under each. On phones the photos sit two by two under the label. It is placed between Combos and Artists and has its own link in the header. The captions describe the photos; they add no service and no price.

### Photos

Sample photos come only from Unsplash's free collection, each one opened and looked at before it was used, and each listed in `docs/PHOTO-CREDITS.md`. They fill the hero, the gallery and Styles. The hero frame and a note under each of the other two carry `data-todo`, because a site for a real salon must not launch with strangers standing in for its work. The artists and the shopfront keep the stone surface: a stranger must not be shown as staff, and another shop must not be shown as this one. The Children group carries `data-todo` of its own, since the salon has not yet said whether it cuts children's hair.

## 11. After the design review of 11 November 2026

The page was drawn at 375, 768, 1024 and 1280px wide and looked at section by section. The design held; seven things changed. Where this section disagrees with an earlier one (5.6, 5.9, 5.12, and the place of Styles in section 10), this section is the current plan.

1. **Search engines are asked to stay away until launch.** Vercel hides preview addresses from search engines, but not a project's main address. Until launch that page shows a real salon's name, address and phone beside placeholders and photos of strangers. `settings.listOnSearch` in `data/site.js` is `false` until launch day; while it is, every page carries a "noindex" instruction.

2. **Two views of the page.** `settings.workingView` in `data/site.js`.
   - `true`, the working view, is the page as it was: every empty slot is shown and every unconfirmed fact is outlined in red.
   - `false`, the presentation view, is for showing the salon. Offers, Artists and Questions leave out each entry still marked `todo: true`, because such an entry holds no content ("Offer title"); when none is left, the section and its header link are left out too. The "Preferred artist" field is left out when no artist is shown. Nothing is outlined in red, and an empty photo frame shows the stone surface without the words "Photo needed".
   - The marks stay in the code in both views, so nothing is forgotten. Combos and the Children group of Styles stay in both views: they are suggestions with real content, not empty slots.

3. **Styles moves up, to follow Services.** On a phone about four screens of text and buttons lay between the hero photo and the next photograph, and photographs do the selling. The order is now Services, Styles, Offers, Combos, Artists, Gallery. When Offers is left out (presentation view), Combos takes the comb rule, so that two plain sections do not run together.

4. **"Fountain Road" stays on one line in the headline.** It broke as "on Fountain / Road, Kharadi" at every width. The two words and their comma now sit in a span that does not wrap, and the headline reads "Hair, beard and / skin care on / Fountain Road, / Kharadi" on phones, tablets and desktops alike.
   - A span, not a non-breaking space. Tried in a browser: SplitText, which splits the headline into lines for the opening sequence, treats a non-breaking space as an ordinary one. The headline would rise with the old break and jump to the new one when the sequence handed it back. With the span, the lines are the same before, during and after.
   - Kept together, "Fountain Road," is 6.7em wide and "Hair, beard and" is 7em. At the old size they overflowed the text column at exactly 768 and 1024px, where the two-column hero is narrowest. So from 768px the headline is sized `clamp(2.75rem, 5.75vw, 4.5rem)`: 44px at 768, 59px at 1024, and the full 72px from 1252px. Below 768px the size is unchanged.

5. **Combos get the comb leader on wide screens.** From 1024px a leader runs from a combo's services to its button, where there was a wide empty gap. It is the site's own device, doing the job it already does in the services menu.

```
1280
Cut and beard         (Haircut) (Beard trimming) ||||||||||||||||||||||||||||  [ + Add combo to booking ]
Wash, cut and style   (Shampoo & conditioning) (Haircut) (Hairstyling) ||||||  [ + Add combo to booking ]
```

6. **Questions and Reviews.** On desktop the Questions list used the left 60% of the page and the rest stood empty. From 1024px the heading sits on the left and the list on the right, on the same 5 to 7 split as Booking, so the list lines up under the booking sheet. Reviews was a whole section holding one button. Until there are real quotes, the link to the Google reviews is a row in the fact sheet in Visit, and there is no Reviews section. It returns when quotes arrive.

```
1280
Questions                            ----------------------------------------------------
                                     Do you take walk-ins?                              v
                                     ----------------------------------------------------
                                     How can I pay?                                     v
```

7. **The hero photo on tablets.** At 768px the photo was 275px wide beside a 59px headline. From 768 to 1023px the text and the photo now share the row equally.

Checked against section 4 of `CLAUDE.md` and its list of signs of a generated page: no new colour, typeface, shadow or card; nothing centred; no label above a heading. The only device added is the comb, in the place it was made for.
