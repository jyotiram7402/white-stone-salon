// Icons. One 24px grid, one stroke width (set in site.css on .icon). No fills.
// <Sprite /> goes once at the top of the page; <Icon name="phone" /> draws one.

export function Sprite() {
  return (
    <svg className="sprite" aria-hidden="true" focusable="false" width="0" height="0">
      <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></symbol>
      <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></symbol>
      <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="14.5" rx="2" /><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" /></symbol>
      <symbol id="i-phone" viewBox="0 0 24 24"><path d="M7.1 5h2.3l1.3 3.6-1.7 1.2a11.5 11.5 0 0 0 5.2 5.2l1.2-1.7 3.6 1.3v2.3a2 2 0 0 1-2.2 2A15.4 15.4 0 0 1 5.1 7.2a2 2 0 0 1 2-2.2z" /></symbol>
      <symbol id="i-chat" viewBox="0 0 24 24"><path d="M12 4a8 8 0 0 0-6.9 12L4 20l4.2-1.1A8 8 0 1 0 12 4z" /></symbol>
      <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 0 0-13 0c0 5.4 6.5 11 6.5 11z" /><circle cx="12" cy="10" r="2.3" /></symbol>
      <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5.5v13M5.5 12h13" /></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></symbol>
      <symbol id="i-down" viewBox="0 0 24 24"><path d="M6 9.5l6 6 6-6" /></symbol>
      <symbol id="i-left" viewBox="0 0 24 24"><path d="M14.5 6l-6 6 6 6" /></symbol>
      <symbol id="i-right" viewBox="0 0 24 24"><path d="M9.5 6l6 6-6 6" /></symbol>
      <symbol id="i-copy" viewBox="0 0 24 24"><rect x="8.5" y="8.5" width="11" height="11" rx="2" /><path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" /></symbol>
      <symbol id="i-alert" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.8v5M12 16.2v.1" /></symbol>
    </svg>
  );
}

export function Icon({ name, className = '' }) {
  return (
    <svg className={('icon ' + className).trim()} aria-hidden="true">
      <use href={'#i-' + name} />
    </svg>
  );
}
