// ============================
// HENDRIX ARTS — COMPONENTS JS
// Injects shared header + footer
// ============================

const HEADER_HTML = `
<header class="site-header" id="site-header">
  <a href="../index.html" class="logo">
    <span class="logo-main">HendrixArts</span>
    <span class="logo-sub">Art Is Not Aristocratic</span>
  </a>
  <nav class="nav-links">
    <a href="../index.html">Home</a>
    <a href="../pages/gallery.html">Gallery</a>
    <a href="../pages/about.html">About</a>
    <a href="../pages/faq.html">FAQ</a>
    <a href="../pages/contact.html">Contact</a>
    <a href="../pages/booking.html" class="btn-book">Book Your Slot</a>
  </nav>
  <button class="hamburger" id="hamburger" aria-label="Toggle menu">
    <span></span><span></span><span></span>
  </button>
</header>
<nav class="mobile-menu" id="mobile-menu">
  <a href="../index.html">Home</a>
  <a href="../pages/gallery.html">Gallery</a>
  <a href="../pages/about.html">About</a>
  <a href="../pages/faq.html">FAQ</a>
  <a href="../pages/contact.html">Contact</a>
  <a href="../pages/booking.html" style="color: var(--warm); font-weight: 600;">Book Your Slot →</a>
</nav>
`;

const HEADER_HOME_HTML = `
<header class="site-header" id="site-header">
  <a href="index.html" class="logo">
    <span class="logo-main">HendrixArts</span>
    <span class="logo-sub">Art Is Not Aristocratic</span>
  </a>
  <nav class="nav-links">
    <a href="index.html">Home</a>
    <a href="pages/gallery.html">Gallery</a>
    <a href="pages/about.html">About</a>
    <a href="pages/faq.html">FAQ</a>
    <a href="pages/contact.html">Contact</a>
    <a href="pages/booking.html" class="btn-book">Book Your Slot</a>
  </nav>
  <button class="hamburger" id="hamburger" aria-label="Toggle menu">
    <span></span><span></span><span></span>
  </button>
</header>
<nav class="mobile-menu" id="mobile-menu">
  <a href="index.html">Home</a>
  <a href="pages/gallery.html">Gallery</a>
  <a href="pages/about.html">About</a>
  <a href="pages/faq.html">FAQ</a>
  <a href="pages/contact.html">Contact</a>
  <a href="pages/booking.html" style="color: var(--warm); font-weight: 600;">Book Your Slot →</a>
</nav>
`;

const FOOTER_HTML_TEMPLATE = (prefix = '..') => `
<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <span class="logo-main">HendrixArts</span>
      <p>A movement dedicated to making original, high-quality commissioned artwork accessible to everyday people. Art is not a luxury — it belongs to everyone.</p>
      <p class="footer-tagline">"Art Is Not Aristocratic"</p>
      <div class="footer-social">
        <a href="https://www.instagram.com/hendrixarts_" class="social-icon" aria-label="Instagram">IG</a>
        <a href="https://wa.me/2348134530753" class="social-icon" aria-label="WhatsApp">WA</a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Navigate</h4>
      <ul>
        <li><a href="${prefix}/index.html">Home</a></li>
        <li><a href="${prefix}/pages/gallery.html">Gallery</a></li>
        <li><a href="${prefix}/pages/about.html">About</a></li>
        <li><a href="${prefix}/pages/faq.html">FAQ</a></li>
        <li><a href="${prefix}/pages/contact.html">Contact Us</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Campaign</h4>
      <ul>
        <li><a href="${prefix}/pages/booking.html">Book a Slot</a></li>
        <li><a href="${prefix}/pages/booking.html#muse">Muse Tier</a></li>
        <li><a href="${prefix}/pages/booking.html#collector">Art Collector Tier</a></li>
        <li><a href="${prefix}/pages/booking.html#patron">Patron Tier</a></li>
        <li><a href="${prefix}/pages/faq.html">How It Works</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <ul>
        <li><a href="mailto:hendrixartss@gmail.com">hendrixartss@gmail.com</a></li>
        <li><a href="https://wa.me/2348134530753">WhatsApp</a></li>
        <li><a href="https://share.google/0XwCRkwvtxYVcYprD">University of Ibadan, Oyo State</a></li>
        <li><a href="${prefix}/pages/faq.html">FAQs</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 HendrixArts. All rights reserved. Hon.Ajibola.</p>
    <span class="footer-hashtag">#ARTISNOTARISTOCRATIC</span>
  </div>
</footer>
`;

// Auto-inject based on page context
(function() {
  const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
  const prefix = isHome ? '.' : '..';

  // Header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.outerHTML = isHome ? HEADER_HOME_HTML : HEADER_HTML;
  }

  // Footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = FOOTER_HTML_TEMPLATE(prefix);
  }
})();
