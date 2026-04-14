/* ============================
   HENDRIX ARTS — MAIN JS
   ============================ */

  const EMAILJS_SERVICE_ID  = 'service_mhzy73k';
  const EMAILJS_TEMPLATE_ID = 'template_qcxkv9q';

// ── 3. THE SINGLE SEND FUNCTION ───────────────────────────────
function sendConfirmationEmail(tier, data) {

  // Choose template ID based on tier
  let templateId = EMAILJS_TEMPLATE_ID;
  if (tier === 'muse') {
    templateId = 'template_j3ksxf9';
  }

  // These are the variables EmailJS injects into the template.
  // Every variable maps directly to a {{variable}} in the HTML template.

  const templateParams = {

    // ── Always present (all tiers) ──────────
    client_name:  data.name,
    CLIENT_NAME:  data.name,
    client_email: data.email,
    CLIENT_EMAIL: data.email,
    to_email:     data.email,
    TO_EMAIL:     data.email,
    to_name:      data.name,
    TO_NAME:      data.name,
    from_name:   data.name,
    FROM_NAME:   data.name,
    reply_to:    data.email,
    REPLY_TO:    data.email,
    tier_label:   data.tierLabel,      // e.g. "Art Collector — Framed" or "Muse Competition"
    TIER_LABEL:   data.tierLabel,
    tier_icon:    data.tierIcon,       // e.g. "🖼️" / "🎨" / "👑"
    TIER_ICON:    data.tierIcon,
    hero_headline: data.heroHeadline,  // e.g. "Your slot is secured," / "You're in,"
    HERO_HEADLINE: data.heroHeadline,
    hero_subtext:  data.heroSubtext,
    HERO_SUBTEXT:  data.heroSubtext,

    // ── Conditional flags (pass "true" or "" empty string) ──
    // EmailJS treats non-empty string as truthy in {{#if}} blocks
    is_muse:  tier === 'muse'  ? 'true' : '',
    IS_MUSE:  tier === 'muse'  ? 'true' : '',
    is_paid:  tier !== 'muse'  ? 'true' : '',
    IS_PAID:  tier !== 'muse'  ? 'true' : '',
    has_frame: data.hasFrame   ? 'true' : '',
    HAS_FRAME: data.hasFrame   ? 'true' : '',

    // ── Paid tier fields (blank for muse) ───
    framing_option: data.framingOption || '',   // "Framed" / "Unframed"
    FRAMING_OPTION: data.framingOption || '',
    frame_detail:   data.frameDetail   || '',   // "White & Gold · Borderless"
    FRAME_DETAIL:   data.frameDetail || '',
    total_amount:   data.totalAmount   || '',   // "₦10,000"
    TOTAL_AMOUNT:   data.totalAmount || '',
    deposit_paid:   data.depositPaid   || '',   // "₦6,000"
    DEPOSIT_PAID:   data.depositPaid || '',
    balance_due:    data.balanceDue    || '',   // "₦4,000"
    BALANCE_DUE:    data.balanceDue || '',
    payment_ref:    data.paymentRef    || '',   // Paystack ref
    PAYMENT_REF:    data.paymentRef || '',
    artwork_size:   data.artworkSize   || '',   // "A4 portrait" / "premium portrait"
    ARTWORK_SIZE:   data.artworkSize || '',
    delivery_days:  data.deliveryDays  || '',   // "14" / "12"
    DELIVERY_DAYS:  data.deliveryDays || '',

    // ── CTA button (dynamic per tier) ───────
    cta_subtext: data.ctaSubtext,
    CTA_SUBTEXT: data.ctaSubtext || '',
    cta_text:    data.ctaText,
    CTA_TEXT:    data.ctaText || '',
    cta_link:    data.ctaLink,
    CTA_LINK:    data.ctaLink || '',
  };

  console.log('🔔 EmailJS sendConfirmationEmail called for tier:', tier, 'email:', data.email);
  return emailjs.send(EMAILJS_SERVICE_ID, templateId, templateParams, 'bRuZEyN6Fvs9K9KDq')
    .then(() => {
      console.log('✅ Confirmation email sent to', data.email);
    })
    .catch((error) => {
      console.error('❌ Email failed:', error);
      showCustomAlert('Email Sending Failed', 'We could not send the booking confirmation email. Please check the browser console for details.', 'error');
      return Promise.reject(error);
    });
}

// ── 4. TIER DATA BUILDERS ─────────────────────────────────────
// Call these to build the right data object per tier

function buildMuseEmailData(name, email) {
  return {
    name, email,
    tierLabel:    'Muse — Competition Tier',
    tierIcon:     '🎨',
    heroHeadline: "You're in,",
    heroSubtext:  `Your entry for the #ARTISNOTARISTOCRATIC Muse Competition has been registered, ${name}. The movement just got bigger.`,
    ctaSubtext:   'Share the movement. Tag your friends.',
    ctaText:      'Visit @hendrixarts_ on Instagram →',
    ctaLink:      'https://instagram.com/hendrixarts_',
    // Paid fields — blank
    hasFrame: false, framingOption: '', frameDetail: '',
    totalAmount: '', depositPaid: '', balanceDue: '',
    paymentRef: '', artworkSize: '', deliveryDays: '',
  };
}

function buildCollectorEmailData(name, email, isFramed, frameType, frameColour, paymentRef) {
  const total    = isFramed ? 10000 : 7000;
  const deposit  = isFramed ? 6000  : 4200;
  const balance  = total - deposit;
  const framing  = isFramed ? 'Framed' : 'Unframed';
  const frameStr = isFramed ? `${frameColour} · ${frameType}` : '';

  return {
    name, email,
    tierLabel:    `Art Collector — ${framing}`,
    tierIcon:     '🖼️',
    heroHeadline: 'Your slot is secured,',
    heroSubtext:  `Your payment for the #ARTISNOTARISTOCRATIC Art Collector Tier has been confirmed. Hendrix is ready to create something extraordinary for you.`,
    hasFrame:     isFramed,
    framingOption: `${framing} · A4 Pen Portrait`,
    frameDetail:  frameStr,
    totalAmount:  `₦${total.toLocaleString()}`,
    depositPaid:  `₦${deposit.toLocaleString()}`,
    balanceDue:   `₦${balance.toLocaleString()}`,
    paymentRef,
    artworkSize:  'A4 portrait',
    deliveryDays: '14',
    ctaSubtext:   'Send your Payment Evidence now to get started.',
    ctaText:      'Send your Receipt via WhatsApp →',
    ctaLink:      'https://wa.me/2348134530753',
  };
}

function buildPatronEmailData(name, email, isFramed, frameType, frameColour, paymentRef) {
  const total   = isFramed ? 20000 : 15000;
  const deposit = isFramed ? 12000 : 9000;
  const balance = total - deposit;
  const framing = isFramed ? 'Framed' : 'Unframed';
  const frameStr = isFramed ? `${frameColour} · ${frameType}` : '';

  return {
    name, email,
    tierLabel:    `Patron — ${framing}`,
    tierIcon:     '👑',
    heroHeadline: 'Welcome to the inner circle,',
    heroSubtext:  `Your Patron Tier deposit has been confirmed. You've secured one of the most exclusive slots in the #ARTISNOTARISTOCRATIC campaign. Hendrix will pour everything into your piece.`,
    hasFrame:     isFramed,
    framingOption: `${framing} · Premium Pen Drawing`,
    frameDetail:  frameStr,
    totalAmount:  `₦${total.toLocaleString()}`,
    depositPaid:  `₦${deposit.toLocaleString()}`,
    balanceDue:   `₦${balance.toLocaleString()}`,
    paymentRef,
    artworkSize:  'premium portrait',
    deliveryDays: '12',
    ctaSubtext:   'Ready to kick things off? Send your payment evidence now.',
    ctaText:      'Send Your Receipt via WhatsApp →',
    ctaLink:      'https://wa.me/2348134530753',
  };
}

// ── 5. HOW TO CALL FROM YOUR EXISTING CODE ───────────────────

// ── MUSE: inside your existing submitMuseForm() ──
/*
function submitMuseForm(e) {
  e.preventDefault();
  const name  = document.getElementById('muse-name').value;
  const email = document.getElementById('muse-email').value;

  // ... your existing registration logic ...

  // Add this:
  sendConfirmationEmail('muse', buildMuseEmailData(name, email));
}
*/

// ── PAID TIERS: inside your existing payWithPaystack() callback ──
/*
callback: function(response) {
  // ... your existing showToast + WhatsApp redirect ...

  // Read framing state from your existing logic
  // (adjust these IDs to match whatever your updated main.js uses)
  const isFramed     = selectedFraming === 'framed';              // your existing variable
  const frameType    = document.getElementById('frame-type')?.value || '';
  const frameColour  = document.getElementById('frame-colour')?.value || '';

  if (activeTier === 'collector') {
    sendConfirmationEmail('collector',
      buildCollectorEmailData(name, email, isFramed, frameType, frameColour, response.reference)
    );
  } else if (activeTier === 'patron') {
    sendConfirmationEmail('patron',
      buildPatronEmailData(name, email, isFramed, frameType, frameColour, response.reference)
    );
  }
}
*/

document.addEventListener('DOMContentLoaded', () => {

  // ===== ACTIVE NAV LINK =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ===== HEADER SCROLL =====
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ===== ANIMATE ON SCROLL =====
  const aosEls = document.querySelectorAll('.aos');
  if (aosEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    aosEls.forEach(el => observer.observe(el));
  }

  // ===== FAQ ACCORDION =====
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(fi => {
        fi.classList.remove('open');
        const ans = fi.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = '0';
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ===== FAQ CATEGORY FILTER =====
  const faqCatBtns = document.querySelectorAll('.faq-cat-btn');
  faqCatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      faqCatBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      faqItems.forEach(item => {
        if (cat === 'all' || item.dataset.cat === cat) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  // ===== GALLERY LIGHTBOX =====
  // ===== GALLERY LIGHTBOX =====
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');       // ✅ correct
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox) {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const title = item.querySelector('.gallery-item-title')?.textContent || '';
        const imgSrc = item.querySelector('.img-placeholder img')?.src || '';  // ✅ grabs the img

        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxImg) lightboxImg.src = imgSrc;   // ✅ sets it in the lightbox

        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLB = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLB);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });
  }

  // ===== TIER CARD SELECT ON BOOKING =====
  const tierOptions = document.querySelectorAll('.tier-option');

  function updateFormOptionsAndTotal() {
    const checkedTier = document.querySelector('input[name="tier"]:checked');
    const tier = checkedTier ? checkedTier.value : 'collector';

    const frameSelect = document.getElementById('f-frame');
    const colorSelect = document.getElementById('f-subjects');

    const frameWrapper = frameSelect?.closest('.form-group');
    const colorWrapper = colorSelect?.closest('.form-group');

    const hasFrame = frameSelect && frameSelect.value !== 'no';

    if (tier === 'muse') {
      if (frameWrapper) frameWrapper.style.display = 'none';
      if (colorWrapper) colorWrapper.style.display = 'none';
      if (colorSelect) colorSelect.required = false;
    } else if (tier === 'collector') {
      if (frameWrapper) frameWrapper.style.display = '';
      if (colorWrapper) colorWrapper.style.display = 'none';
      if (colorSelect) colorSelect.required = false;
    } else if (tier === 'patron') {
      if (frameWrapper) frameWrapper.style.display = '';
      if (hasFrame) {
        if (colorWrapper) colorWrapper.style.display = '';
        if (colorSelect) colorSelect.required = true;
      } else {
        if (colorWrapper) colorWrapper.style.display = 'none';
        if (colorSelect) colorSelect.required = false;
      }
    }

    const totalEl = document.getElementById('booking-total');
    if (!totalEl) return;

    let price = 0;
    if (tier === 'muse') {
      price = 0;
    } else if (tier === 'collector') {
      price = hasFrame ? 10000 : 7000;
    } else if (tier === 'patron') {
      price = hasFrame ? 20000 : 15000;
    }

    if (price === 0) {
      totalEl.textContent = 'FREE (Competition Slot)';
    } else {
      const deposit = price * 0.6; // 60%
      totalEl.textContent = `₦${deposit.toLocaleString()}`;
    }
    const payBtnEl = document.getElementById('pay-btn');
    if (payBtnEl) {
      if (tier === 'muse') {
        payBtnEl.innerHTML = `Click here to enter into the Muse Slot`;
      } else {
        payBtnEl.innerHTML = `Proceed to Payment <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
      }
    }
  }

  tierOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      tierOptions.forEach(o => o.style.borderColor = '');
      opt.style.borderColor = 'var(--warm)';
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
      updateFormOptionsAndTotal();
    });
  });

  const frameSelect = document.getElementById('f-frame');
  if (frameSelect) {
    frameSelect.addEventListener('change', () => {
      updateFormOptionsAndTotal();
    });
  }

  // Initial call to set state
  if (document.getElementById('booking-form')) {
    updateFormOptionsAndTotal();
  }

  // ===== URLS & ENVS =====
  const __ENV = typeof process !== 'undefined' && process.env ? process.env : (window.ENV || {});
  const GAS_URL = __ENV.GAS_URL || 'https://script.google.com/macros/s/AKfycbzwHQdziy2YdNmBzUJ_LKI4-kPP9mnsvXmBIZ-OCXJC-nQM4nqtTF0sRG7ODZbzhJaV/exec';

  // ===== CUSTOM ALERT MODAL =====
  const customAlertModal = document.getElementById('custom-alert-modal');
  const alertTitleEl = document.getElementById('custom-alert-title');
  const alertMessageEl = document.getElementById('custom-alert-message');
  const alertIconEl = document.getElementById('custom-alert-icon');
  const alertOkBtn = document.getElementById('custom-alert-ok-btn');
  let currentAlertCallback = null;

  function showCustomAlert(title, message, type = 'info', callback = null) {
    if (!customAlertModal) {
      alert(title + "\n\n" + message);
      if (callback) callback();
      return;
    }

    alertTitleEl.textContent = title;
    alertMessageEl.textContent = message;
    currentAlertCallback = callback;

    let svgIcon = '';
    if (type === 'success') {
      svgIcon = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"/></svg>`;
      alertOkBtn.style.background = '#4CAF50';
      alertOkBtn.style.borderColor = '#4CAF50';
      alertOkBtn.style.color = '#fff';
    } else if (type === 'error') {
      svgIcon = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F44336" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
      alertOkBtn.style.background = '#F44336';
      alertOkBtn.style.borderColor = '#F44336';
      alertOkBtn.style.color = '#fff';
    } else {
      svgIcon = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--warm)" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
      alertOkBtn.style.background = 'var(--warm)';
      alertOkBtn.style.borderColor = 'var(--warm)';
      alertOkBtn.style.color = '#111';
    }

    alertIconEl.innerHTML = svgIcon;
    customAlertModal.style.display = 'flex';
  }

  if (alertOkBtn) {
    alertOkBtn.addEventListener('click', () => {
      customAlertModal.style.display = 'none';
      if (currentAlertCallback) {
        currentAlertCallback();
      }
    });
  }

  // ===== FILE UPLOAD INTEGRATION =====
  const fileInput = document.getElementById('f-photo');
  const uploadContainer = document.getElementById('upload-container');
  const uploadUi = document.getElementById('upload-ui');
  const uploadStatus = document.getElementById('upload-status');
  const uploadSuccess = document.getElementById('upload-success');
  const photoUrlInput = document.getElementById('f-photo-url');
  let isUploading = false;

  if (fileInput && uploadContainer) {

    uploadContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadContainer.classList.add('dragover');
    });
    uploadContainer.addEventListener('dragleave', (e) => {
      e.preventDefault();
      uploadContainer.classList.remove('dragover');
    });
    uploadContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadContainer.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });

    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (file.size > 100 * 1024 * 1024) {
        showCustomAlert('File Too Large', 'File size exceeds 100MB limit. Please choose a smaller image.', 'error');
        fileInput.value = '';
        return;
      }

      // Show loading UI
      uploadUi.style.display = 'none';
      uploadSuccess.style.display = 'none';
      uploadStatus.style.display = 'flex';
      isUploading = true;

      try {
        const base64Data = await getBase64(file);
        const base64String = base64Data.split(',')[1];

        const customerName = document.getElementById('f-name')?.value.trim() || 'Unknown';
        const safeName = customerName.replace(/[^a-z0-9]/gi, '_');
        const finalFileName = safeName + '_' + file.name;

        const payload = {
          action: "upload",
          name: finalFileName,
          type: file.type,
          base64: base64String
        };

        const response = await fetch(GAS_URL, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'text/plain;charset=utf-8' // Prevents CORS preflight
          }
        });

        const result = await response.json();

        if (result.status === 'success') {
          uploadStatus.style.display = 'none';
          uploadSuccess.style.display = 'flex';
          photoUrlInput.value = result.url;
        } else {
          throw new Error(result.message || 'Unknown error');
        }
      } catch (err) {
        console.error('Upload Error:', err);
        showCustomAlert('Upload Failed', 'Failed to upload image. Please try again or check your connection.', 'error');
        uploadStatus.style.display = 'none';
        uploadUi.style.display = 'flex';
        fileInput.value = '';
        photoUrlInput.value = '';
      } finally {
        isUploading = false;
      }
    });

    function getBase64(f) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
  }

  async function submitFormToSheet(paymentStatus, reference) {
    const form = document.getElementById('booking-form');
    if (!form) return;

    // Gather values
    const name = document.getElementById('f-name')?.value || '';
    const email = document.getElementById('f-email')?.value || '';
    const phone = document.getElementById('f-phone')?.value || '';
    const state = document.getElementById('f-state')?.value || '';

    const checkedTier = form.querySelector('input[name="tier"]:checked');
    const tier = checkedTier?.value || 'collector';

    const frameSelect = document.getElementById('f-frame');
    const frameWrap = frameSelect?.closest('.form-group');
    const frame = frameSelect && frameWrap && frameWrap.style.display !== 'none' ? frameSelect.options[frameSelect.selectedIndex].text : 'N/A';

    const colorSelect = document.getElementById('f-subjects');
    const colorWrap = colorSelect?.closest('.form-group');
    const color = colorSelect && colorWrap && colorWrap.style.display !== 'none' ? colorSelect.options[colorSelect.selectedIndex].text : 'N/A';

    const address = document.getElementById('f-address')?.value || '';
    const notes = document.getElementById('f-notes')?.value || '';
    const photoUrlInput = document.getElementById('f-photo-url');
    const photoUrl = photoUrlInput && photoUrlInput.value ? photoUrlInput.value : 'N/A';

    const payload = {
      action: "submitForm",
      name: name,
      email: email,
      phone: phone,
      state: state,
      tier: tier.toUpperCase(),
      frame: frame,
      color: color,
      address: address,
      notes: notes,
      photoUrl: photoUrl,
      paymentStatus: paymentStatus,
      reference: reference
    };

    try {
      const response = await fetch(GAS_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
      });
      const result = await response.json();
      if (result.status !== 'success') {
        throw new Error(result.message || 'Error from Google Script');
      }
      return result;
    } catch (e) {
      console.error("Failed to submit to sheet:", e);
      throw e;
    }
  }

  // ===== MANUAL PAYMENT INTEGRATION =====
  const manualPaymentModal = document.getElementById('manual-payment-modal');
  const timerEl = document.getElementById('payment-timer');
  const manualPaymentAmount = document.getElementById('manual-payment-amount');
  const sentMoneyBtn = document.getElementById('sent-money-btn');
  const cancelPaymentBtn = document.getElementById('cancel-payment-btn');
  let paymentTimerInterval = null;

  function startPaymentTimer() {
    if (paymentTimerInterval) clearInterval(paymentTimerInterval);
    let timeLeft = 600; // 10 minutes in seconds
    updateTimerDisplay(timeLeft);

    paymentTimerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(paymentTimerInterval);
        manualPaymentModal.style.display = 'none';
        showCustomAlert('Time Expired', 'The payment window has closed. Please submit the form again to generate a new payment request.', 'warning');
      } else {
        updateTimerDisplay(timeLeft);
      }
    }, 1000);
  }

  function updateTimerDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (timerEl) {
      timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  }

  const payBtn = document.getElementById('pay-btn');
  if (payBtn) {
    payBtn.addEventListener('click', e => {
      e.preventDefault();
      const form = document.getElementById('booking-form');
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (typeof isUploading !== 'undefined' && isUploading) {
        showCustomAlert('Upload In Progress', 'Please wait for your photo to finish uploading before proceeding.', 'info');
        return;
      }
      if (photoUrlInput && !photoUrlInput.value) {
        showCustomAlert('Missing Photo', 'Please upload your reference photo before proceeding to payment.', 'info');
        return;
      }

      const photoUrl = photoUrlInput ? photoUrlInput.value : 'None attached';
      const email = document.getElementById('f-email')?.value || '';
      const checkedTier = form.querySelector('input[name="tier"]:checked');
      const tier = checkedTier?.value || 'collector';

      const hasFrame = document.getElementById('f-frame') && document.getElementById('f-frame').value !== 'no';
      let fullPrice = 0;
      if (tier === 'muse') {
        fullPrice = 0;
      } else if (tier === 'collector') {
        fullPrice = hasFrame ? 10000 : 7000;
      } else if (tier === 'patron') {
        fullPrice = hasFrame ? 20000 : 15000;
      }

      const amount = fullPrice * 0.6; // 60% deposit

      if (amount === 0) {
        payBtn.textContent = 'Processing...';
        payBtn.disabled = true;
        submitFormToSheet("Free", "N/A").then(() => {
          const name = document.getElementById('f-name').value;
          const email = document.getElementById('f-email').value;

          return sendConfirmationEmail('muse', buildMuseEmailData(name, email))
            .catch(() => {})
            .finally(() => {
              showCustomAlert('Slot Reserved!', 'Your Muse (Competition) slot has been securely booked and recorded! We will contact you at ' + email, 'success', () => {
                window.location.reload();
              });
              payBtn.innerHTML = `Click here to enter into the Muse Slot`;
              payBtn.disabled = false;
            });
        }).catch(err => {
          showCustomAlert('Google Sheets Error', 'Failed to save to Google Sheets!\n\nError: ' + err.message + '\n\nMake sure your Google Apps Script is deployed as a "New version"!', 'error');
          payBtn.innerHTML = `Click here to enter into the Muse Slot`;
          payBtn.disabled = false;
        });
        return;
      }

      // Show Manual Payment Modal
      if (manualPaymentModal && manualPaymentAmount) {
        manualPaymentAmount.textContent = `₦${amount.toLocaleString()}`;
        manualPaymentModal.style.display = 'flex';
        startPaymentTimer();
      }
    });
  }

  if (cancelPaymentBtn) {
    cancelPaymentBtn.addEventListener('click', () => {
      manualPaymentModal.style.display = 'none';
      if (paymentTimerInterval) clearInterval(paymentTimerInterval);
    });
  }

  if (sentMoneyBtn) {
    sentMoneyBtn.addEventListener('click', () => {
      const form = document.getElementById('booking-form');
      const checkedTier = form.querySelector('input[name="tier"]:checked');
      const tier = checkedTier?.value || 'collector';
      const statusText = (tier === 'collector' ? 'Collector' : 'Patron') + ' (Manual Transfer)';
      const reference = 'MANUAL_' + Date.now();

      sentMoneyBtn.textContent = 'Verifying...';
      sentMoneyBtn.disabled = true;
      if (paymentTimerInterval) clearInterval(paymentTimerInterval);

      submitFormToSheet(statusText, reference).then(() => {
        const name        = document.getElementById('f-name').value;
        const email       = document.getElementById('f-email').value;
        const frameVal    = document.getElementById('f-frame').value;
        const colourVal   = document.getElementById('f-subjects').value;
        const isFramed    = frameVal !== 'no';
        const frameType   = frameVal === 'simple' ? 'Wooden Frame' : 'Borderless Frame';
        const frameColour = colourVal === '1' ? 'Black & Gold' : 'White & Gold';

        let emailPromise = Promise.resolve();
        if (tier === 'muse') {
          emailPromise = sendConfirmationEmail('muse', buildMuseEmailData(name, email));
        } else if (tier === 'collector') {
          emailPromise = sendConfirmationEmail('collector',
            buildCollectorEmailData(name, email, isFramed, frameType, frameColour, reference)
          );
        } else if (tier === 'patron') {
          emailPromise = sendConfirmationEmail('patron',
            buildPatronEmailData(name, email, isFramed, frameType, frameColour, reference)
          );
        }

        return emailPromise.catch(() => {}).then(() => {
          window.location.href = 'booking-success.html?ref=' + reference;
        });
      }).catch((err) => {
        showCustomAlert('Error', 'Failed to submit booking.\n\nError: ' + err.message, 'error', () => {
          sentMoneyBtn.textContent = "I've Sent The Money";
          sentMoneyBtn.disabled = false;
        });
      });
    });
  }
  // ===== CONTACT FORM =====

  // Form submission now uses Formspree via native POST from the contact form.

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          let count = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            el.textContent = Math.floor(count) + suffix;
          }, 20);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));
  }

  // ===== CURSOR GLOW (DESKTOP ONLY) =====
  if (window.innerWidth > 1024) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed; pointer-events: none; z-index: 9998;
      width: 300px; height: 300px; border-radius: 50%;
      background: radial-gradient(circle, rgba(247,227,200,0.04) 0%, transparent 70%);
      transform: translate(-50%, -50%); transition: left 0.15s ease, top 0.15s ease;
      left: -999px; top: -999px;
    `;
    document.body.appendChild(glow);
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive: true });
  }

});
