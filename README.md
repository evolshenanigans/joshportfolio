# Wahnahbe — Joshua Gutierrez

Personal creator hub for **Joshua Gutierrez** — data scientist / ML engineer.
Live at [b3soft.vercel.app](https://b3soft.vercel.app).

> _"Fun, useful AI — built & explained in public."_

---

## What it is

**Wahnahbe** (ワナビー) is a single-column typed-feed site. The homepage shows a layered-parallax Neo-Tokyo hero followed by a reverse-chronological feed of build logs, project updates, videos, and posts. Project case studies live at `/p/[slug]`.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind v4** — CSS-variable design tokens, `@theme inline`
- **Lenis** — smooth scroll
- **next-mdx-remote** + **gray-matter** — MDX content layer
- **Zod** — frontmatter validation
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

`<CityHero>` uses three layered PNG plates (`public/megacity.png`, `public/skyline.png`, `public/undergroundtransit.png`) with pointer + scroll parallax. On reduced-motion or coarse-pointer devices it falls back to a single static plate or scroll-only drift. The parallax renderer is a swap boundary — it can be replaced with an R3F scene without touching the outer component.

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
