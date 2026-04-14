# HendrixArts — #ARTISNOTARISTOCRATIC Campaign Website

## 📁 Project Structure

```
hendrix-arts/
├── index.html              ← Home page
├── css/
│   ├── style.css           ← Global design system, header, footer, utilities
│   ├── home.css            ← Home page specific styles
│   └── pages.css           ← All inner pages (gallery, about, booking, contact, faq)
├── js/
│   ├── components.js       ← Header + footer injection, shared HTML
│   └── main.js             ← All interactivity (nav, scroll, FAQ, gallery, Paystack)
└── pages/
    ├── gallery.html        ← Portfolio gallery with filter + lightbox
    ├── about.html          ← Movement story, founder profile, team
    ├── booking.html        ← Booking form with Paystack payment
    ├── contact.html        ← Contact form + info
    ├── faq.html            ← FAQ accordion with category filter
    └── booking-success.html ← Payment success confirmation page
```

## 🎨 Brand Colors

- **Navy (Primary):** `#020035`
- **White:** `#ffffff`
- **Warm (Accent):** `#f7e3c8`
- **Cool (Accent):** `#c6d9ec`
- **Gold:** `#d4a843`

## 💳 Paystack Setup

1. Sign up at [paystack.com](https://paystack.com)
2. Get your **Public Key** from the dashboard
3. Open `js/main.js` and replace the placeholder:
   ```js
   key: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
   ```
   with your actual Paystack public key (`pk_live_...` for production)

## 🖼️ Adding Real Images

Replace all `.img-placeholder` elements with actual `<img>` tags:
```html
<!-- Before -->
<div class="img-placeholder" style="...">...</div>

<!-- After -->
<img src="../images/portrait-1.jpg" alt="Portrait Commission" style="width:100%; height:100%; object-fit:cover;" />
```

Upload images to the `/images/` folder.

## 👥 Adding Team Members

In `pages/about.html`, find the `.team-grid` section and add cards:
```html
<div class="team-card">
  <div class="team-card-img">
    <img src="../images/team-name.jpg" alt="Member Name" style="width:100%;height:100%;object-fit:cover;" />
  </div>
  <div class="team-card-info">
    <div class="team-card-name">Member Full Name</div>
    <div class="team-card-role">Their Role</div>
  </div>
</div>
```

## 📱 Responsive

Fully responsive across:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Wide (1440px+)

## 🚀 Deployment

Simply upload the entire `hendrix-arts/` folder to any web host:
- **Netlify** (drag & drop)
- **GitHub Pages** (push to repo)
- **cPanel** hosting
- Any static file server

No build step required — pure HTML/CSS/JS.
