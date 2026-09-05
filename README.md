# Oluwafemi Mesioye — Product Manager portfolio

React + Vite + Tailwind CSS + GSAP. Black theme, fully responsive, motion-driven.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into /dist
npm run preview  # preview the production build
```

Node 18 or newer.

## Where to edit content

All copy lives in **`src/data/content.js`** — profile details, bio, skills,
every role and its bullet points, metrics, education and certifications.
Change it there and the whole site updates; you never need to touch the
components for a copy change.

**One thing to fill in:** `profile.linkedin` is empty. The CV had LinkedIn as a
hyperlink, so the actual URL wasn't in the file. Paste the full profile URL
(e.g. `https://www.linkedin.com/in/your-handle`) and the LinkedIn entry will
appear automatically in the contact grid and the footer. Leave it empty and it
stays hidden rather than showing a dead link.

## Structure

```
src/
  App.jsx                 page composition
  index.css               Tailwind layers, base styles, reduced-motion rules
  lib/motion.js           GSAP + ScrollTrigger setup, shared reveal helper
  data/content.js         ALL text content
  components/
    Loader.jsx            page-load counter and curtain wipe
    Nav.jsx               sticky nav + full-screen mobile menu
    Hero.jsx              orchestrated intro, role stack, parallax headline
    Ticker.jsx            looping practice-area marquee
    About.jsx             bio and quick facts
    Practice.jsx          Discover / Deliver / Grow
    Work.jsx              expandable role timeline
    Outcomes.jsx          counting metrics
    Credentials.jsx       certifications and education
    Contact.jsx           contact details
    Footer.jsx
    ScrollProgress.jsx    hairline reading-progress bar
```

## Design notes

- Type: Bricolage Grotesque (display) + Instrument Sans (body), loaded from
  Google Fonts in `index.html`.
- Palette lives in `tailwind.config.js`: true black canvas, warm off-white
  text, a violet used for emphasis and an amber used sparingly in the ambient
  wash.
- Motion is deliberate rather than constant: one orchestrated page-load
  sequence, quiet reveals on section headings only, and interaction motion on
  the role accordion and menu. `prefers-reduced-motion` is fully respected —
  the loader is skipped and all animation is disabled.

## Deploying

Any static host works. Run `npm run build` and upload `dist/`.
For Vercel or Netlify, point at the repo; build command `npm run build`,
output directory `dist`.
