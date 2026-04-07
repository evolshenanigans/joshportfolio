# joshportfolio

Personal portfolio for **Joshua Gutierrez** — data scientist / ML engineer.
Live at [b3soft.vercel.app](https://b3soft.vercel.app).

> _"Data scientist by training. Translator by trade. From English major to ML engineer — I build models that explain themselves, because someone has to."_

---

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind v4** with CSS-variable design tokens
- **React Three Fiber** + **drei** + **@react-three/postprocessing** — 3D scenes
- **GSAP** + **ScrollTrigger** — scroll-driven animation and the horizontal "Arc" pin
- **Lenis** — wheel-normalized smooth scroll, synced to GSAP's ticker
- **Fraunces** + **Inter** via `next/font/google`

## Sections

| # | ID | What it is |
|---|----|------------|
| 00 | `#open` | Cold open — morphing 3D scene (chalk → keyboard → neural net) |
| 01 | `#manifesto` | Split-word headline reveal |
| 02 | `#arc` | Horizontal pinned timeline: Teacher → Engineer → Scientist |
| 03 | `#work` | Selected projects with drag-to-orbit 3D scene per project |
| 04 | `#toolbox` | Editorial skills list, grouped by category |
| 05 | `#numbers` | Animated stat counters |
| 06 | `#contact` | Email · GitHub · LinkedIn · Resume |

All content lives in [`lib/data.ts`](./lib/data.ts) as the single source of truth.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (must pass with zero errors)
npm run lint    # eslint
```

## Project structure

```
app/
  layout.tsx          # root + LenisProvider + fonts + metadata
  page.tsx            # all 7 sections in sequence
  globals.css         # design tokens (--bg, --accent, --text, ...)
  opengraph-image.tsx # edge-runtime OG image
components/
  ArcRail.tsx         # pinned horizontal timeline
  HeadlineReveal.tsx  # GSAP word-split reveal
  ScrollReveal.tsx    # fade-up on scroll
  SectionNav.tsx      # floating side-dot nav
  StatCounter.tsx     # count-up on view
  three/
    ColdOpen.tsx      # morphing hero scene
    ProjectCanvas.tsx # per-project 3D preview (lazy-mounted)
    projectScenes.tsx # scene definitions
lib/
  data.ts             # projects, timeline, stats, skills, contact
  lenis.tsx           # Lenis + GSAP ticker integration
  utils.ts
public/
  2026resume.pdf
  cafepicremoved.png
```

## Design tokens

All colors and type tokens are CSS variables defined in `app/globals.css` and
exposed to Tailwind via `@theme inline`. New components should use the tokens,
never hardcoded hex values.

| Token | Purpose |
|-------|---------|
| `--bg` / `--surface` | Page + card backgrounds |
| `--accent` / `--accent-dim` | Cyan highlights, rules, glow |
| `--text` / `--text-muted` | Primary + secondary text |
| `--rule` | Subtle borders |

## Performance notes

- **Lenis smooth scroll** runs in lerp mode (`lerp: 0.15`) and is driven off
  `gsap.ticker.add(...)` so ScrollTrigger `scrub` and `pin` stay perfectly
  synced. Wheel deltas are normalized for cross-browser consistency.
- **R3F canvases** are lazy-mounted via `IntersectionObserver` — each scene
  only boots when it scrolls near the viewport.
- **Reduced motion**: every GSAP and auto-play effect honors
  `prefers-reduced-motion: reduce` with an instant-state fallback.
- **Mobile**: `dpr` capped at `1.5`, postprocessing kept minimal.

## Deploy

Pushes to `main` auto-deploy via Vercel. For first-time setup:

```bash
# Option A: Vercel dashboard
# https://vercel.com/new → import this repo → project name: b3soft

# Option B: Vercel CLI
npm i -g vercel
vercel login
vercel --prod
```

After deploying, update `metadataBase` in `app/layout.tsx` if the production
URL changes.

## License

Personal portfolio. Content (copy, photo, resume) © Joshua Gutierrez.
Code is MIT — fork freely if any of it is useful to you.
