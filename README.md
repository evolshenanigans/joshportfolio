# Wahnahbe — Joshua Gutierrez

Personal creator hub for **Joshua Gutierrez** — data scientist / ML engineer.
Live at [b3soft.vercel.app](https://b3soft.vercel.app).

> _"Fun, useful AI — built & explained in public."_

---

## What it is

**Wahnahbe** (ワナビー) is a single-column typed-feed site. The homepage opens on a scroll-driven canvas descent through Neo-Tokyo, then lands in a reverse-chronological feed of build logs, project updates, videos, and posts. Project case studies live at `/p/[slug]`.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind v4** — CSS-variable design tokens, `@theme inline`
- **Lenis + GSAP ScrollTrigger** — smooth scroll and the pinned hero scrub, driven from one shared ticker
- **next-mdx-remote** + **gray-matter** — MDX content layer
- **Zod** — frontmatter validation (feed posts *and* project case studies)
- **Vitest** + **Testing Library** — unit + component tests

## Feed / post model

All posts are MDX files in `content/feed/` with Zod-validated frontmatter. Five post types:

| Type | When to use |
|------|-------------|
| `build` | Project in progress |
| `ship` | Project shipped |
| `video` | YouTube video |
| `post` | Instagram / image post |
| `log` | Short text log entry |

To add a post: create `content/feed/YYYY-MM-DD-slug.mdx` with the appropriate frontmatter (see `lib/posts/schema.ts`). The loader picks it up automatically, validates, and sorts newest-first.

Project case studies live in `content/projects/*.mdx` and render at `/p/[slug]`.

## Hero

`<CityHero>` renders `<CityDescent>` — a GSAP ScrollTrigger-pinned canvas that scrubs through a committed WebP frame sequence (240 desktop frames at 1600×900, 150 portrait mobile frames) as you scroll, descending from above the clouds to The Rust. District title cards swap as you pass each layer of the city. The first frame is SSR-preloaded; the rest stream in a coarse-then-fill order so slow networks still paint. `prefers-reduced-motion` gets a static frame instead. `CityHero` is a swap boundary — the renderer can be replaced (e.g. with an R3F scene) without touching callers.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (zero-error gate)
npm run lint    # eslint
npm test        # vitest
```

## Design tokens

All colors are CSS variables in `app/globals.css`, exposed to Tailwind via `@theme inline`. Use tokens — never hardcode hex.

| Token | Value | Role |
|-------|-------|------|
| `--bg` | `#05080a` | Page background |
| `--accent` | `#19e6ff` | Cyan highlight |
| `--accent-2` | `#ffb020` | Amber accent |
| `--text` | `#eafcff` | Primary text |
| `--text-muted` | `#6c8a90` | Secondary text |
| `--line` | `rgba(25,230,255,0.20)` | Borders |

Fonts: **Inter** (sans) + **JetBrains Mono** (mono).

## License

Personal portfolio. Content (copy, resume) © Joshua Gutierrez. Code is MIT — fork freely.
