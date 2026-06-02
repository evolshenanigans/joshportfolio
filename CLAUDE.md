# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build — MUST pass with zero TypeScript + lint errors
npm run lint      # ESLint check
npm test          # Vitest (unit + component smoke tests)
```

Run `npm run build` after every component change. Zero errors is the gate — a task is not done until the build is clean.

## Architecture

**Wahnahbe** is a single-column typed-feed builder/creator hub for Joshua Gutierrez. Next.js 16 App Router, TypeScript, Tailwind v4, Lenis smooth scroll.

### Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | `<CityHero>` over `<Feed>` |
| `/about` | `app/about/page.tsx` | Bio, arc timeline, resume link |
| `/p/[slug]` | `app/p/[slug]/page.tsx` | Project case study (MDX) |

### Hero — `components/hero/`

`<CityHero>` is a layered-parallax Neo-Tokyo hero with two rendering paths:

- **`<ParallaxScene>`** (`components/hero/ParallaxScene.tsx`) — default, pointer + scroll parallax across 3 PNG plates in `public/` (`skyline.png`, `megacity.png`, `undergroundtransit.png`). Mobile/coarse-pointer: scroll-only drift. Respects `prefers-reduced-motion` by skipping setup.
- **`<StaticScene>`** (inline in `CityHero.tsx`) — single still plate, CSS-gated with `motion-safe:hidden` / `motion-reduce:hidden`, no JS. Shown when `prefers-reduced-motion: reduce` is set.

This boundary is an intentional **swap point**: `ParallaxScene` can be replaced with an R3F/Three.js renderer later without touching `CityHero`.

HUD chrome lives in `components/hero/HeroHud.tsx` and `components/hero/heroFx.tsx` (camera grid overlay, visibility rail).

### Feed + Post taxonomy — `components/feed/`

The feed renders a reverse-chronological list of typed posts. Every post is one MDX file in `content/feed/`. Post types:

| Type | Schema | Card |
|------|--------|------|
| `build` / `ship` | `buildSchema` | `BuildCard` |
| `video` | `videoSchema` | `VideoCard` |
| `post` | `igSchema` | `PostCard` |
| `log` | `logSchema` | `LogCard` |

**Adding a post:** create `content/feed/YYYY-MM-DD-slug.mdx` with Zod-validated frontmatter (see `lib/posts/schema.ts`). The loader (`lib/posts/load.ts`) reads all `.mdx` files in `content/feed/`, validates frontmatter, sorts newest-first, and returns `Post[]`. No config or registration needed.

**Project case studies:** live in `content/projects/*.mdx` and are rendered at `/p/[slug]` via `lib/projects/load.ts`.

### HUD primitives — `components/hud/`

- `TopBar` — site name + kana + nav links
- `CornerFrame` — decorative corner-bracket wrapper (used in `/about`)
- `TypeTag` — color-coded badge per post type

### Data

- `lib/site.ts` — `site` object (name, socials, resume URL) and `about` object (bio + arc)
- `lib/posts/schema.ts` — Zod schemas + `Post` type (source of truth for types)
- `lib/posts/load.ts` — server-only MDX loader (`import "server-only"`)
- `lib/posts/filter.ts` — filter chips logic
- `lib/posts/relativeTime.ts` — date → human label
- `lib/lenis.tsx` — `LenisProvider` client component; wraps app in `app/layout.tsx`

## Design Tokens

All tokens are CSS variables defined in `app/globals.css` and exposed as Tailwind color utilities via `@theme inline`. **Always use tokens — never hardcode hex values.**

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#05080a` | Page background |
| `--surface` | `#0a0e12` | Card fills |
| `--surface-2` | `#0c1316` | Deeper card / video placeholder |
| `--accent` | `#19e6ff` | Cyan highlight, borders, tag-build color |
| `--accent-2` | `#ffb020` | Amber accent, tag-video color |
| `--text` | `#eafcff` | Primary text |
| `--text-muted` | `#6c8a90` | Secondary / label text |
| `--line` | `rgba(25,230,255,0.20)` | Subtle cyan borders |
| `--tag-build` | `#19e6ff` | TypeTag: build |
| `--tag-ship` | `#21e6c4` | TypeTag: ship |
| `--tag-video` | `#ffb020` | TypeTag: video |
| `--tag-post` | `#7fdfff` | TypeTag: post |
| `--tag-log` | `#6c8a90` | TypeTag: log |

**Fonts:** Inter (`--font-inter`, `font-sans`) and JetBrains Mono (`--font-jetbrains`, `font-mono`) — loaded via `next/font/google` in `app/layout.tsx`.

## Testing

Vitest + Testing Library (jsdom). Tests live in `test/`. Run with `npm test`.

- `test/posts/` — unit tests for schema, loader, filter, relativeTime
- `test/feed/` — component smoke tests for card components and PostRow
- `test/smoke.test.ts` — harness sanity check

Mock for `server-only`: `test/__mocks__/server-only.ts` (no-op, re-aliased in `vitest.config.ts`).
