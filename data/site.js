// Everything the page says about the business, in one place.
// Facts here are the confirmed ones from CLAUDE.md section 2. Anything unconfirmed is marked `todo: true`
// (or carries data-todo in the component) and, in the working view, shows with a red dashed outline
// until the owner confirms it.

export const business = {
  name: 'White Stone Salon',
  phoneDisplay: '+91 90271 56238',
  phoneHref: 'tel:+919027156238',
  whatsapp: '919027156238',                 // country code and number, digits only
  whatsappHref: 'https://wa.me/919027156238',
  address: 'Shop No. 13, Xenia Society, Fountain Road, opp. Cheryl Society, Downtown, Kharadi, Pune, Maharashtra 411014',
  landmark: 'Opposite Cheryl Society',
  plusCode: 'HW6V+7R Pune, Maharashtra',
  hours: 'Open till 10:30 pm',              // unconfirmed beyond the closing time
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=White%20Stone%20Unisex%20Salon%2C%20Fountain%20Road%2C%20Kharadi%2C%20Pune%20411014',
  bookingOpen: '10:00',                     // a guess until the owner confirms hours
  bookingClose: '22:30'
};

// How the site is shown while it is being finished. Two switches; each is  true  or  false.
export const settings = {
  // workingView
  //   false  The presentation view, for showing the salon. Offers, Artists and Questions leave out every
  //          entry still marked  todo: true  (such an entry holds no content yet), and a section with
  //          nothing left is left out, together with its link in the header. Nothing is outlined in red.
  //   true   The working view. Every empty slot is shown and every unconfirmed fact is outlined in red.
  //          Use it to see what the salon still has to send. docs/CONTENT-TODO.md lists the same things.
  workingView: false,

  // listOnSearch
  //   false  Until launch: every page asks Google and other search engines not to list the site.
  //   true   On launch day, when nothing unconfirmed is left.
  listOnSearch: false
};

// The services menu: two columns of groups. Names are exactly the owner's. Each name is also what
// goes into the booking request, so a combo below must spell its services the same way.
export const serviceColumns = [
  [
    { name: 'Hair', services: ['Haircut', 'Hairstyling', 'Balayage', 'Shampoo & conditioning'] },
    { name: 'Beard and shave', services: ['Beard trimming', 'Shaving'] },
    { name: 'Feet and massage', services: ['Pedicure', 'Massage'] }
  ],
  [
    { name: 'Skin and make-up', services: ['Facials', 'Make-up'] },
    { name: 'Waxing and threading', services: ['Waxing', 'Body waxing', 'Brazilian waxing', 'Eyebrow threading', 'Hair threading'] }
  ]
];

// Prices. Empty until the owner sends them: the page then shows no numbers and the line "Prices on request".
// To add one, write the service name exactly as above and the price as it should read, for example
//   'Haircut': 'Rs 000',
// When every price is in, delete the "Prices on request" line in components/Sections.jsx.
export const prices = {};

// The sliding band under the hero: the fifteen names twice, in two orders.
export const bandLines = [
  ['Haircut', 'Hairstyling', 'Balayage', 'Shampoo & conditioning', 'Beard trimming', 'Shaving', 'Pedicure', 'Massage', 'Facials', 'Make-up', 'Waxing', 'Body waxing', 'Brazilian waxing', 'Eyebrow threading', 'Hair threading'],
  ['Massage', 'Beard trimming', 'Facials', 'Eyebrow threading', 'Haircut', 'Pedicure', 'Make-up', 'Balayage', 'Shaving', 'Waxing', 'Hairstyling', 'Hair threading', 'Body waxing', 'Shampoo & conditioning', 'Brazilian waxing']
];

// Offers: placeholders until the owner sends real ones. To show fewer, delete an entry.
// When an offer is real, fill it in and delete its  todo: true.
export const offers = [
  { id: 1, title: 'Offer title', what: 'What it includes', till: 'Valid till', todo: true },
  { id: 2, title: 'Offer title', what: 'What it includes', till: 'Valid till', todo: true },
  { id: 3, title: 'Offer title', what: 'What it includes', till: 'Valid till', todo: true }
];

// Combos: suggested groupings, no prices. When the salon confirms one, delete its  todo: true.
// A combo is shown in both views, because even an unconfirmed one lists real services.
export const combos = [
  { id: 1, name: 'Cut and beard', services: ['Haircut', 'Beard trimming'], todo: true },
  { id: 2, name: 'Wash, cut and style', services: ['Shampoo & conditioning', 'Haircut', 'Hairstyling'], todo: true },
  { id: 3, name: 'Facial and threading', services: ['Facials', 'Eyebrow threading'], todo: true },
  { id: 4, name: 'Occasion ready', services: ['Make-up', 'Hairstyling'], todo: true },
  { id: 5, name: 'Feet and shoulders', services: ['Pedicure', 'Massage'], todo: true }
];

// Hair artists: three empty slots. The layout works for two to six. Photos are set in data/photos.js,
// under the same id. When an artist is real, fill in the name and speciality and delete its  todo: true.
export const artists = [
  { id: 1, name: 'Artist name', role: 'Speciality', todo: true },
  { id: 2, name: 'Artist name', role: 'Speciality', todo: true },
  { id: 3, name: 'Artist name', role: 'Speciality', todo: true }
];

// Questions: every answer is still to come from the salon.
// When an answer is real, put it in place of  pendingAnswer  and delete its  todo: true.
export const pendingAnswer = 'The salon has not given this answer yet. Call +91 90271 56238 to ask.';
export const questions = [
  { q: 'Do you take walk-ins?', a: pendingAnswer, todo: true },
  { q: 'How can I pay?', a: pendingAnswer, todo: true },
  { q: 'Is there parking?', a: pendingAnswer, todo: true },
  { q: 'Do you cut children’s hair?', a: pendingAnswer, todo: true },
  { q: 'Can I change or cancel a booking?', a: pendingAnswer, todo: true }
];

// What a list shows now. In the presentation view an entry still marked  todo: true  is left out.
// Used for Offers, Artists and Questions only, whose unconfirmed entries are empty slots.
export function shown(list) {
  return settings.workingView ? list : list.filter((item) => !item.todo);
}

// Which of those three sections have something to show.
export const has = {
  offers: shown(offers).length > 0,
  artists: shown(artists).length > 0,
  questions: shown(questions).length > 0
};

// Header, phone menu and footer, in the order of the page. A link to a section that is left out is left out too.
export const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#styles', label: 'Styles' },
  { href: '#offers', label: 'Offers', show: has.offers },
  { href: '#artists', label: 'Artists', show: has.artists },
  { href: '#gallery', label: 'Gallery' },
  { href: '#visit', label: 'Visit' }
].filter((link) => link.show !== false);

// For search engines: name, address and telephone only. Add hours and rating when confirmed.
export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  name: 'White Stone Salon',
  telephone: '+919027156238',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop No. 13, Xenia Society, Fountain Road, opp. Cheryl Society, Downtown, Kharadi',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    postalCode: '411014',
    addressCountry: 'IN'
  }
};
