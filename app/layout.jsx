import { Marcellus, Hanken_Grotesk } from 'next/font/google';

// The same stylesheet the plain-HTML version uses, then the few rules only this build needs.
import '../site/assets/css/site.css';
import './next.css';

// Fonts are downloaded when the site is built and served from the site itself.
const display = Marcellus({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-marcellus' });
const text = Hanken_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--font-hanken' });

export const metadata = {
  title: 'White Stone Salon | Unisex salon in Kharadi, Pune',
  description:
    'Haircuts, beard trims, facials, waxing, threading and make-up at White Stone Salon on Fountain Road, Kharadi, Pune. Book on WhatsApp or call +91 90271 56238.'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F1F2EF'
};

// Start-up guard (tested in the plain-HTML version; keep its logic exactly).
// It runs before the page is painted. It hides the hero text for the opening sequence only when motion is
// allowed and the sequence has not played in this browser session, and it always un-hides the text after
// 2.5 seconds if the script or the animation library is slow.
const guard =
  "(function(){var d=document.documentElement;d.classList.add('js');" +
  "var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var seen=false;" +
  "try{seen=sessionStorage.getItem('ws-intro')==='1';}catch(e){}" +
  "if(!reduce&&!seen){d.classList.add('intro-pending');" +
  "window.__introTimer=setTimeout(function(){d.classList.remove('intro-pending');window.__introSkipped=true;},2500);}})();";

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: the guard adds classes to <html> before React starts, which is intended.
    <html lang="en-IN" className={display.variable + ' ' + text.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: guard }} />
      </head>
      <body id="top">{children}</body>
    </html>
  );
}
