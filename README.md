# Asset Care London — Local Trade Business Site (Demo Build)

A capability demo built to show what a full local-service-business website
looks like: instant quote calculator, booking scheduler, service pages,
service-area SEO pages, and a UK Boiler Upgrade Scheme grant calculator.

**This is a demo/template build, not a real client's live production site.**
The company, director, registration number, and customer reviews in the data
files are illustrative placeholders used to demonstrate the site structure.

## Live Demo
[add your deployed link here]

## What's real vs. simulated
- ✅ Instant quote calculator — real branching pricing logic (`utils/pricingEngine.js`), calculated client-side
- ✅ Heat pump / BUS grant calculator — real calculation logic
- ✅ Full routing, SEO metadata + JSON-LD schema per page, code-splitting via lazy-loaded routes
- ✅ Contact form — submits to a real endpoint and shows accurate success/failure states
- ⚠️ Booking scheduler — UI/flow complete, backend persistence not yet wired up
- ⚠️ CRM lead push (`crmService.js`) — built to integrate with HubSpot's API; currently targets a placeholder endpoint

## Stack
- **Frontend:** React 18 + Vite, React Router, Tailwind CSS
- **Icons:** lucide-react
- **Deployment:** [pick one — Vercel, Netlify, or GitHub Pages — and remove the other configs]

## Architecture note worth knowing
Pricing logic lives in a pure function (`utils/pricingEngine.js`) completely
decoupled from the UI layer, so the same estimator could be reused in a
booking flow, an admin quote tool, or a backend validation step without
touching any component code.

## Setup
```bash
npm install
npm run dev
```

## Roadmap
- [ ] Wire booking scheduler to a real backend/DB
- [ ] Connect CRM lead push to a live HubSpot (or equivalent) integration
- [ ] Add form-submission tests
