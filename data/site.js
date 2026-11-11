// Everything the page says about the business, in one place.
// Facts here are the confirmed ones from CLAUDE.md section 2. Anything unconfirmed is marked `todo: true`
// (or carries data-todo in the component) and shows with a red dashed outline until the owner confirms it.

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

// Header, phone menu and footer.
export const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#offers', label: 'Offers' },
  { href: '#styles', label: 'Styles' },
  { href: '#artists', label: 'Artists' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#visit', label: 'Visit' }
];

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
export const combos = [
  { id: 1, name: 'Cut and beard', services: ['Haircut', 'Beard trimming'], todo: true },
  { id: 2, name: 'Wash, cut and style', services: ['Shampoo & conditioning', 'Haircut', 'Hairstyling'], todo: true },
  { id: 3, name: 'Facial and threading', services: ['Facials', 'Eyebrow threading'], todo: true },
  { id: 4, name: 'Occasion ready', services: ['Make-up', 'Hairstyling'], todo: true },
  { id: 5, name: 'Feet and shoulders', services: ['Pedicure', 'Massage'], todo: true }
];

// Hair artists: three empty slots. The layout works for two to six. Photos are set in data/photos.js.
export const artists = [
  { id: 1, name: 'Artist name', role: 'Speciality' },
  { id: 2, name: 'Artist name', role: 'Speciality' },
  { id: 3, name: 'Artist name', role: 'Speciality' }
];

// Questions: every answer is still to come from the salon.
export const pendingAnswer = 'The salon has not given this answer yet. Call +91 90271 56238 to ask.';
export const questions = [
  { q: 'Do you take walk-ins?', a: pendingAnswer, todo: true },
  { q: 'How can I pay?', a: pendingAnswer, todo: true },
  { q: 'Is there parking?', a: pendingAnswer, todo: true },
  { q: 'Do you cut children’s hair?', a: pendingAnswer, todo: true },
  { q: 'Can I change or cancel a booking?', a: pendingAnswer, todo: true }
];

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
