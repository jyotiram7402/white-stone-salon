# Photos the website needs

Twenty-five photos. These are the single biggest thing still missing from the site.

**What is on the site now.** The hero, the gallery and the Styles section show 21 sample photos from Unsplash. They are other people and other salons, there only so the design can be judged, and each of those sections has a red-outlined mark saying so. The three artist portraits and the shopfront show a drawn stone surface and the words "Photo needed": no sample is used there, because a stranger is not staff and another shop is not this one. The samples are listed in `docs/PHOTO-CREDITS.md`.

## How to supply them

1. Use only photos the salon owns or has permission to use. No stock photos, no pictures from the internet.
2. Ask anyone who can be recognised in a photo (staff, customer, child's parent) whether they agree to be on the website.
3. Save each photo as a JPEG at quality about 75, at exactly the pixel size below, with exactly the file name below (small letters, `.jpg`).
4. Put the files in `public/photos/`.
5. In `data/photos.js`, point each photo's entry at its file and describe it. For example:

```
src: '/photos/hero.jpg',
alt: 'Two stylists at work at the mirrors in White Stone Salon',
```

   For the gallery and the styles, the entry is written with a helper; replace the whole entry with one in this shape:

```
{ slot: 'gallery-1', src: '/photos/gallery-1.jpg', width: 900, height: 1125, alt: 'A finished balayage, seen from behind' },
```

6. When a section has only the salon's own photos, remove its red-outlined note (the `data-todo` in `components/Sections.jsx`, or `isSample: true` on the hero).
7. When no sample is left, delete the `remotePatterns` setting in `next.config.mjs`.

## The slots

| File | Pixels (width x height) | Shape | Largest size | What it should show | Where it appears |
|---|---|---|---|---|---|
| `hero.jpg` | 1200 x 1500 | tall, 4:5 | 220 KB | The salon inside, or an artist at work | Top of the page |
| `artist-1.jpg` to `artist-3.jpg` | 800 x 1000 | tall, 4:5 | 120 KB | A portrait of each hair artist | Artists |
| `gallery-1.jpg` to `gallery-8.jpg` | 900 x 1125 | tall, 4:5 | 140 KB | Finished hair, beard or skin work, or a detail of the room | Gallery |
| `style-women-1.jpg` to `style-women-4.jpg` | 800 x 1000 | tall, 4:5 | 120 KB | One finished cut each | Styles, Women |
| `style-men-1.jpg` to `style-men-4.jpg` | 800 x 1000 | tall, 4:5 | 120 KB | One finished cut each | Styles, Men |
| `style-children-1.jpg` to `style-children-4.jpg` | 800 x 1000 | tall, 4:5 | 120 KB | One finished cut each | Styles, Children |
| `visit.jpg` | 1200 x 800 | wide, 3:2 | 160 KB | The shopfront as seen from Fountain Road | Visit |

## Advice on choosing

- **Hero.** This is the first thing a visitor sees and the largest file. Pick the photo that looks most like walking in. Keep the subject in the middle third: the frame crops a little at the sides on wide screens.
- **Artists.** Head and shoulders, the face in the upper half of the frame, a plain background if possible. The same framing for every artist looks best.
- **Gallery.** A mix sells better than eight of the same thing: for example three haircuts or styles, two beards, one facial or make-up result, two details of the room. Review topics on Google mention beard work and head massage, so a photo of each is worth having. The gallery shows them in number order.
- **Styles.** One clear cut per photo, the hair filling most of the frame, a plain background. Give each a short name ("Chin-length bob") to go under it. Four per group looks best; a group can have fewer.
- **Visit.** Taken from the road, in daylight, with the sign readable. This is how people recognise the shop when they arrive.
- **The visit photo moves slightly** inside its frame as the page scrolls, so about 7% at the top and bottom can be cut off. Keep the sign away from the very top edge.
- **Every frame wipes open from its top edge** the first time it scrolls into view, and gallery, style and artist photos grow by 5% under a mouse. Keep faces and anything important away from the outer 5% of each photo.

## More artists

The page has three artist slots and works with two to six. For a fourth artist, add `artist-4.jpg` (800 x 1000), then add an entry with `id: 4` to `artists` in `data/site.js` and to `artistPhotos` in `data/photos.js`.
