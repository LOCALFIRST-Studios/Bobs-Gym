# Bob's Gym — website

React + Vite rebuild of [bobsgym.org](https://bobsgym.org/) (originally an ASP.NET WebForms site). All business content — branches, phone numbers, prices, timetable, history, testimonials — was transcribed from the live site and lives in `src/data/`.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/ (also regenerates sitemap, robots, redirects)
npm run preview    # serve dist/ on :4173
npm run lint
npm test           # Vitest unit + component tests
npm run smoke      # Playwright browser checks against a running preview (see below)
npm run images     # regenerate WebP variants after adding/replacing photos
```

Smoke test: `npm run build && npx vite preview --port 4173` in one terminal, then `npm run smoke -- http://localhost:4173 ./screenshots` in another. It visits every route at 375/768/1440px and fails on console errors, broken images, horizontal overflow or a missing `<h1>`, then exercises the menu, timetable, lightbox, BMI calculator, contact validation and legacy redirects.

## Structure

```
src/
  data/          site.js (contacts, branches, copy), pricing.js, schedule.js,
                 gallery.js, routes.js (pages, nav, legacy .aspx map), image-manifest.json (generated)
  components/
    layout/      SiteHeader, SiteFooter, Layout, PageHero, InnerPage (+ Article)
    sections/    Home sections and reusable blocks (Hero, Timetable, MembershipPricing, BranchCard, ContactForm, BmiCalculator…)
    ui/          Img, Button, Tabs, Lightbox, Reveal, DataTable, Brand (logo plates)
  pages/         One component per route
  lib/           bodyMetrics (BMI/BMR/IBW), contactForm, usePageMeta, motion
  styles/        tokens.css (design tokens) → base → layout → components → sections → pages
public/
  gymphotos/, images/   Original site assets at their original paths (old image URLs still work)
  optimized/            Generated WebP variants
```

To change a phone number, price or class time, edit the relevant file in `src/data/` only.

## Images

Original files are never modified. `scripts/optimize-images.mjs` writes responsive WebP copies to `public/optimized/`, and `<Img src="gymphotos/…">` serves them with the original as fallback. The original logo (`public/images/lg.png`) has a black wordmark, so it is always shown on a light "plate" rather than recoloured.

## Configuration

Copy `.env.example` to `.env`:

- `VITE_SITE_URL` — canonical/OG/sitemap base URL (default `https://bobsgym.org`).
- `VITE_CONTACT_ENDPOINT` — optional JSON POST endpoint for the contact form. The original form posted to the ASP.NET server, which is not part of this project. Without an endpoint the form opens the visitor's email app addressed to `support@bobsgym.org`; it never shows a success message unless the endpoint returns 2xx.

## Deployment

It's a static SPA. `npm run build` generates `vercel.json` and `public/_redirects` (Netlify) with 301 redirects from every legacy `*.aspx` URL plus the SPA fallback. Other hosts need an equivalent "serve `index.html` for unknown paths" rule; the app also redirects `.aspx` paths client-side.
