# Asset Care London Ltd | Commercial & Domestic Property Engineering

[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Serverless-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![HubSpot CRM](https://img.shields.io/badge/HubSpot-CRM_API_v3-FF7A59?style=for-the-badge&logo=hubspot)](https://www.hubspot.com/)

Official high-performance web platform and digital service dispatch system for **Asset Care London Ltd** (UK Company #`17167498`, 118 Gordon Road, Basildon, Essex, SS14 1PR).

Specializing in **Gas Safe boiler replacements**, **Renewable Energy** (LG Therma V R290 Heat Pumps, Trianco Aztec electric heating, Solar PV & battery storage), commercial HVAC, plumbing, and **24/7 emergency callout services** across Greater London, Essex, and Nationwide UK.

---

## 🏛️ System Architecture

```
Assetcarelondon/
├── api/                        # Vercel Serverless Functions
│   └── submit-lead.js          # HubSpot CRM API v3 lead proxy (Contacts & Deals)
├── public/                     # Static media, illustrations, sitemap.xml, robots.txt
├── src/
│   ├── components/             # Reusable UI widgets, calculators, and brand elements
│   │   ├── BrandCarousel.jsx   # Manufacturer accreditations (Worcester, Vaillant, etc.)
│   │   ├── CookieConsent.jsx   # UK GDPR Cookie management
│   │   ├── HeatPumpCalculator.jsx # Eco savings & R290 efficiency calculator
│   │   ├── QuoteCalculator.jsx # Multi-step instant estimate wizard
│   │   ├── WhatsAppWidget.jsx  # Floating instant chat lead generator
│   │   └── illustrations/      # Custom SVG engineering schematics
│   ├── data/                   # Service definitions, regional coverage, FAQ data
│   │   ├── constants.js        # Company registration, phone, and address constants
│   │   ├── pricingEngine.js    # Decoupled algorithmic cost estimator
│   │   └── serviceAreasData.js # London boroughs & Essex district SEO datasets
│   ├── pages/                  # Route views (Home, About, Services, Emergency, Quote, Book, Grants)
│   ├── services/
│   │   └── crmService.js       # Client-side CRM submission dispatcher
│   ├── App.jsx                 # Lazy-loaded code-splitting route switcher
│   └── main.jsx                # Application root mounting
├── tailwind.config.js          # Bespoke obsidian-dark architectural theme
└── vercel.json                 # Routing & rewrite proxy configurations
```

---

## ✨ Key Capabilities

- **Instant Quote Estimator**: Built-in algorithmic engine calculating realistic price brackets for combi boilers, system boilers, heat pumps, and unvented hot water cylinders.
- **Decoupled Pricing Architecture**: Pricing logic lives in a pure function (`src/utils/pricingEngine.js`) completely decoupled from the UI layer, enabling reuse across booking flows and admin tools without touching view components.
- **HubSpot CRM Pipeline Automation**: Direct sync creating HubSpot Contacts and Deals in the `appointmentscheduled` pipeline via Vercel serverless proxy with zero external zapier dependencies.
- **24/7 Emergency Dispatch Protocol**: Direct tap-to-call mobile floating interfaces dialing `01268 904 123`.
- **UK Compliance & Standards**:
  - UK GDPR Compliant Cookie Consent modal.
  - Gas Safe disclaimers & Companies House verified credentials.
  - UK Boiler Upgrade Scheme (BUS) £7,500 grant calculator.

---

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run Vite dev server
npm run dev

# 3. Build for production
npm run build
```

---

## 🌐 Environment Variables (Vercel)

| Variable | Description |
| :--- | :--- |
| `HUBSPOT_ACCESS_TOKEN` | HubSpot Private App Access Token with CRM scopes (`crm.objects.contacts.write`, `crm.objects.deals.write`) |

---

## 📜 Legal & Compliance

- **Company**: Asset Care London Ltd
- **Companies House Registration**: 17167498
- **Registered Office**: 118 Gordon Road, Basildon, Essex, SS14 1PR
- **SIC Code**: 43220 — Plumbing, Heat and Air-Conditioning Installation
