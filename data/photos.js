// Every photo on the page.
//
// RIGHT NOW these are SAMPLE photos from Unsplash (free licence, commercial use allowed, see docs/PHOTO-CREDITS.md).
// They show other people and other salons. They are stand-ins so the design can be judged, and they must be
// replaced with the salon's own photos before launch.
//
// To use one of the salon's own photos:
//   1. put the file in public/photos/ (names and sizes are in docs/PHOTOS.md);
//   2. change that entry's src to the local path, for example  src: '/photos/hero.jpg';
//   3. rewrite its alt to say what the photo shows.
//
// An entry with  src: null  shows the stone surface and "Photo needed" instead of a picture.

// One Unsplash photo, cropped to the frame. w and h are the largest size the page will ever ask for.
function sample(id, w, h) {
  return 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&crop=faces,entropy&w=' + w + '&h=' + h + '&q=80';
}

export const hero = {
  slot: 'hero',
  src: sample('1781450090585-1a511b7066d9', 1200, 1500),
  width: 1200,
  height: 1500,
  alt: 'A bright salon with arched mirrors, grey chairs and a wooden floor',
  by: 'Barney Goodman',
  isSample: true
};

// The shopfront. No sample here on purpose: a picture of some other shop would send people to the wrong door.
export const visit = {
  slot: 'visit',
  src: null,
  width: 1200,
  height: 800,
  alt: 'The White Stone Salon shopfront on Fountain Road'
};

// Hair artists. No samples here on purpose: a stranger's face must never be shown as one of the salon's staff.
export const artistPhotos = {
  1: { slot: 'artist-1', src: null, width: 800, height: 1000, alt: 'Portrait of a hair artist at White Stone Salon' },
  2: { slot: 'artist-2', src: null, width: 800, height: 1000, alt: 'Portrait of a hair artist at White Stone Salon' },
  3: { slot: 'artist-3', src: null, width: 800, height: 1000, alt: 'Portrait of a hair artist at White Stone Salon' }
};

// Gallery: eight photos, shown in this order.
export const gallery = [
  { slot: 'gallery-1', id: '1700760934268-8aa0ef52ce0a', alt: 'A stylist cutting a woman’s dark hair with scissors and a comb', by: 'Farhad Ibrahimzade' },
  { slot: 'gallery-2', id: '1599011176306-4a96f1516d4d', alt: 'A barber trimming a man’s beard with scissors', by: 'Mr Shave' },
  { slot: 'gallery-3', id: '1629397685944-7073f5589754', alt: 'A stylist curling a client’s long hair with a curling iron', by: 'Giorgio Trovato' },
  { slot: 'gallery-4', id: '1741934023052-26baf5535088', alt: 'A woman having a facial massage with her eyes closed', by: 'Ionela Mat' },
  { slot: 'gallery-5', id: '1761931403667-a6753db21f32', alt: 'A barber combing and styling the back of a man’s hair', by: 'Josh Marty' },
  { slot: 'gallery-6', id: '1638628064365-f08ad0ec8245', alt: 'A make-up artist doing a bride’s eye make-up', by: 'Ashim Das' },
  { slot: 'gallery-7', id: '1638064432648-bc2f9a91b06b', alt: 'A stylist finishing a client’s long waves in a salon chair', by: 'Ramón Benitez' },
  { slot: 'gallery-8', id: '1787651344170-c2f81514934d', alt: 'A black pedicure chair beside a white foot bath', by: 'Mayur Roxan' }
].map(function (p) {
  return { slot: p.slot, src: sample(p.id, 900, 1125), width: 900, height: 1125, alt: p.alt, by: p.by, isSample: true };
});

// Styles: example cuts in three groups. The children's group is unconfirmed: the salon has not yet said
// whether it cuts children's hair (it is also one of the open questions).
function look(slot, id, caption, alt, by) {
  return { slot: slot, src: sample(id, 800, 1000), width: 800, height: 1000, caption: caption, alt: alt, by: by, isSample: true };
}

export const styles = [
  {
    key: 'women',
    title: 'Women',
    looks: [
      look('style-women-1', '1519713594620-c57c92a493c0', 'Chin-length bob', 'A woman in profile with a chin-length copper bob', 'Hàn Vi Phạm Thị'),
      look('style-women-2', '1682450285233-1fb10d4a4616', 'Shoulder-length waves', 'A shoulder-length wavy cut seen from behind', 'Crystal Clark'),
      look('style-women-3', '1554519934-e32b1629d9ee', 'Long layers', 'Long blonde layered hair seen from behind', 'Jessie Dee Dabrowski'),
      look('style-women-4', '1605980766335-d3a41c7332a1', 'Balayage', 'Wavy hair with ash-blonde balayage seen from behind', 'Lera Kogan')
    ]
  },
  {
    key: 'men',
    title: 'Men',
    looks: [
      look('style-men-1', '1593702275687-f8b402bf1fb5', 'Fade, longer on top', 'A man in profile with a faded cut, longer on top, and a beard', 'Michael DeMoya'),
      look('style-men-2', '1630827020718-3433092696e7', 'Short sides, full beard', 'A man in profile with short sides, a styled top and a full beard', 'Ahmad Ebadi'),
      look('style-men-3', '1567894340315-735d7c361db0', 'Curls on top', 'A barber cutting a man’s hair with the curls left on top', 'Obi'),
      look('style-men-4', '1635273051937-a0ddef9573b6', 'Scissor cut', 'A barber in a hat giving a man a scissor cut', 'Salah Regouane')
    ]
  },
  {
    key: 'children',
    title: 'Children',
    todo: true,
    looks: [
      look('style-children-1', '1704072650662-76df3af134a7', 'Short and neat', 'A boy in a barber’s cape with a short, neat cut', 'Ibrahim guetar'),
      look('style-children-2', '1521490683712-35a1cb235d1c', 'Side parting', 'A boy in a barber’s chair with a combed side parting, in black and white', 'Tommy van Kessel'),
      look('style-children-3', '1673865641132-d4302e15f8d4', 'Braids', 'A smiling girl with her hair in braids', 'Bermix Studio'),
      look('style-children-4', '1751980105043-2bf9dadd80a3', 'Ponytail', 'A girl with a low ponytail and hair clips, seen from the side', 'Zhang Shining')
    ]
  }
];
