# Content still needed from the owner

Every item below is unconfirmed. On the page, each one is marked with the attribute `data-todo`, which draws a red dashed outline round it. **None may remain at launch.**

To find them all, search the project for `data-todo` (in `components/`) and for `todo: true` (in `data/`). When an item is confirmed, put the real content in and remove its mark.

## A. Marked on the page

| # | Missing | Where it shows | What is there now | What the owner must send |
|---|---|---|---|---|
| 1 | Opening time and weekly hours | Hero line; Visit, "Hours" | "Open till 10:30 pm" (closing time is from the Google listing, November 2026) | Opening and closing time for each day of the week, and any weekly day off |
| 2 | Hours used for booking times | Booking form, "Time" field | Times every 30 minutes from 10:00 to 10:00 pm, from `bookingOpen` and `bookingClose` in `data/site.js`. 10:00 is a guess. | The earliest and latest time an appointment can start. If hours differ by day, say so: the form uses one set of hours for every day |
| 3 | Prices | Services, the line under the menu | "Prices on request". Each service row has an empty price slot | A price, or a "from" price, for each of the 15 services |
| 4 | Offers | Offers, three slots | "Offer title", "What it includes", "Valid till" | For each current offer: its name, exactly what it includes, the price or saving, and the last date it is valid. Fewer than three is fine |
| 5 | Combos | Combos, five lines | Five suggested groupings without prices | Whether the salon sells each of these as a combo, the name it wants, the services in it, and the price |
| 6 | Hair artists | Artists, three slots | "Artist name", "Speciality", an empty portrait frame | For each artist: name as it should appear, what they are best at in a few words, a portrait, and their agreement to be shown. Two to six artists |
| 7 | Google Maps link | "Get directions" in Visit; "Directions" in the bottom bar; "Read our reviews on Google" in Reviews | A Google Maps search link for the salon's name and road | The salon's own share link from Google Maps (open the listing, Share, Copy link). If Google gives a separate link for reviews, send that too |
| 8 | WhatsApp number | "WhatsApp" in the bottom bar. Also used, unmarked, by the booking form and "Open WhatsApp again" | +91 90271 56238, assumed to be on WhatsApp | Confirmation that this number receives WhatsApp messages, or the number that does |
| 9 | Answers to questions | Questions, five answers | "The salon has not given this answer yet." | Answers to: Do you take walk-ins? How can I pay? Is there parking? Do you cut children's hair? Can I change or cancel a booking? |
| 10 | The salon's own photos | The hero photo; the note under the Gallery; the note under Styles | 21 sample photos from Unsplash showing other people and other salons (`docs/PHOTO-CREDITS.md`) | The photos in `docs/PHOTOS.md` |
| 11 | Whether the salon cuts children's hair | The "Children" group in Styles | Four sample photos of children's cuts | A yes or no. If no, the group is deleted. It is the same question as in item 9 |

There are 34 marks on the page:
hero hours 1, hero photo 1, prices line 1, offers 3, combos 5, Styles 2 (the Children group and the sample-photo note), artists 9 (name, speciality and photo frame in each of three slots), Gallery sample-photo note 1, reviews link 1, booking time field 1, visit hours 1, "Get directions" 1, bottom bar 2 (WhatsApp, Directions), answers 5.

## B. Not marked on the page, but still needed

| # | Missing | Why it is not on the page | What the owner must send |
|---|---|---|---|
| 12 | Rating and reviews | Two Google screenshots disagree (4.4 from 172 reviews; 5.0 from 50), so the page shows no number and no quotes | The current rating and review count from the live listing, and three to five reviews the salon would like quoted, with each reviewer's permission |
| 13 | The names of the cuts in Styles | The captions ("Chin-length bob", "Fade, longer on top") describe the sample photos. They are not the salon's own list | The cuts the salon wants to show, each with its photo |
| 14 | Photo descriptions | Each photo's `alt` in `data/photos.js` describes the sample that is there now | For each of the salon's own photos, one line saying what it shows |
| 15 | Logo | The name is set as a wordmark in Marcellus; the icon is the letters WS | The salon's logo file, if it has one and wants it used |
| 16 | Social links | Left out | Instagram, Facebook or other page addresses, if any |
| 17 | Website address | Left out. No canonical tag, no Open Graph URL, no sitemap | The domain the site will live on |

## C. Where the numbers are written

- **Phone and WhatsApp:** `business` at the top of `data/site.js` (`phoneDisplay`, `phoneHref`, `whatsapp`, `whatsappHref`), the JSON-LD block at the bottom of the same file, and the page description in `app/layout.jsx`. `pendingAnswer` in `data/site.js` also quotes the phone number.
- **A fallback:** `site/assets/js/site.js` holds `'919027156238'` once, used only if the form ever loses its `data-whatsapp` attribute.
- **The earlier plain-HTML version** in `site/` has its own copies. It is not published.
