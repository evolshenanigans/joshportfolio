# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build (run after each component change to verify zero errors)
npm run lint      # ESLint check
```

Run `npm run build` after every component change — the PRD and build loop require zero TypeScript and lint errors before a task is considered passing.

## Architecture

Single-page portfolio for Joshua (data scientist / ML engineer). Next.js 16 App Router with TypeScript, Tailwind v4, React Three Fiber, GSAP, and Lenis smooth scroll.

**Page structure:** `app/page.tsx` renders 5 section components in sequence, each with an anchor ID (`#hero`, `#about`, `#skills`, `#projects`, `#contact`).

**Smooth scroll setup:** `lib/lenis.tsx` exports `LenisProvider` — a client component that initializes Lenis and syncs it to GSAP's ScrollTrigger via `lenis.on("scroll", ScrollTrigger.update)` and `gsap.ticker.add`. It wraps the entire app in `app/layout.tsx`.

**3D particle network:** `components/three/SceneWrapper.tsx` is an R3F `Canvas` wrapper. `components/three/ParticleNetwork.tsx` renders 800 particles in a sphere with mouse tilt and scroll-disperse effects. **Critical:** particle position and connection data must be computed at **module level** (outside the component), not inside hooks — ESLint enforces `react-hooks/purity` and will fail the build otherwise.

**Data layer:** All content lives in `lib/data.ts` — a `skills` array (17 items with name, category, level) and a `projects` array (3 items). Sections import directly from here.

**GSAP scroll animations:** Each section component initializes its own `ScrollTrigger` inside a `useEffect` with a cleanup `return () => ctx.revert()`. The trigger is `start: "top 80%"`.

## Design Tokens

All tokens are CSS variables defined in `app/globals.css` and exposed as Tailwind utilities via `@theme inline`:

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#020408` | Page background |
| `--surface` | `#0a0f1a` | Cards, section fills |
| `--accent` | `#00d4ff` | Cyan highlight, borders, glow |
| `--accent-dim` | `#0099bb` | Darker cyan for hover states |
| `--accent-glow` | `rgba(0,212,255,0.15)` | Box-shadow glows |
| `--text` | `#e8f0fe` | Primary text |
| `--text-muted` | `#6b7fa3` | Secondary/label text |
| `--border` | `rgba(0,212,255,0.12)` | Subtle cyan card borders |

Use these tokens (not hardcoded hex values) for all new components.

**Typography:** Space Grotesk (headings, 700) and Inter (body, 400–600) — both loaded via `next/font/google` in `app/layout.tsx`.

## Build Loop (PROMPT.md)

When running the autonomous build loop:
1. Read `activity.md` for current state
2. Find the next failing task in `plan.md`
3. Implement it, run `npm run build` to verify
4. Update `plan.md` (mark task passing) and `activity.md` (log what was done)
5. When all 13 tasks pass, output `<promise>COMPLETE</promise>`

Never skip a failing task. Design tokens must be used exactly as specified. All 13 tasks are currently passing.

## SVG Visualizations

Project cards in `components/sections/Projects.tsx` use **programmatic inline SVGs** — no image files. Each project has a unique visualization: ROC curve (CareGuard), bar chart (Health Tracker), scatter plot (Sports Analytics). Keep visualizations code-generated if adding new projects.
