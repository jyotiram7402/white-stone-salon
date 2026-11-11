'use client';

import { useEffect } from 'react';

// Starts the page's behaviour and motion once React has drawn the page.
//
// All of it lives in site/assets/js/site.js: the menu, the "Add" toggles, the booking form, the lightbox,
// the opening curtain, the scroll reveals. That script was tested in a browser as plain JavaScript, so it is
// used here unchanged. It expects the animation libraries as window.gsap, window.ScrollTrigger,
// window.SplitText and window.Lenis; this component loads them from the installed packages and puts them there.
//
// The page is complete without any of this. If a library fails to load, the script still runs and simply
// leaves the motion out.
export default function SiteScript() {
  useEffect(() => {
    if (window.__wsStarted) return;   // React may run an effect twice in development
    window.__wsStarted = true;

    (async () => {
      try {
        const [core, scroll, split, lenis] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
          import('gsap/SplitText'),
          import('lenis')
        ]);
        window.gsap = core.gsap || core.default;
        window.ScrollTrigger = scroll.ScrollTrigger || scroll.default;
        window.SplitText = split.SplitText || split.default;
        window.Lenis = lenis.default || lenis.Lenis;
      } catch (error) {
        // No libraries: site.js notices and shows everything at once.
      }

      try {
        await import('../site/assets/js/site.js');
      } catch (error) {
        // Last resort: never leave the hero text hidden behind the opening sequence.
        clearTimeout(window.__introTimer);
        document.documentElement.classList.remove('intro-pending', 'curtain-on');
      }
    })();
  }, []);

  return null;
}
