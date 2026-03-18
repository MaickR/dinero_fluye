# Dinero Fluye — Bilingual Landing Page

<div align="center">

[![Status](https://img.shields.io/badge/status-live-brightgreen)](https://maickr.github.io/dinero_fluye/)
[![Version](https://img.shields.io/badge/version-2.0.0-blue)](#)
[![License](https://img.shields.io/badge/license-Private-red)](#)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](#)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?logo=bootstrap&logoColor=white)](#)

**Professional conversion landing page for the "Dinero Fluye" group financial transformation program**  
*by [Mundo Holistico USA](https://www.instagram.com/mundoholisticousaoficial/)*

[Live Site (ES)](https://maickr.github.io/dinero_fluye/) &nbsp;|&nbsp; [Live Site (EN)](https://maickr.github.io/dinero_fluye/en/) &nbsp;|&nbsp; [Contact](mailto:mundoholisticousa@gmail.com)

</div>

---

## Overview

**Dinero Fluye** ("Money Flows") is a 7-week group coaching program that transforms participants' relationship with money and abundance. This repository contains the complete bilingual landing page — Spanish (primary) and English — built as a static site hosted on GitHub Pages.

The page is engineered around a proven conversion funnel: it guides visitors from awareness to WhatsApp enrollment using strategic CTAs, social proof, program methodology, and transparent pricing.

---

## Key Features

| Feature | Details |
|---|---|
| **Bilingual** | Full Spanish + English versions with `hreflang` SEO alternates |
| **Responsive** | Mobile-first layout; tested at 320px–2500px |
| **Language Switcher** | Elegant pill (desktop) + offcanvas row (mobile) with FA globe icon |
| **WhatsApp CTAs** | 6 pre-filled messages adapted per action (ES & EN) |
| **Payment Integration** | Square payment links + QR codes per plan |
| **Conversion Funnel** | AIDA structure across 10 sections |
| **SEO** | Open Graph, Twitter Card, JSON-LD schema, canonical, sitemap |
| **Performance** | Deferred scripts, preconnect hints, DOM-relative preloading |
| **Animations** | AOS (Animate On Scroll) — no jank, respects reduced-motion |

---

## Live URLs

| Language | URL |
|---|---|
| Spanish (default) | https://maickr.github.io/dinero_fluye/ |
| English | https://maickr.github.io/dinero_fluye/en/ |

---

## Color Palette

Colors chosen for financial psychology and trust:

| Variable | Hex | Role |
|---|---|---|
| `--verde-oscuro` | `#0a3d34` | Primary — prosperity, growth |
| `--dorado` | `#cba35d` | Accent — premium value, wealth |
| `--beige` | `#f5f1e8` | Background — warmth, calm |
| `--gris-texto` | `#5a6c68` | Body text — readability |

---

## Page Sections

```
Landing Page
├── Hero              — Value proposition + primary CTA
├── Urgency Banner    — Scarcity & limited availability
├── Pain Points       — Audience identification
├── Methodology       — 7-week program breakdown
├── Instructor        — Isabela Tena's credibility & bio
├── Comparison        — Group vs Individual (save $1,000)
├── Pricing           — Payment options ($1,500 / $1,650)
├── FAQ               — Objection handling
├── Orientation Talk  — Free lead magnet
└── Footer            — Final CTAs + legal links
```

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| HTML5 | — | Semantic structure |
| CSS3 | — | Custom styles & animations (~4,100 lines) |
| JavaScript | ES6+ | App class — scroll, lazy-load, preload |
| Bootstrap | 5.3.3 | Responsive grid & components |
| AOS | 2.3.1 | Scroll-triggered animations |
| Font Awesome | 6.5.1 | Icons (including globe for lang switcher) |
| Google Fonts | — | Playfair Display + Lato |

All dependencies loaded from CDN — no build tools, no npm required.

---

## Project Structure

```
dinero_fluye/
├── index.html              # Spanish landing page (primary)
├── README.md
├── robots.txt              # Crawler rules
├── sitemap.xml             # Sitemap for indexation
│
├── en/
│   └── index.html          # English landing page
│
└── assets/
    ├── img/
    │   ├── logo-Mundoholistico.png
    │   └── isabela-tena.jpeg
    ├── style/
    │   └── style.css       # All custom styles
    └── js/
        └── main.js         # DineroFluyeApp class
```

---

## Local Development

No build step required — just serve the files:

```bash
# Clone
git clone https://github.com/MaickR/dinero_fluye.git
cd dinero_fluye

# Option A — Python
python -m http.server 8000

# Option B — Node.js
npx http-server

# Option C — VS Code
# Install "Live Server" extension, right-click index.html > Open with Live Server
```

> **Important:** Always use a local server (not `file://`) to avoid CORS issues with fonts and assets.

---

## SEO Implementation

- `hreflang` alternates on both pages (`es`, `en`, `x-default`)
- `canonical` URLs per page
- Open Graph + Twitter Card meta tags
- JSON-LD structured data: `Organization`, `Course`, `WebSite`
- `robots.txt` + `sitemap.xml`

---

## Conversion Funnel

```
Awareness  (Hero + Urgency)       100% visitors
   |
Interest   (Pain Points)           ~70%
   |
Desire     (Methodology + Value)   ~40%
   |
Action     (WhatsApp CTAs)         15-25% conversion target
```

**CTA Map:**

| Button | Section | Destination |
|---|---|---|
| Main Enrollment | Navbar / Hero | WhatsApp (direct enrollment) |
| Payment Plan | Pricing | WhatsApp (3x $550/month) |
| Full Payment | Pricing | WhatsApp ($1,500 one-time) |
| Free Talk | Orientation section | WhatsApp (register for talk) |
| FAQ Question | FAQ | WhatsApp (general questions) |
| Floating Button | Always visible | WhatsApp (general info) |

---

## Deployment Notes

This site is hosted on **GitHub Pages** (static hosting).

- `.htaccess` is not applicable on GitHub Pages (removed in v2.0)
- For advanced caching and compression headers, deploy to Apache, Netlify, Vercel, or Cloudflare Pages
- All asset paths in `en/index.html` reference `../assets/` (relative to subdirectory)
- `main.js` derives asset base path from the DOM logo `src` — safe from any subdirectory

---

## Contact

**Mundo Holistico USA**
- Instagram: [@mundoholisticousaoficial](https://www.instagram.com/mundoholisticousaoficial/)
- Email: mundoholisticousa@gmail.com

---

## License

Private — All rights reserved. This codebase is proprietary to Mundo Holistico USA.

---

<div align="center">

[Back to top](#dinero-fluye--bilingual-landing-page)

</div>
