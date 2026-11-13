/* White Stone Salon: site script.
   A classic script (no modules), loaded with defer after the three GSAP files.

   Parts 1 and 2 are the tested starter. Keep their logic and their order.
   Part 3 is where the page's features are built: plain DOM code that needs no library.
   Part 4 is the motion. It began as tested starter code (opening sequence, scroll-linked effects)
   and was extended on 11 November 2026 (curtain, reveals, smooth scrolling). Its safety net stays:
   with no library, or for a visitor who prefers reduced motion, nothing is hidden and nothing moves. */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- 1. Helpers (tested) ---------- */

  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  // "090271 56238", "+91 90271 56238", "9027156238" -> "9027156238". Anything else -> null.
  function normaliseMobile(raw) {
    var d = String(raw == null ? '' : raw).replace(/\D/g, '').replace(/^0+/, '');
    if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2);
    return /^[6-9]\d{9}$/.test(d) ? d : null;
  }

  // "9027156238" -> "+91 90271 56238"
  function formatMobile(d) { return '+91 ' + d.slice(0, 5) + ' ' + d.slice(5); }

  // Today's local date as YYYY-MM-DD, moved by a number of days.
  function isoDate(offsetDays) {
    var t = new Date();
    t.setDate(t.getDate() + (offsetDays || 0));
    return t.getFullYear() + '-' + pad2(t.getMonth() + 1) + '-' + pad2(t.getDate());
  }

  // "2026-11-14" -> "Sat 14 Nov 2026"
  function formatDate(iso) {
    var p = String(iso).split('-');
    var t = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    return DAYS[t.getDay()] + ' ' + t.getDate() + ' ' + MONTHS[t.getMonth()] + ' ' + t.getFullYear();
  }

  // "18:30" -> "6:30 pm"
  function formatTime(hhmm) {
    var p = String(hhmm).split(':');
    var h = Number(p[0]);
    var m = Number(p[1]);
    return (h % 12 === 0 ? 12 : h % 12) + ':' + pad2(m) + ' ' + (h >= 12 ? 'pm' : 'am');
  }

  // Start times from opening until (closing minus lastGapMin), every stepMin minutes.
  // Pass notBefore ("HH:MM") to drop times that have already passed today.
  function timeSlots(open, close, stepMin, lastGapMin, notBefore) {
    function mins(s) { var p = String(s).split(':'); return Number(p[0]) * 60 + Number(p[1]); }
    var out = [];
    var last = mins(close) - (lastGapMin || 0);
    var floor = notBefore ? mins(notBefore) : -1;
    for (var t = mins(open); t <= last; t += stepMin) {
      if (t <= floor) continue;
      var v = pad2(Math.floor(t / 60)) + ':' + pad2(t % 60);
      out.push({ value: v, label: formatTime(v) });
    }
    return out;
  }

  // number: digits only, with country code, for example "919027156238".
  // lines: the message, one array item per line.
  function whatsappUrl(number, lines) {
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  window.WS = {
    normaliseMobile: normaliseMobile,
    formatMobile: formatMobile,
    isoDate: isoDate,
    formatDate: formatDate,
    formatTime: formatTime,
    timeSlots: timeSlots,
    whatsappUrl: whatsappUrl
  };

  /* ---------- 2. Missing photos (tested) ---------- */
  // Markup: <figure class="photo" data-slot="hero"><img data-photo src="assets/photos/hero.jpg" ...></figure>
  // If the file is not there, the broken image is removed and the frame names the slot.

  function markMissingPhotos() {
    var imgs = document.querySelectorAll('img[data-photo]');
    Array.prototype.forEach.call(imgs, function (img) {
      function missing() {
        var frame = img.closest('.photo');
        if (frame) frame.classList.add('is-missing');
        if (img.parentNode) img.parentNode.removeChild(img);
      }
      if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) missing();
      else img.addEventListener('error', missing, { once: true });
    });
  }
  markMissingPhotos();

  /* ---------- 3. Features (build here) ---------- */
  // Everything in this part must work when the animation library has not loaded.
  // Use plain DOM code, and CSS transitions for movement that answers a tap or click.
  // See CLAUDE.md sections 5 to 7 for the list: menu, service selection, offers and combos,
  // artists scroller, gallery lightbox, questions accordion, booking form, action bar.

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function on(el, type, fn, opts) { if (el) el.addEventListener(type, fn, opts || false); }

  // Each feature runs on its own, so a fault in one cannot stop the others or part 4.
  function safely(fn) {
    try { fn(); } catch (e) { if (window.console && console.error) console.error(e); }
  }

  // Reading a computed style makes the browser settle the current state,
  // so the class added next starts a CSS transition instead of jumping.
  function settle(el) { return window.getComputedStyle(el).opacity; }

  function watch(mq, fn) {
    if (mq.addEventListener) mq.addEventListener('change', fn);
    else if (mq.addListener) mq.addListener(fn);   // Safari 13 and older
  }

  function iconHtml(name) {
    return '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  }

  var wide = window.matchMedia('(min-width: 64em)');   // the desktop layout
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // The smooth-scrolling instance on desktop, when there is one. Part 4 creates it.
  var smoother = null;

  // Stops the page behind an overlay from scrolling, without a sideways jump where scrollbars take space.
  function lockScroll(lock) {
    var gap = lock ? window.innerWidth - root.clientWidth : 0;
    root.classList.toggle('is-locked', lock);
    document.body.style.paddingRight = gap > 0 ? gap + 'px' : '';
    if (smoother) { if (lock) smoother.stop(); else smoother.start(); }
  }

  // Spoken updates for screen readers.
  var live = $('#live');
  function say(text) {
    if (!live) return;
    live.textContent = '';
    setTimeout(function () { live.textContent = text; }, 60);
  }

  /* 3.1 Phone menu: full screen, traps focus, closes on Escape, a link, or the Close button */
  safely(function () {
    var menu = $('#site-menu');
    var openBtn = $('#menu-open');
    var closeBtn = $('#menu-close');
    if (!menu || !openBtn || !closeBtn) return;

    var isOpen = false;
    var others = [];
    var hideTimer;

    function openMenu() {
      if (isOpen) return;
      isOpen = true;
      clearTimeout(hideTimer);
      menu.hidden = false;
      lockScroll(true);
      openBtn.setAttribute('aria-expanded', 'true');
      // Where the browser supports "inert", the rest of the page cannot be reached at all.
      others = $all('body > *').filter(function (el) { return el !== menu && el.tagName !== 'SCRIPT'; });
      others.forEach(function (el) { el.setAttribute('inert', ''); });
      settle(menu);
      menu.classList.add('is-open');
      closeBtn.focus();
    }

    function closeMenu(returnFocus) {
      if (!isOpen) return;
      isOpen = false;
      menu.classList.remove('is-open');
      lockScroll(false);
      openBtn.setAttribute('aria-expanded', 'false');
      others.forEach(function (el) { el.removeAttribute('inert'); });
      if (returnFocus) openBtn.focus();
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () { menu.hidden = true; }, 240);   // after the 220ms wipe
    }

    on(openBtn, 'click', openMenu);
    on(closeBtn, 'click', function () { closeMenu(true); });
    on(menu, 'click', function (e) {
      if (e.target.closest('a')) closeMenu(false);   // the link then moves the page itself
    });

    on(document, 'keydown', function (e) {
      if (!isOpen) return;
      if (e.key === 'Escape' || e.key === 'Esc') { e.preventDefault(); closeMenu(true); return; }
      if (e.key !== 'Tab') return;
      var items = $all('a[href], button:not([disabled])', menu);
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      var now = document.activeElement;
      if (e.shiftKey && (now === first || !menu.contains(now))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (now === last || !menu.contains(now))) { e.preventDefault(); first.focus(); }
    });

    watch(wide, function () { if (wide.matches) closeMenu(false); });
  });

  /* 3.2 Service groups and questions: <details>. Height changes at once; the content fades in. */
  safely(function () {
    $all('details').forEach(function (d) {
      var sum = $('summary', d);
      var panel = $('[data-panel]', d);
      on(sum, 'click', function (e) {
        if (d.classList.contains('group') && wide.matches) { e.preventDefault(); return; }   // groups stay open on desktop
        if (d.open || !panel) return;
        d.classList.add('is-opening');          // content starts transparent
        requestAnimationFrame(function () {     // by now the browser has opened it
          settle(panel);
          d.classList.remove('is-opening');     // and it fades in
        });
      });
    });

    function syncGroups() {
      $all('details.group').forEach(function (d) {
        var sum = $('summary', d);
        if (!sum) return;
        if (wide.matches) {
          d.open = true;
          sum.setAttribute('tabindex', '-1');        // not a control at this width
          sum.setAttribute('aria-disabled', 'true');
        } else {
          sum.removeAttribute('tabindex');
          sum.removeAttribute('aria-disabled');
        }
      });
    }
    syncGroups();
    watch(wide, syncGroups);
  });

  /* 3.3 Artists scroller: previous and next buttons (shown on desktop) */
  safely(function () {
    var track = $('#artists-track');
    var prev = $('#artists-prev');
    var next = $('#artists-next');
    if (!track || !prev || !next) return;

    function step() {
      var card = track.firstElementChild;
      if (!card) return track.clientWidth;
      var gap = parseFloat(window.getComputedStyle(track).columnGap) || 16;
      return card.getBoundingClientRect().width + gap;
    }

    function sync() {
      var max = track.scrollWidth - track.clientWidth;
      var atStart = track.scrollLeft <= 2;
      var atEnd = track.scrollLeft >= max - 2;
      // Never leave keyboard focus on a button that is about to be disabled.
      if (atStart && !atEnd && document.activeElement === prev) next.focus();
      if (atEnd && !atStart && document.activeElement === next) prev.focus();
      prev.disabled = atStart;
      next.disabled = atEnd;
    }

    function go(dir) {
      var left = track.scrollLeft + dir * step();
      try { track.scrollTo({ left: left, behavior: reduceMotion.matches ? 'auto' : 'smooth' }); }
      catch (e) { track.scrollLeft = left; }
    }

    on(prev, 'click', function () { go(-1); });
    on(next, 'click', function () { go(1); });

    var queued = false;
    on(track, 'scroll', function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; sync(); });
    }, { passive: true });
    on(window, 'resize', sync);
    on(window, 'load', sync);
    sync();
  });

  /* 3.4 Gallery lightbox: a <dialog>, so the browser traps focus and handles Escape */
  safely(function () {
    var box = $('#lightbox');
    var frame = $('#lightbox-frame');
    var count = $('#lightbox-count');
    var openers = $all('.gallery__open');
    if (!box || !frame || !count || !openers.length) return;
    // Browsers without <dialog> (iOS before 15.4) keep the photos in the grid, with no button that would do nothing.
    if (typeof box.showModal !== 'function') {
      openers.forEach(function (btn) { btn.hidden = true; });
      return;
    }

    var shots = openers.map(function (btn) {
      var fig = $('.photo', btn.parentNode);
      var img = fig ? $('img', fig) : null;
      var slot = fig ? fig.getAttribute('data-slot') : '';
      return {
        btn: btn,
        slot: slot,
        src: img ? img.getAttribute('src') : 'assets/photos/' + slot + '.jpg',
        alt: img ? img.getAttribute('alt') : ''
      };
    });

    var at = 0;
    var current = null;
    var closeTimer;

    function show(i) {
      at = (i + shots.length) % shots.length;
      var shot = shots[at];
      if (current && current.parentNode) current.parentNode.removeChild(current);
      frame.setAttribute('data-slot', shot.slot);
      frame.classList.remove('is-missing');
      frame.classList.add('is-loading');

      var img = document.createElement('img');
      current = img;
      img.width = 900;
      img.height = 1125;
      img.decoding = 'async';
      img.alt = shot.alt || 'Photo ' + (at + 1);
      img.onload = function () { if (current === img) frame.classList.remove('is-loading'); };
      img.onerror = function () {
        if (current !== img) return;
        frame.classList.remove('is-loading');
        frame.classList.add('is-missing');   // the frame then names the missing slot, as on the page
        if (img.parentNode) img.parentNode.removeChild(img);
      };
      img.src = shot.src;
      frame.appendChild(img);
      count.textContent = 'Photo ' + (at + 1) + ' of ' + shots.length;
    }

    function openBox(i) {
      clearTimeout(closeTimer);
      show(i);
      if (!box.open) box.showModal();
      lockScroll(true);
      settle(box);
      box.classList.add('is-open');
    }

    function closeBox() {
      box.classList.remove('is-open');
      clearTimeout(closeTimer);
      closeTimer = setTimeout(function () { if (box.open) box.close(); }, 230);   // after the 220ms fade
    }

    openers.forEach(function (btn, i) { on(btn, 'click', function () { openBox(i); }); });
    on($('#lightbox-close'), 'click', closeBox);
    on($('#lightbox-prev'), 'click', function () { show(at - 1); });
    on($('#lightbox-next'), 'click', function () { show(at + 1); });

    on(box, 'cancel', function (e) { e.preventDefault(); closeBox(); });   // Escape
    on(box, 'close', function () {
      box.classList.remove('is-open');
      lockScroll(false);
      if (shots[at]) shots[at].btn.focus();   // back to the photo that was being viewed
    });
    on(box, 'click', function (e) {   // a tap on the veil
      if (e.target === box || e.target.classList.contains('lightbox__in')) closeBox();
    });
    on(box, 'keydown', function (e) {
      if (e.key === 'ArrowLeft') show(at - 1);
      else if (e.key === 'ArrowRight') show(at + 1);
    });

    var x0 = null;
    var y0 = null;
    on(box, 'touchstart', function (e) {
      x0 = e.changedTouches[0].clientX;
      y0 = e.changedTouches[0].clientY;
    }, { passive: true });
    on(box, 'touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      var dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) show(at + (dx < 0 ? 1 : -1));
    }, { passive: true });
  });

  /* 3.5 Bottom bars: out of the way while the booking form is on screen or a field has focus */
  safely(function () {
    var sheet = $('.sheet');
    var inView = false;
    var typing = false;
    var timer;

    function sync() { root.classList.toggle('is-quiet', inView || typing); }
    function isField(el) { return !!el && /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName); }

    if (sheet && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[entries.length - 1].isIntersecting;
        sync();
      }, { rootMargin: '-12% 0px -12% 0px' }).observe(sheet);
    }

    on(document, 'focusin', function (e) {
      if (!isField(e.target)) return;
      clearTimeout(timer);
      typing = true;
      sync();
    });
    on(document, 'focusout', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { typing = isField(document.activeElement); sync(); }, 120);
    });
  });

  /* 3.6 The year in the footer */
  safely(function () {
    var year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());
  });

  /* 3.8 Header and progress line: the header steps aside on the way down the page and returns on the way up */
  safely(function () {
    var header = $('.site-header');
    var bar = $('#progress-bar');
    var last = window.pageYOffset;
    var queued = false;

    // True while the keyboard is in the header. Focus left there by a mouse click does not count.
    function keyboardInHeader() {
      try { return !!header.querySelector(':focus-visible'); }
      catch (e) { return header.contains(document.activeElement); }   // browsers without :focus-visible
    }

    function update() {
      queued = false;
      var y = window.pageYOffset;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, Math.max(0, y / max)) : 0) + ')';
      if (header) {
        if (y < 120 || y < last - 6) header.classList.remove('is-away');
        else if (y > last + 6 && !keyboardInHeader()) header.classList.add('is-away');
      }
      last = y;
    }

    on(window, 'scroll', function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    }, { passive: true });
    on(header, 'focusin', function () { header.classList.remove('is-away'); });   // tabbing back into it brings it back
    update();
  });

  /* 3.9 In-page links while smooth scrolling is on (desktop). Without it the browser handles them itself. */
  safely(function () {
    on(document, 'click', function (e) {
      if (!smoother || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href').slice(1);
      var target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      smoother.scrollTo(target === document.body ? 0 : target, { offset: -80 });
      try { history.replaceState(null, '', '#' + id); } catch (err) {}
      // Keyboard order then continues from where the page has gone, as it does with a plain link.
      if (target !== document.body) {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  /* 3.7 Choosing services, offers and combos, and the booking form they feed */
  safely(function () {
    var form = $('#booking-form');
    if (!form) return;

    var chipsEl = $('#chips');
    var chipsEmpty = $('#chips-empty');
    var serviceAdd = $('#service-add');
    var artist = $('#artist');
    var date = $('#date');
    var time = $('#time');
    var timeNote = $('#time-note');
    var nameEl = $('#name');
    var mobile = $('#mobile');
    var note = $('#note');
    var statusEl = $('#form-status');
    var confirmEl = $('#confirm');
    var requestText = $('#request-text');
    var waAgain = $('#wa-again');
    var copyStatus = $('#copy-status');
    var pickedCount = $('#picked-count');

    var WS = window.WS;   // the tested helpers from part 1
    var DRAFT_KEY = 'ws-booking';
    var number = form.getAttribute('data-whatsapp') || '919027156238';
    var openAt = form.getAttribute('data-open') || '10:00';
    var closeAt = form.getAttribute('data-close') || '22:30';

    var picked = [];      // what is in the booking: [{ key: 'svc:Haircut', label: 'Haircut' }]
    var comboOwned = {};  // the services each combo added itself, by its data-combo text: { 'Haircut|Beard trimming': ['Beard trimming'] }
    var shownKeys = {};   // chips already on screen, so only new ones animate in
    var serviceNames = $all('[data-add]').map(function (b) { return b.getAttribute('data-add'); });

    var fields = {
      services: { el: serviceAdd, err: $('#services-error') },
      date: { el: date, err: $('#date-error') },
      time: { el: time, err: $('#time-error') },
      name: { el: nameEl, err: $('#name-error') },
      mobile: { el: mobile, err: $('#mobile-error') }
    };

    /* --- the selection --- */

    function indexOfKey(key) {
      for (var i = 0; i < picked.length; i++) if (picked[i].key === key) return i;
      return -1;
    }
    function has(key) { return indexOfKey(key) > -1; }
    function add(key, label) { if (!has(key)) picked.push({ key: key, label: label }); }
    function remove(key) {
      var i = indexOfKey(key);
      if (i > -1) picked.splice(i, 1);
      if (key.indexOf('svc:') === 0) {   // a service that has gone belongs to no combo any more
        var n = key.slice(4);
        Object.keys(comboOwned).forEach(function (k) {
          comboOwned[k] = comboOwned[k].filter(function (m) { return m !== n; });
        });
      }
    }

    function offerLabel(btn) {
      var slip = btn.closest('.offer');
      var title = slip ? $('.offer__title', slip) : null;
      return 'Offer: ' + (title ? title.textContent.trim() : btn.getAttribute('data-offer'));
    }

    // An offer is counted as a package, the word the Offers section and the booking list use.
    function summary() {
      var services = 0;
      var packages = 0;
      picked.forEach(function (p) { if (p.key.indexOf('offer:') === 0) packages++; else services++; });
      var parts = [];
      if (services) parts.push(services + (services === 1 ? ' service' : ' services'));
      if (packages) parts.push(packages + (packages === 1 ? ' package' : ' packages'));
      return parts.length ? parts.join(' and ') + ' selected' : 'No services selected';
    }

    // A combo is on while all of its services are in the booking.
    function comboIsOn(key) {
      return key.split('|').every(function (n) { return has('svc:' + n); });
    }

    // Turning a combo on adds its services and remembers which ones it added itself.
    // Turning it off removes only those, so a service chosen on its own stays. A service that another
    // combo which is on still needs also stays, and that combo takes it over. If the combo added nothing
    // (its services had all been chosen one by one), the visitor is removing the combo as a whole:
    // all of its services go, except those another combo still needs.
    function toggleCombo(key) {
      var names = key.split('|');
      if (!comboIsOn(key)) {
        // Keep what it added before (if the visitor removed one of its services by hand and is turning it
        // back on), plus whatever it adds now.
        var before = (comboOwned[key] || []).filter(function (n) { return has('svc:' + n); });
        comboOwned[key] = before.concat(names.filter(function (n) { return !has('svc:' + n); }));
        names.forEach(function (n) { add('svc:' + n, n); });
        return;
      }
      var mine = (comboOwned[key] || []).filter(function (n) { return has('svc:' + n); });
      if (!mine.length) mine = names.slice();
      delete comboOwned[key];
      var othersOn = $all('[data-combo]')
        .map(function (b) { return b.getAttribute('data-combo'); })
        .filter(function (k) { return k !== key && comboIsOn(k); });
      mine.forEach(function (n) {
        var keeper = othersOn.filter(function (k) { return k.split('|').indexOf(n) > -1; })[0];
        if (!keeper) { remove('svc:' + n); return; }
        comboOwned[keeper] = comboOwned[keeper] || [];
        if (comboOwned[keeper].indexOf(n) < 0) comboOwned[keeper].push(n);
      });
    }

    function saveDraft() {
      try {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify({
          items: picked,
          combos: comboOwned,
          artist: artist.value,
          date: date.value,
          time: time.value,
          name: nameEl.value,
          mobile: mobile.value,
          note: note.value
        }));
      } catch (e) {}   // private browsing or storage full: the form still works
    }

    // Brings every control on the page into line with the selection.
    function render(opts) {
      opts = opts || {};

      $all('[data-add]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(has('svc:' + b.getAttribute('data-add'))));
      });
      $all('[data-offer]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(has('offer:' + b.getAttribute('data-offer'))));
      });
      $all('[data-combo]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(comboIsOn(b.getAttribute('data-combo'))));
      });
      $all('option', serviceAdd).forEach(function (o) {   // a package's value is already its key ("offer:7")
        if (o.value) o.disabled = has(o.value.indexOf('offer:') === 0 ? o.value : 'svc:' + o.value);
      });

      var fresh = [];
      var seen = {};
      chipsEl.textContent = '';
      picked.forEach(function (item) {
        var li = document.createElement('li');
        li.className = 'chip chip--x';
        var label = document.createElement('span');
        label.textContent = item.label;
        var x = document.createElement('button');
        x.type = 'button';
        x.className = 'chip__x';
        x.setAttribute('data-remove', item.key);
        x.setAttribute('aria-label', 'Remove ' + item.label);
        x.innerHTML = iconHtml('close');
        li.appendChild(label);
        li.appendChild(x);
        if (opts.animate !== false && !shownKeys[item.key]) { li.classList.add('is-new'); fresh.push(li); }
        seen[item.key] = true;
        chipsEl.appendChild(li);
      });
      shownKeys = seen;
      if (fresh.length) {
        requestAnimationFrame(function () {
          settle(fresh[0]);
          fresh.forEach(function (li) { li.classList.remove('is-new'); });
        });
      }

      var text = summary();
      chipsEmpty.hidden = picked.length > 0;
      pickedCount.textContent = text;
      root.classList.toggle('has-picked', picked.length > 0);
      if (picked.length) setError('services', '');
      if (opts.announce) say(text);
      saveDraft();
    }

    on(document, 'click', function (e) {
      var t = e.target.closest('[data-add], [data-offer], [data-combo], [data-remove]');
      if (!t) return;
      var key;

      if (t.hasAttribute('data-add')) {
        var name = t.getAttribute('data-add');
        key = 'svc:' + name;
        if (has(key)) remove(key); else add(key, name);
      } else if (t.hasAttribute('data-offer')) {
        key = 'offer:' + t.getAttribute('data-offer');
        if (has(key)) remove(key); else add(key, offerLabel(t));
      } else if (t.hasAttribute('data-combo')) {
        toggleCombo(t.getAttribute('data-combo'));
      } else {
        // A chip's remove button. The chip goes, so focus moves to the next chip, or to "Add a service".
        key = t.getAttribute('data-remove');
        var i = indexOfKey(key);
        remove(key);
        render({ announce: true });
        var left = $all('.chip__x', chipsEl);
        (left[Math.min(i, left.length - 1)] || serviceAdd).focus();
        return;
      }
      render({ announce: true });
    });

    /* --- fields --- */

    function option(select, value, text) {
      var o = document.createElement('option');
      o.value = value;
      o.textContent = text;
      select.appendChild(o);
      return o;
    }

    // "Add a service or package": the same names as the menu, in the same groups,
    // then the men's packages from Offers, labelled as their headings read ("Package 7 (Rs 1,149)").
    $all('.group').forEach(function (g) {
      var title = $('.group__name', g);
      var og = document.createElement('optgroup');
      og.label = title ? title.textContent.trim() : '';
      $all('[data-add]', g).forEach(function (b) {
        var n = b.getAttribute('data-add');
        var o = document.createElement('option');
        o.value = n;
        o.textContent = n;
        og.appendChild(o);
      });
      serviceAdd.appendChild(og);
    });
    var offerButtons = $all('[data-offer]');
    if (offerButtons.length) {
      var pg = document.createElement('optgroup');
      pg.label = 'Men’s packages';
      offerButtons.forEach(function (b) {
        var id = b.getAttribute('data-offer');
        var slip = b.closest('.offer');
        var heading = slip ? $('.offer__title', slip) : null;
        var o = document.createElement('option');
        o.value = 'offer:' + id;
        o.textContent = heading ? heading.textContent.trim() : 'Package ' + id;
        pg.appendChild(o);
      });
      serviceAdd.appendChild(pg);
    }
    on(serviceAdd, 'change', function () {
      var v = serviceAdd.value;
      if (!v) return;
      if (v.indexOf('offer:') === 0) {
        // Exactly what the package's own Add button does, so the request reads the same.
        var btn = $('[data-offer="' + v.slice(6).replace(/[^\w-]/g, '') + '"]');
        if (btn) add('offer:' + btn.getAttribute('data-offer'), offerLabel(btn));
      } else {
        add('svc:' + v, v);
      }
      serviceAdd.value = '';
      render({ announce: true });
    });

    // Preferred artist: one option per artist on the page. "Book with this artist" picks it.
    $all('[data-artist]').forEach(function (link) {
      var id = link.getAttribute('data-artist');
      var card = link.closest('.artist');
      var nameNode = card ? $('.artist__name', card) : null;
      var label = nameNode ? nameNode.textContent.trim() : 'Artist ' + id;
      option(artist, id, label);
      on(link, 'click', function () {
        artist.value = id;
        saveDraft();
        say(label + ' is now your preferred artist.');
      });
    });

    // 30 minutes from now as HH:MM. Past midnight means nothing is left today.
    function soonest() {
      var t = new Date();
      var m = t.getHours() * 60 + t.getMinutes() + 30;
      return m >= 1440 ? '23:59' : pad2(Math.floor(m / 60)) + ':' + pad2(m % 60);
    }

    function buildTimes(keep) {
      var wanted = typeof keep === 'string' ? keep : time.value;
      var day = date.value;
      var noneToday = false;
      time.textContent = '';
      if (!day) {
        option(time, '', 'Choose a date first');
      } else {
        var today = day === WS.isoDate(0);
        var slots = WS.timeSlots(openAt, closeAt, 30, 30, today ? soonest() : null);
        if (!slots.length) {
          noneToday = today;
          option(time, '', today ? 'No times left today' : 'No times on this date');
        } else {
          option(time, '', 'Choose a time');
          slots.forEach(function (s) { option(time, s.value, s.label); });
          time.value = wanted;
          if (time.value !== wanted) time.value = '';
        }
      }
      timeNote.hidden = !noneToday;
      time.setAttribute('aria-describedby', noneToday ? 'time-note time-error' : 'time-error');
    }

    on($('#time-tomorrow'), 'click', function () {
      date.value = WS.isoDate(1);
      buildTimes();
      check('date');
      saveDraft();
      time.focus();
    });

    /* --- checking --- */

    var checks = {
      services: function () {
        if (picked.length) return '';
        return offerButtons.length ? 'Add at least one service or package.' : 'Add at least one service.';
      },
      date: function () {
        var v = date.value;
        if (!v) return 'Choose a date.';
        if (v < WS.isoDate(0)) return 'That date has passed. Choose today or a later date.';
        if (v > WS.isoDate(60)) return 'Choose a date on or before ' + WS.formatDate(WS.isoDate(60)) + '.';
        return '';
      },
      time: function () {
        if (time.value) return '';
        if (!date.value) return 'Choose a date first, then a time.';
        return timeNote.hidden ? 'Choose a time.' : 'No times are left today. Choose another date.';
      },
      name: function () { return nameEl.value.trim() ? '' : 'Enter your name.'; },
      mobile: function () {
        var v = mobile.value.trim();
        if (!v) return 'Enter your mobile number.';
        return WS.normaliseMobile(v) ? '' : 'Enter a 10-digit Indian mobile number, for example 98765 43210.';
      }
    };

    // Shows or clears the message under a field. The message is an icon and words, never colour alone.
    function setError(key, msg) {
      var f = fields[key];
      if (msg) {
        if (f.err.getAttribute('data-msg') !== msg) {
          f.err.textContent = '';
          f.err.insertAdjacentHTML('afterbegin', iconHtml('alert'));
          var words = document.createElement('span');
          words.textContent = msg;
          f.err.appendChild(words);
          f.err.setAttribute('data-msg', msg);
          f.err.classList.remove('is-shown');
          settle(f.err);
          f.err.classList.add('is-shown');
        }
        f.el.setAttribute('aria-invalid', 'true');
      } else {
        f.err.textContent = '';
        f.err.removeAttribute('data-msg');
        f.err.classList.remove('is-shown');
        f.el.removeAttribute('aria-invalid');
      }
      return !msg;
    }
    function check(key) { return setError(key, checks[key]()); }

    ['date', 'time', 'name', 'mobile'].forEach(function (key) {
      var el = fields[key].el;
      function recheck() {
        if (el.getAttribute('aria-invalid')) check(key);   // an error clears as soon as it is fixed
        saveDraft();
      }
      on(el, 'blur', function () { check(key); });
      on(el, 'input', recheck);
      on(el, 'change', recheck);
    });
    on(date, 'change', function () {
      buildTimes();
      if (time.getAttribute('aria-invalid')) check('time');
      saveDraft();
    });
    on(artist, 'change', saveDraft);
    on(note, 'input', saveDraft);
    on(note, 'keydown', function (e) {   // Ctrl+Enter or Cmd+Enter sends from the note
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }
    });

    /* --- sending --- */

    function buildLines() {
      var lines = [
        'Booking request from the website',
        'Name: ' + nameEl.value.trim(),
        'Mobile: ' + WS.formatMobile(WS.normaliseMobile(mobile.value)),
        'Services: ' + picked.map(function (p) { return p.label; }).join(', '),
        'Date: ' + WS.formatDate(date.value),
        'Time: ' + WS.formatTime(time.value),
        'Artist: ' + (artist.value ? artist.options[artist.selectedIndex].text : 'No preference')
      ];
      var n = note.value.trim().slice(0, 200).replace(/\s*\n\s*/g, ' ');
      if (n) lines.push('Note: ' + n);
      return lines;
    }

    on(form, 'submit', function (e) {
      e.preventDefault();
      buildTimes();   // a time that has passed while the page sat open drops out here
      var bad = ['services', 'date', 'time', 'name', 'mobile'].filter(function (key) { return !check(key); });
      if (bad.length) {
        statusEl.textContent = bad.length === 1
          ? 'Fix 1 field to send your request. It is marked below.'
          : 'Fix ' + bad.length + ' fields to send your request. Each one is marked below.';
        fields[bad[0]].el.focus();
        return;
      }
      statusEl.textContent = '';

      var lines = buildLines();
      var url = WS.whatsappUrl(number, lines);

      // Opened by a real click on a link, inside this handler, so the browser does not treat it as a pop-up.
      var a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      requestText.textContent = lines.join('\n');
      waAgain.href = url;
      copyStatus.textContent = '';
      form.hidden = true;
      confirmEl.hidden = false;
      settle(confirmEl);
      confirmEl.classList.add('is-shown');
      confirmEl.focus();

      // The request is made, so it is no longer a draft: a reload starts with an empty form,
      // instead of offering the same request again. The request itself stays on screen above.
      try { sessionStorage.removeItem(DRAFT_KEY); } catch (err) {}
    });

    on($('#copy-request'), 'click', function () {
      var text = requestText.textContent;
      function copied() { copyStatus.textContent = 'Copied. Paste it into WhatsApp or a text message.'; }
      function selectIt() {
        var ok = false;
        try {
          var range = document.createRange();
          range.selectNodeContents(requestText);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          ok = document.execCommand('copy');
        } catch (err) {}
        if (ok) copied();
        else copyStatus.textContent = 'Could not copy it for you. The request is selected above, ready for you to copy.';
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(copied, selectIt);
      else selectIt();
    });

    /* --- start: limits, the saved draft, first render --- */

    date.min = WS.isoDate(0);
    date.max = WS.isoDate(60);

    var draft = null;
    try { draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || 'null'); } catch (e) {}
    if (draft && typeof draft === 'object') {
      if (Array.isArray(draft.items)) {
        draft.items.forEach(function (it) {
          if (!it || typeof it.key !== 'string') return;
          if (it.key.indexOf('svc:') === 0) {
            var n = it.key.slice(4);
            if (serviceNames.indexOf(n) > -1) add('svc:' + n, n);
          } else if (it.key.indexOf('offer:') === 0) {
            var btn = $('[data-offer="' + it.key.slice(6).replace(/[^\w-]/g, '') + '"]');
            if (btn) add('offer:' + btn.getAttribute('data-offer'), offerLabel(btn));
          }
        });
      }
      // Which combo added what, for combos still on the page and services still in the menu.
      if (draft.combos && typeof draft.combos === 'object') {
        $all('[data-combo]').forEach(function (b) {
          var k = b.getAttribute('data-combo');
          var owned = draft.combos[k];
          if (!Array.isArray(owned)) return;
          comboOwned[k] = owned.filter(function (n) { return typeof n === 'string' && serviceNames.indexOf(n) > -1; });
        });
      }
      if (typeof draft.name === 'string') nameEl.value = draft.name;
      if (typeof draft.mobile === 'string') mobile.value = draft.mobile;
      if (typeof draft.note === 'string') note.value = draft.note.slice(0, 200);
      if (typeof draft.artist === 'string') {
        artist.value = draft.artist;
        if (artist.value !== draft.artist) artist.value = '';
      }
      if (typeof draft.date === 'string' && draft.date >= date.min && draft.date <= date.max) date.value = draft.date;
    }
    buildTimes(draft && typeof draft.time === 'string' ? draft.time : '');
    render({ animate: false });
  });



  /* ---------- 4. Motion (tested) ---------- */
  // Only two kinds of motion live here: the opening sequence and effects tied 1:1 to scrolling.
  //
  // Opening sequence, marked in the HTML of the hero:
  //   data-intro="lines"   headline: its lines rise from behind a mask
  //   data-intro="fade"    supporting text and actions: fade up, one after another
  //   data-intro="settle"  hero photo: eases from slightly enlarged to its real size (never hidden)
  //
  // Scroll-linked, for elements inside a frame that hides overflow:
  //   data-drift="6"       photo drifts 6% up and down as its frame crosses the screen
  //   data-slide="15"      a line of text slides 15% sideways as its band crosses the screen
  // Do not put data-drift on the hero photo that has data-intro="settle".

  function showEverything() {
    clearTimeout(window.__introTimer);
    root.classList.remove('intro-pending');
  }

  if (!window.gsap || !window.ScrollTrigger || !window.SplitText) {
    showEverything();   // library blocked or failed: the page is complete without it
    return;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText);

  var motionOn = false;
  var mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', function () {
    motionOn = true;
    var playIntro = root.classList.contains('intro-pending') && !window.__introSkipped;
    var curtain = document.querySelector('.curtain');
    var lead = 0;   // seconds the hero sequence waits for the curtain

    // The curtain is held up by the pending class. Hand it to a class of its own before that one goes.
    if (playIntro && curtain) root.classList.add('curtain-on');

    // Un-hide first. The tweens below set their own start values in the same frame,
    // and they use fromTo with explicit end values so nothing can end up stuck hidden.
    showEverything();

    // The curtain is gone 0.9 seconds after the script starts, and the start-up guard skips it entirely
    // if the script starts later than 0.8 seconds after the first paint. (Until 12 November 2026 it took 1.7.)
    if (playIntro && curtain) {
      lead = 0.45;
      var mark = SplitText.create('.curtain__mark', { type: 'chars', mask: 'chars' });
      gsap.timeline({
        onComplete: function () {
          root.classList.remove('curtain-on');
          gsap.set(curtain, { clearProps: 'transform' });
          mark.revert();
        }
      })
        .fromTo('.curtain__comb', { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power3.out' })
        .to(mark.chars, { yPercent: -110, duration: 0.35, stagger: 0.012, ease: 'power3.in' }, 0.2)
        .to(curtain, { yPercent: -100, duration: 0.6, ease: 'power3.inOut' }, 0.3);
      // Whatever happens to the timeline, the page is never left covered.
      setTimeout(function () { root.classList.remove('curtain-on'); }, 2000);
    }

    // The hero sequence (tested). With a curtain it starts as the curtain begins to lift.
    var heroSequence = function () {
      gsap.utils.toArray('[data-intro="lines"]').forEach(function (el) {
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,   // re-splits if the web font arrives or the width changes mid-sequence
          onSplit: function (self) {
            return gsap.fromTo(self.lines, { yPercent: 110 }, {
              yPercent: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out',
              onComplete: function () { self.revert(); }   // give the heading back its normal markup
            });
          }
        });
      });

      var fades = gsap.utils.toArray('[data-intro="fade"]');
      if (fades.length) {
        gsap.fromTo(fades, { autoAlpha: 0, y: 12 }, {
          autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.45, ease: 'power3.out',
          clearProps: 'opacity,visibility,transform'
        });
      }

      var settles = gsap.utils.toArray('[data-intro="settle"]');
      if (settles.length) {
        gsap.fromTo(settles, { scale: 1.06 }, { scale: 1, duration: 1.4, ease: 'power2.out', clearProps: 'transform' });
      }
    };

    if (playIntro) {
      if (lead) gsap.delayedCall(lead, heroSequence); else heroSequence();
      try { sessionStorage.setItem('ws-intro', '1'); } catch (e) {}
    }

    gsap.utils.toArray('[data-drift]').forEach(function (el) {
      var n = parseFloat(el.getAttribute('data-drift')) || 6;
      gsap.set(el, { scale: 1 + (2 * n + 2) / 100 });   // enlarged just enough that the frame never shows an edge
      gsap.fromTo(el, { yPercent: -n }, {
        yPercent: n, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    gsap.utils.toArray('[data-slide]').forEach(function (el) {
      var n = parseFloat(el.getAttribute('data-slide')) || 15;
      gsap.fromTo(el, { xPercent: 0 }, {
        xPercent: -n, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    /* --- Added 11 November 2026: reveals, speeds, the footer name, smooth scrolling, the "View" cursor ---
       Every start state below is set here, by script, so none of it applies when this block does not run. */
    root.classList.add('motion');

    // data-rv="lines": a heading rises line by line when it comes into view.
    gsap.utils.toArray('[data-rv="lines"]').forEach(function (el) {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: function (self) {
          return gsap.from(self.lines, {
            yPercent: 110, duration: 0.9, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            onComplete: function () { self.revert(); }
          });
        }
      });
    });

    // data-rv="up": a block fades up. Opacity, never visibility, so focus and screen readers still reach it.
    var ups = gsap.utils.toArray('[data-rv="up"]');
    if (ups.length) {
      gsap.set(ups, { opacity: 0, y: 28 });
      ScrollTrigger.batch(ups, {
        start: 'top 90%',
        once: true,
        onEnter: function (els) {
          gsap.to(els, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', clearProps: 'opacity,transform' });
        }
      });
    }

    // data-rv="kids": the children of a list follow one another.
    gsap.utils.toArray('[data-rv="kids"]').forEach(function (box) {
      var kids = gsap.utils.toArray(box.children);
      if (!kids.length) return;
      gsap.set(kids, { opacity: 0, y: 24 });
      ScrollTrigger.create({
        trigger: box,
        start: 'top 88%',
        once: true,
        onEnter: function () {
          gsap.to(kids, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out', clearProps: 'opacity,transform' });
        }
      });
    });

    // data-rv="photo": a frame wipes open from its top edge.
    var frames = gsap.utils.toArray('[data-rv="photo"]');
    if (frames.length) {
      gsap.set(frames, { clipPath: 'inset(0% 0% 100% 0%)' });
      ScrollTrigger.batch(frames, {
        start: 'top 92%',
        once: true,
        onEnter: function (els) {
          gsap.to(els, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, stagger: 0.1, ease: 'power3.inOut', clearProps: 'clipPath' });
        }
      });
    }

    // Comb rules draw when their section arrives. The drawing itself is a CSS transition.
    gsap.utils.toArray('.section--ruled').forEach(function (sec) {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 85%',
        once: true,
        onEnter: function () { sec.classList.add('is-inview'); }
      });
    });

    // The hero photo and the gallery columns travel at their own speeds.
    var heroPhoto = document.querySelector('.hero__photo');
    if (heroPhoto) {
      gsap.to(heroPhoto, {
        yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }
    gsap.utils.toArray('.gallery__item').forEach(function (item, i) {
      var d = i % 2 ? -18 : 26;
      gsap.fromTo(item, { '--py': d + 'px' }, {
        '--py': -d + 'px', ease: 'none',
        scrollTrigger: { trigger: item.parentNode, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    // The large name in the footer rises letter by letter as the page ends.
    var big = document.querySelector('.site-footer__big');
    if (big) {
      var letters = SplitText.create(big, { type: 'chars' });
      gsap.from(letters.chars, {
        yPercent: 110, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: big, start: 'top 96%', end: 'bottom bottom', scrub: 0.5 }
      });
    }

    // Smooth wheel scrolling on desktop. Phones and tablets keep their own.
    var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var tick = null;
    if (window.Lenis && fine) {
      smoother = new window.Lenis({ lerp: 0.12 });
      smoother.on('scroll', ScrollTrigger.update);
      tick = function (time) { if (smoother) smoother.raf(time * 1000); };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // The "View" cursor follows a mouse over gallery photos.
    var cursor = document.querySelector('.cursor');
    var grid = document.getElementById('gallery-grid');
    if (cursor && grid && fine) {
      var moveX = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
      var moveY = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
      grid.addEventListener('pointermove', function (e) { moveX(e.clientX); moveY(e.clientY); });
      grid.addEventListener('pointerover', function (e) {
        if (e.target.closest('.gallery__open')) cursor.classList.add('is-on');
      });
      grid.addEventListener('pointerout', function (e) {
        if (e.target.closest('.gallery__open')) cursor.classList.remove('is-on');
      });
    }

    // When the page changes height (an answer opens, the form gives way to the confirmation),
    // the scroll positions above are measured again.
    var watcher = null;
    if ('ResizeObserver' in window) {
      var remeasure = gsap.delayedCall(0.25, function () { ScrollTrigger.refresh(); }).pause();
      watcher = new ResizeObserver(function () { remeasure.restart(true); });
      watcher.observe(document.body);
    }

    // If the visitor switches to reduced motion, GSAP undoes everything above; this undoes the rest.
    return function () {
      root.classList.remove('motion', 'curtain-on');
      if (watcher) watcher.disconnect();
      if (tick) gsap.ticker.remove(tick);
      if (smoother) { smoother.destroy(); smoother = null; }
    };
  });

  if (!motionOn) showEverything();   // visitor prefers reduced motion

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });   // text may have changed size
  }
})();
