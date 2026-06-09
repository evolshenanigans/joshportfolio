# Wahnahbe Portfolio v3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the v2 editorial portfolio with "Wahnahbe" — a single-column typed-feed builder/creator hub in a "Neon Circuit" cyberpunk aesthetic, fronted by a layered-parallax Neo-Tokyo hero.

**Architecture:** Next.js 16 App Router, static. Content is file-per-post MDX with Zod-validated frontmatter, loaded by a server module. The homepage is a hero (`<CityHero>` boundary, parallax now / R3F-swappable later) over a typed feed. Pages: `/`, `/about`, `/p/[slug]`. Design tokens are CSS variables exposed to Tailwind v4 via `@theme inline`.

**Tech Stack:** Next.js 16 + TypeScript + Tailwind v4 (retained); add `zod`, `gray-matter`, `next-mdx-remote`; `next/font` (Inter + JetBrains Mono); Vitest + Testing Library (new, for logic + smoke tests).

**Spec:** `docs/superpowers/specs/2026-06-01-wahnahbe-portfolio-design.md`. **Branch:** `redesign/wahnahbe`.

**Per-task gate:** `npm run build` must pass with zero TypeScript/lint errors; `npm test` must pass where tests exist.

---

## File Structure

**Create**
```
lib/posts/schema.ts          # Zod schemas + Post types (discriminated union)
lib/posts/load.ts            # fs read + gray-matter + validate + sort (server-only)
lib/posts/relativeTime.ts    # ISO date -> "5d", "now"
lib/posts/filter.ts          # filter posts by chip group
lib/projects/load.ts         # load project case-study MDX by slug
content/feed/*.mdx           # one file per feed post (seed set)
content/projects/*.mdx       # project case studies (Japanese Tutor seeded)
components/hud/TopBar.tsx     # fixed HUD nav
components/hud/CornerFrame.tsx# HUD corner-bracket wrapper
components/hud/Scanlines.tsx  # scanline overlay
components/hud/TypeTag.tsx    # post type pill
components/feed/Feed.tsx
components/feed/FilterChips.tsx
components/feed/PostRow.tsx          # left gutter (tag+date) + right slot
components/feed/cards/BuildCard.tsx  # build + ship
components/feed/cards/VideoCard.tsx
components/feed/cards/PostCard.tsx
components/feed/cards/LogCard.tsx
components/hero/CityHero.tsx         # boundary; chooses parallax vs static
components/hero/ParallaxScene.tsx    # the 3-plate parallax (client)
components/hero/HeroHud.tsx          # wordmark, pill, links, rail, descend
components/hero/heroFx.tsx           # scanlines, camera-grid, embers
app/about/page.tsx
app/p/[slug]/page.tsx
lib/site.ts                  # site data: links, socials, projects index, about copy
test/setup.ts                # vitest + jest-dom
vitest.config.ts
```

**Modify**
```
app/globals.css     # replace editorial tokens with Neon Circuit tokens
app/layout.tsx      # fonts (Inter+JetBrains Mono), metadata, TopBar, providers
app/page.tsx        # hero + feed
lib/data.ts         # repurpose -> projects index consumed by lib/site.ts (or fold in)
package.json        # deps + scripts (test)
CLAUDE.md           # rewrite to describe v3 (Phase 6)
README.md           # rewrite (Phase 6)
```

**Delete (retire v2)**
```
components/three/ColdOpen.tsx
components/three/ProjectCanvas.tsx
components/three/projectScenes.tsx
components/ArcRail.tsx
components/HeadlineReveal.tsx
components/SectionNav.tsx
components/StatCounter.tsx
components/ScrollReveal.tsx        # only if unused after rebuild (verify in Phase 3)
```

---

## PHASE 0 — Tooling + clean slate

### Task 0.1: Install dependencies

**Files:** Modify `package.json`

- [ ] **Step 1: Install runtime + dev deps**

Run:
```bash
npm install zod gray-matter next-mdx-remote
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 2: Add the test script**

Edit `package.json` `"scripts"` to add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Verify install**

Run: `npm run build`
Expected: PASS (build still green; no code changed yet).

- [ ] **Step 4: Commit**
```bash
git add package.json package-lock.json
git commit -m "chore: add zod, mdx, and vitest tooling"
```

### Task 0.2: Vitest config

**Files:** Create `vitest.config.ts`, `test/setup.ts`

- [ ] **Step 1: Create `vitest.config.ts`**
```ts
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { fileURLToPath } from "node:url"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
})
```

- [ ] **Step 2: Create `test/setup.ts`**
```ts
import "@testing-library/jest-dom/vitest"
```

- [ ] **Step 3: Add a trivial passing test to prove the harness**

Create `test/smoke.test.ts`:
```ts
import { describe, it, expect } from "vitest"

describe("harness", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2)
  })
})
```

- [ ] **Step 4: Run tests**

Run: `npm test`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**
```bash
git add vitest.config.ts test/setup.ts test/smoke.test.ts
git commit -m "test: wire up vitest + testing-library"
```

### Task 0.3: Retire v2 components and blank the homepage

**Files:** Delete v2 components; Modify `app/page.tsx`

- [ ] **Step 1: Delete the editorial components**
```bash
git rm components/three/ColdOpen.tsx components/three/ProjectCanvas.tsx components/three/projectScenes.tsx components/ArcRail.tsx components/HeadlineReveal.tsx components/SectionNav.tsx components/StatCounter.tsx
```

- [ ] **Step 2: Replace `app/page.tsx` with a temporary shell**
```tsx
export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center">
      <p className="font-mono text-sm text-text-muted">WAHNAHBE — rebuild in progress</p>
    </main>
  )
}
```

- [ ] **Step 3: Build (expect failures to surface dead imports)**

Run: `npm run build`
Expected: FAIL if anything still imports deleted files. Fix by removing those imports (e.g., `app/opengraph-image.tsx` if it references removed data; leave `lib/data.ts` for now).
Re-run until: PASS.

- [ ] **Step 4: Commit**
```bash
git add -A
git commit -m "refactor: retire v2 editorial components, blank homepage"
```

> Note: keep `lib/lenis.tsx`, `components/three/SceneWrapper.tsx` (if present), and R3F deps installed — the parked 3D hero fallback may reuse them. `ScrollReveal.tsx` stays until Phase 3 confirms it's unused.

---

## PHASE 1 — Neon Circuit design system

### Task 1.1: Design tokens in globals.css

**Files:** Modify `app/globals.css`

- [ ] **Step 1: Replace the `:root` + `@theme inline` blocks**

Replace the entire contents of `app/globals.css` with:
```css
@import "tailwindcss";

:root {
  --bg: #05080a;
  --surface: #0a0e12;
  --surface-2: #0c1316;
  --accent: #19e6ff;        /* ice-cyan */
  --accent-2: #ffb020;      /* hot amber */
  --text: #eafcff;
  --text-muted: #6c8a90;
  --line: rgba(25, 230, 255, 0.20);
  --glow-cyan: rgba(25, 230, 255, 0.33);
  --glow-amber: rgba(255, 176, 32, 0.40);

  /* type-tag colors */
  --tag-build: #19e6ff;
  --tag-ship: #21e6c4;
  --tag-video: #ffb020;
  --tag-post: #7fdfff;
  --tag-log: #6c8a90;

  --background: var(--bg);
  --foreground: var(--text);
}

@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-surface-2: var(--surface-2);
  --color-accent: var(--accent);
  --color-accent-2: var(--accent-2);
  --color-text: var(--text);
  --color-text-muted: var(--text-muted);
  --color-line: var(--line);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-inter);
  --font-mono: var(--font-jetbrains);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-inter), system-ui, sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
::selection { background: var(--accent); color: var(--bg); }

/* scanline overlay (subtle, global) */
.scanlines::after {
  content: "";
  position: fixed; inset: 0; z-index: 9999; pointer-events: none;
  opacity: 0.5;
  background: repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 3px);
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**
```bash
git add app/globals.css
git commit -m "feat: Neon Circuit design tokens"
```

### Task 1.2: Fonts + metadata + body shell in layout

**Files:** Modify `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**
```tsx
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { LenisProvider } from "@/lib/lenis"
import { TopBar } from "@/components/hud/TopBar"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" })
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL("https://b3soft.vercel.app"),
  title: "Wahnahbe — Joshua Gutierrez",
  description: "Fun, useful AI — built & explained in public. Projects, videos, and build logs from Joshua Gutierrez.",
  openGraph: {
    title: "Wahnahbe — Joshua Gutierrez",
    description: "Fun, useful AI — built & explained in public.",
    type: "website",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrains.variable} scanlines antialiased`}>
        <LenisProvider>
          <TopBar />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Build (will fail — TopBar not created yet)**

Run: `npm run build`
Expected: FAIL ("Cannot find module '@/components/hud/TopBar'"). Proceed to Task 1.3 which creates it, then rebuild.

### Task 1.3: HUD primitives — TopBar, CornerFrame, Scanlines, TypeTag

**Files:** Create `lib/site.ts`, `components/hud/{TopBar,CornerFrame,TypeTag}.tsx`

- [ ] **Step 1: Create `lib/site.ts`**
```ts
export const site = {
  name: "Wahnahbe",
  kana: "ワナビー",
  tagline: "Fun, useful AI — built & explained in public.",
  building: "japanese-tutor",
  socials: {
    youtube: "https://youtube.com/@wahnahbe",   // TODO: confirm real handle
    instagram: "https://instagram.com/wahnahbe", // TODO: confirm real handle
    github: "https://github.com/evolshenanigans",
    email: "joshgusgutierrez@gmail.com",
  },
  resume: "/joshgutierrez2026resume.pdf",
} as const
```

- [ ] **Step 2: Create `components/hud/CornerFrame.tsx`**
```tsx
export function CornerFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative border border-line ${className}`}>
      <span className="pointer-events-none absolute -top-px -left-px h-3 w-3 border-t-2 border-l-2 border-accent" />
      <span className="pointer-events-none absolute -top-px -right-px h-3 w-3 border-t-2 border-r-2 border-accent" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-accent" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-accent" />
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Create `components/hud/TopBar.tsx`**
```tsx
import Link from "next/link"
import { site } from "@/lib/site"

export function TopBar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-line bg-bg/70 backdrop-blur">
      <nav className="mx-auto max-w-3xl flex items-center justify-between px-5 py-3 font-mono text-sm">
        <Link href="/" className="font-bold tracking-wide text-text">
          WAHNAHBE <span className="text-accent-2 text-xs align-middle">{site.kana}</span>
        </Link>
        <div className="flex items-center gap-4 text-text-muted">
          <Link href="/" className="hover:text-accent transition-colors">feed</Link>
          <Link href="/about" className="hover:text-accent transition-colors">about</Link>
          <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">gh</a>
        </div>
      </nav>
    </header>
  )
}
```

- [ ] **Step 4: Create `components/hud/TypeTag.tsx`**
```tsx
import type { PostType } from "@/lib/posts/schema"

const LABEL: Record<PostType, string> = {
  build: "build", ship: "ship", video: "video", post: "post", log: "log",
}
const COLOR: Record<PostType, string> = {
  build: "var(--tag-build)", ship: "var(--tag-ship)", video: "var(--tag-video)",
  post: "var(--tag-post)", log: "var(--tag-log)",
}

export function TypeTag({ type }: { type: PostType }) {
  return (
    <span
      className="inline-block rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider"
      style={{ color: COLOR[type], borderColor: "var(--line)" }}
    >
      {LABEL[type]}
    </span>
  )
}
```
> `PostType` is created in Task 2.1; this file build-passes once Task 2.1 lands. Order Phase 2 before re-building the layout, or stub the type import temporarily. To keep builds green, do Task 2.1 next.

- [ ] **Step 5: Commit**
```bash
git add lib/site.ts components/hud/CornerFrame.tsx components/hud/TopBar.tsx components/hud/TypeTag.tsx app/layout.tsx
git commit -m "feat: HUD primitives + layout shell (fonts, TopBar)"
```

---

## PHASE 2 — Content system (TDD)

### Task 2.1: Post schema (Zod discriminated union)

**Files:** Create `lib/posts/schema.ts`, `test/posts/schema.test.ts`

- [ ] **Step 1: Write the failing test** — `test/posts/schema.test.ts`
```ts
import { describe, it, expect } from "vitest"
import { postFrontmatterSchema } from "@/lib/posts/schema"

describe("postFrontmatterSchema", () => {
  it("accepts a valid build post", () => {
    const r = postFrontmatterSchema.safeParse({
      type: "build", date: "2026-06-01", title: "Japanese Tutor",
      summary: "An AI tutor.", status: "building", links: { repo: "https://x" },
    })
    expect(r.success).toBe(true)
  })

  it("rejects a build post missing a title", () => {
    const r = postFrontmatterSchema.safeParse({
      type: "build", date: "2026-06-01", summary: "x", status: "building",
    })
    expect(r.success).toBe(false)
  })

  it("accepts a log post", () => {
    const r = postFrontmatterSchema.safeParse({ type: "log", date: "2026-06-01" })
    expect(r.success).toBe(true)
  })

  it("rejects an unknown type", () => {
    const r = postFrontmatterSchema.safeParse({ type: "tweet", date: "2026-06-01" })
    expect(r.success).toBe(false)
  })
})
```

- [ ] **Step 2: Run — verify it fails**

Run: `npm test -- schema`
Expected: FAIL ("Cannot find module schema").

- [ ] **Step 3: Implement `lib/posts/schema.ts`**
```ts
import { z } from "zod"

const base = { date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), tags: z.array(z.string()).optional() }

export const buildSchema = z.object({
  ...base,
  type: z.enum(["build", "ship"]),
  title: z.string().min(1),
  summary: z.string().min(1),
  status: z.enum(["building", "active", "shipped"]),
  links: z.object({ repo: z.string().url().optional(), live: z.string().url().optional(), caseStudy: z.string().optional() }).default({}),
  cover: z.string().optional(),
})

export const videoSchema = z.object({
  ...base, type: z.literal("video"), title: z.string().min(1),
  youtube: z.string().min(1), thumbnail: z.string().optional(),
})

export const igSchema = z.object({
  ...base, type: z.literal("post"), caption: z.string().min(1),
  image: z.string().min(1), permalink: z.string().url().optional(),
})

export const logSchema = z.object({ ...base, type: z.literal("log") })

export const postFrontmatterSchema = z.discriminatedUnion("type", [
  buildSchema, videoSchema, igSchema, logSchema,
])

export type PostType = "build" | "ship" | "video" | "post" | "log"
export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>
export type Post = PostFrontmatter & { id: string; body: string }
```

- [ ] **Step 4: Run — verify it passes**

Run: `npm test -- schema`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**
```bash
git add lib/posts/schema.ts test/posts/schema.test.ts
git commit -m "feat: Zod post frontmatter schema (TDD)"
```

### Task 2.2: relativeTime util (TDD)

**Files:** Create `lib/posts/relativeTime.ts`, `test/posts/relativeTime.test.ts`

- [ ] **Step 1: Failing test** — `test/posts/relativeTime.test.ts`
```ts
import { describe, it, expect } from "vitest"
import { relativeTime } from "@/lib/posts/relativeTime"

const now = new Date("2026-06-10T00:00:00Z")

describe("relativeTime", () => {
  it("returns 'now' for today", () => {
    expect(relativeTime("2026-06-10", now)).toBe("now")
  })
  it("returns days", () => {
    expect(relativeTime("2026-06-05", now)).toBe("5d")
  })
  it("returns weeks", () => {
    expect(relativeTime("2026-05-20", now)).toBe("3w")
  })
  it("returns months", () => {
    expect(relativeTime("2026-03-10", now)).toBe("3mo")
  })
})
```

- [ ] **Step 2: Run — fails.** `npm test -- relativeTime` → FAIL.

- [ ] **Step 3: Implement `lib/posts/relativeTime.ts`**
```ts
export function relativeTime(iso: string, now: Date = new Date()): string {
  const then = new Date(iso + "T00:00:00Z")
  const days = Math.floor((now.getTime() - then.getTime()) / 86_400_000)
  if (days <= 0) return "now"
  if (days < 7) return `${days}d`
  if (days < 30) return `${Math.floor(days / 7)}w`
  if (days < 365) return `${Math.floor(days / 30)}mo`
  return `${Math.floor(days / 365)}y`
}
```

- [ ] **Step 4: Run — passes.** `npm test -- relativeTime` → PASS.

- [ ] **Step 5: Commit**
```bash
git add lib/posts/relativeTime.ts test/posts/relativeTime.test.ts
git commit -m "feat: relativeTime util (TDD)"
```

### Task 2.3: filter util (TDD)

**Files:** Create `lib/posts/filter.ts`, `test/posts/filter.test.ts`

- [ ] **Step 1: Failing test** — `test/posts/filter.test.ts`
```ts
import { describe, it, expect } from "vitest"
import { filterPosts, FILTERS } from "@/lib/posts/filter"
import type { Post } from "@/lib/posts/schema"

const posts = [
  { id: "a", type: "build", date: "2026-06-01", body: "" },
  { id: "b", type: "ship", date: "2026-05-01", body: "" },
  { id: "c", type: "video", date: "2026-04-01", body: "" },
  { id: "d", type: "log", date: "2026-03-01", body: "" },
] as unknown as Post[]

describe("filterPosts", () => {
  it("All returns everything", () => {
    expect(filterPosts(posts, "All")).toHaveLength(4)
  })
  it("Projects returns build + ship", () => {
    expect(filterPosts(posts, "Projects").map((p) => p.id)).toEqual(["a", "b"])
  })
  it("Videos returns only video", () => {
    expect(filterPosts(posts, "Videos").map((p) => p.id)).toEqual(["c"])
  })
  it("exposes the chip list", () => {
    expect(FILTERS).toContain("All")
  })
})
```

- [ ] **Step 2: Run — fails.**

- [ ] **Step 3: Implement `lib/posts/filter.ts`**
```ts
import type { Post } from "@/lib/posts/schema"

export const FILTERS = ["All", "Projects", "Videos", "Posts", "Logs"] as const
export type Filter = (typeof FILTERS)[number]

const MATCH: Record<Filter, (p: Post) => boolean> = {
  All: () => true,
  Projects: (p) => p.type === "build" || p.type === "ship",
  Videos: (p) => p.type === "video",
  Posts: (p) => p.type === "post",
  Logs: (p) => p.type === "log",
}

export function filterPosts(posts: readonly Post[], filter: Filter): Post[] {
  return posts.filter(MATCH[filter])
}
```

- [ ] **Step 4: Run — passes.**

- [ ] **Step 5: Commit**
```bash
git add lib/posts/filter.ts test/posts/filter.test.ts
git commit -m "feat: feed filter util (TDD)"
```

### Task 2.4: Post loader (server-only) + seed content

**Files:** Create `lib/posts/load.ts`, `content/feed/*.mdx`; Test `test/posts/load.test.ts`

- [ ] **Step 1: Create seed content files** (one MDX per post)

`content/feed/2026-06-01-japanese-tutor.mdx`:
```mdx
---
type: build
date: 2026-06-01
title: Japanese Tutor
summary: An AI tutor that adapts to your JLPT level (N5 → N1) and teaches through a cyberpunk story.
status: building
tags: [AI, edtech, Next.js]
links:
  caseStudy: japanese-tutor
  repo: https://github.com/evolshenanigans
cover: /megacity.png
---
The flagship — a story-based reading curriculum where the Japanese is the medium, not the goal.
```

`content/feed/2026-05-28-sentinel-fraud.mdx`:
```mdx
---
type: ship
date: 2026-05-28
title: Sentinel Fraud
summary: Explainable fraud detection — XGBoost + SHAP with class-imbalance handling.
status: shipped
tags: [XGBoost, SHAP]
links:
  repo: https://github.com/evolshenanigans/sentinel-fraud
---
```

`content/feed/2026-05-20-streaks-log.mdx`:
```mdx
---
type: log
date: 2026-05-20
---
Shipped streak tracking in the tutor — early testers came back +30% more.
```

> Seed the remaining four projects (Playerformations, Logi-Flow Japan, DeepLens, ChronoVault) as `build`/`ship` MDX files in the same shape, using the repos and blurbs from `lib/data.ts`. One file each under `content/feed/`. (Full list in spec §7.)

- [ ] **Step 2: Failing test** — `test/posts/load.test.ts`
```ts
import { describe, it, expect } from "vitest"
import { loadPosts } from "@/lib/posts/load"

describe("loadPosts", () => {
  it("loads, validates, and sorts newest-first", () => {
    const posts = loadPosts()
    expect(posts.length).toBeGreaterThan(0)
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].date >= posts[i].date).toBe(true)
    }
  })
  it("derives id from filename", () => {
    const posts = loadPosts()
    expect(posts.every((p) => typeof p.id === "string" && p.id.length > 0)).toBe(true)
  })
})
```

- [ ] **Step 3: Run — fails.**

- [ ] **Step 4: Implement `lib/posts/load.ts`**
```ts
import "server-only"
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { postFrontmatterSchema, type Post } from "@/lib/posts/schema"

const DIR = path.join(process.cwd(), "content", "feed")

export function loadPosts(): Post[] {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx"))
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(DIR, file), "utf8")
    const { data, content } = matter(raw)
    const parsed = postFrontmatterSchema.safeParse(data)
    if (!parsed.success) {
      throw new Error(`Invalid frontmatter in content/feed/${file}: ${parsed.error.message}`)
    }
    const id = file.replace(/\.mdx$/, "")
    return { ...parsed.data, id, body: content.trim() } as Post
  })
  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}
```

- [ ] **Step 5: Run — passes.** `npm test -- load` → PASS.

- [ ] **Step 6: Build + commit**

Run: `npm run build` → PASS.
```bash
git add lib/posts/load.ts content/feed test/posts/load.test.ts
git commit -m "feat: post loader + seed feed content (TDD)"
```

---

## PHASE 3 — The feed

### Task 3.1: Post cards (build/ship, video, post, log)

**Files:** Create `components/feed/cards/{BuildCard,VideoCard,PostCard,LogCard}.tsx`

- [ ] **Step 1: `BuildCard.tsx`** (handles `build` + `ship`)
```tsx
import Link from "next/link"
import Image from "next/image"
import type { Post } from "@/lib/posts/schema"

export function BuildCard({ post }: { post: Extract<Post, { type: "build" | "ship" }> }) {
  const href = post.links.caseStudy ? `/p/${post.links.caseStudy}` : post.links.repo ?? post.links.live
  const external = !post.links.caseStudy
  const Inner = (
    <>
      {post.cover && (
        <div className="relative mb-3 h-36 w-full overflow-hidden rounded-md border border-line">
          <Image src={post.cover} alt="" fill className="object-cover opacity-90" sizes="(max-width:768px) 100vw, 768px" />
        </div>
      )}
      <h3 className="font-sans text-base font-semibold text-text">{post.title}</h3>
      <p className="mt-1 text-sm text-text-muted">{post.summary}</p>
      {post.tags && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <span key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-text-muted">{t}</span>
          ))}
        </div>
      )}
    </>
  )
  if (!href) return <div>{Inner}</div>
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:[&_h3]:text-accent">{Inner}</a>
  ) : (
    <Link href={href} className="block hover:[&_h3]:text-accent">{Inner}</Link>
  )
}
```

- [ ] **Step 2: `VideoCard.tsx`**
```tsx
import type { Post } from "@/lib/posts/schema"

export function VideoCard({ post }: { post: Extract<Post, { type: "video" }> }) {
  const url = post.youtube.startsWith("http") ? post.youtube : `https://youtube.com/watch?v=${post.youtube}`
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block hover:[&_h3]:text-accent">
      <div className="relative mb-3 flex h-36 w-full items-center justify-center overflow-hidden rounded-md border border-line bg-surface-2 text-accent-2">
        <span className="font-mono text-2xl" aria-hidden>▶</span>
      </div>
      <h3 className="font-sans text-base font-semibold text-text">{post.title}</h3>
      <p className="mt-1 font-mono text-xs text-text-muted">YouTube</p>
    </a>
  )
}
```

- [ ] **Step 3: `PostCard.tsx`** (Instagram)
```tsx
import Image from "next/image"
import type { Post } from "@/lib/posts/schema"

export function PostCard({ post }: { post: Extract<Post, { type: "post" }> }) {
  const body = (
    <>
      <div className="relative mb-3 h-64 w-full overflow-hidden rounded-md border border-line">
        <Image src={post.image} alt={post.caption} fill className="object-cover" sizes="(max-width:768px) 100vw, 768px" />
      </div>
      <p className="text-sm text-text">{post.caption}</p>
      <p className="mt-1 font-mono text-xs text-text-muted">Instagram</p>
    </>
  )
  return post.permalink ? (
    <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="block">{body}</a>
  ) : <div>{body}</div>
}
```

- [ ] **Step 4: `LogCard.tsx`**
```tsx
import type { Post } from "@/lib/posts/schema"

export function LogCard({ post }: { post: Extract<Post, { type: "log" }> }) {
  return <p className="text-sm leading-relaxed text-text">{post.body}</p>
}
```

- [ ] **Step 5: Smoke test** — `test/feed/cards.test.tsx`
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { BuildCard } from "@/components/feed/cards/BuildCard"
import type { Post } from "@/lib/posts/schema"

const p = { id: "x", type: "build", date: "2026-06-01", title: "Japanese Tutor",
  summary: "An AI tutor.", status: "building", links: {} } as unknown as Post

describe("BuildCard", () => {
  it("renders the title", () => {
    render(<BuildCard post={p as Extract<Post, { type: "build" | "ship" }>} />)
    expect(screen.getByText("Japanese Tutor")).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run tests + commit**

Run: `npm test -- cards` → PASS.
```bash
git add components/feed/cards test/feed/cards.test.tsx
git commit -m "feat: feed post cards (build/ship, video, post, log)"
```

### Task 3.2: PostRow + Feed + FilterChips

**Files:** Create `components/feed/{PostRow,Feed,FilterChips}.tsx`

- [ ] **Step 1: `PostRow.tsx`** (shared timeline row)
```tsx
import type { Post } from "@/lib/posts/schema"
import { TypeTag } from "@/components/hud/TypeTag"
import { relativeTime } from "@/lib/posts/relativeTime"

export function PostRow({ post, children }: { post: Post; children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[56px_1fr] gap-4 border-t border-line py-5 first:border-t-0">
      <div className="text-right">
        <TypeTag type={post.type} />
        <div className="mt-1.5 font-mono text-[10px] text-text-muted">{relativeTime(post.date)}</div>
      </div>
      <div>{children}</div>
    </li>
  )
}
```

- [ ] **Step 2: `FilterChips.tsx`** (client)
```tsx
"use client"
import { FILTERS, type Filter } from "@/lib/posts/filter"

export function FilterChips({ active, onChange }: { active: Filter; onChange: (f: Filter) => void }) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`rounded border px-3 py-1 font-mono text-xs transition-colors ${
            active === f ? "border-accent text-accent" : "border-line text-text-muted hover:text-text"
          }`}
          style={active === f ? { boxShadow: "inset 0 0 12px var(--glow-cyan)" } : undefined}
        >
          {f}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: `Feed.tsx`** (client; owns filter state)
```tsx
"use client"
import { useState } from "react"
import type { Post } from "@/lib/posts/schema"
import { filterPosts, type Filter } from "@/lib/posts/filter"
import { FilterChips } from "@/components/feed/FilterChips"
import { PostRow } from "@/components/feed/PostRow"
import { BuildCard } from "@/components/feed/cards/BuildCard"
import { VideoCard } from "@/components/feed/cards/VideoCard"
import { PostCard } from "@/components/feed/cards/PostCard"
import { LogCard } from "@/components/feed/cards/LogCard"

function Card({ post }: { post: Post }) {
  switch (post.type) {
    case "build":
    case "ship": return <BuildCard post={post} />
    case "video": return <VideoCard post={post} />
    case "post": return <PostCard post={post} />
    case "log": return <LogCard post={post} />
  }
}

export function Feed({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<Filter>("All")
  const visible = filterPosts(posts, filter)
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <FilterChips active={filter} onChange={setFilter} />
      <ul>
        {visible.map((post) => (
          <PostRow key={post.id} post={post}><Card post={post} /></PostRow>
        ))}
      </ul>
    </section>
  )
}
```

- [ ] **Step 4: Wire into homepage** — replace `app/page.tsx`
```tsx
import { loadPosts } from "@/lib/posts/load"
import { Feed } from "@/components/feed/Feed"

export default function Home() {
  const posts = loadPosts()
  return (
    <main className="pt-14">
      <section className="mx-auto max-w-3xl px-5 pt-16 pb-8">
        <h1 className="font-mono text-2xl font-bold tracking-wide text-text" style={{ textShadow: "0 0 12px var(--glow-cyan)" }}>
          WAHNAHBE <span className="text-accent-2 text-base">ワナビー</span>
        </h1>
        <p className="mt-2 text-sm text-text-muted">Fun, useful AI — built &amp; explained in public.</p>
      </section>
      <Feed posts={posts} />
    </main>
  )
}
```
> This is a placeholder hero (text only). Phase 4 replaces this top section with `<CityHero>`.

- [ ] **Step 5: Build + manual check + commit**

Run: `npm run build` → PASS. `npm run dev` → confirm the feed renders, filters work.
```bash
git add components/feed app/page.tsx
git commit -m "feat: typed feed with filter chips"
```

> **Phase 3 checkpoint:** site builds and shows a working filterable feed with seed content. If `ScrollReveal.tsx` is now unused, `git rm` it.

---

## PHASE 4 — The hero (layered parallax Neo-Tokyo)

### Task 4.1: HeroHud (wordmark, pill, links, rail, descend)

**Files:** Create `components/hero/HeroHud.tsx`

- [ ] **Step 1: Create `components/hero/HeroHud.tsx`**
```tsx
import { site } from "@/lib/site"

export function HeroHud() {
  return (
    <div className="relative z-20 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-5 text-center">
      <div className="font-mono">
        <span className="text-4xl font-extrabold tracking-[0.04em] text-text md:text-5xl"
          style={{ textShadow: "0 0 14px var(--accent), 0 0 36px var(--glow-cyan)" }}>
          WAHNAHBE
        </span>
        <span className="ml-3 align-middle text-base text-accent-2" style={{ textShadow: "0 0 12px var(--glow-amber)" }}>
          {site.kana}
        </span>
      </div>
      <p className="mt-3 max-w-md text-sm text-text/80" style={{ textShadow: "0 0 8px rgba(0,0,0,0.8)" }}>{site.tagline}</p>
      <div className="mt-4 rounded-md border border-line px-3 py-1 font-mono text-xs text-accent"
        style={{ boxShadow: "inset 0 0 12px var(--glow-cyan)" }}>
        ● BUILDING · {site.building}
      </div>
      <div className="mt-4 flex gap-4 font-mono text-[11px] text-text-muted">
        <a href={site.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-accent">▶ youtube</a>
        <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">◳ instagram</a>
        <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">⌥ github</a>
        <a href={`mailto:${site.socials.email}`} className="hover:text-accent">✉ email</a>
      </div>
      <div className="absolute bottom-6 left-0 right-0 animate-pulse font-mono text-[10px] tracking-[0.18em] text-accent-2/80">
        ↓ DESCEND INTO THE FEED
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Build + commit**

Run: `npm run build` → PASS.
```bash
git add components/hero/HeroHud.tsx
git commit -m "feat: hero HUD (wordmark, building pill, links)"
```

### Task 4.2: heroFx (scanlines, camera-grid, visibility rail)

**Files:** Create `components/hero/heroFx.tsx`

- [ ] **Step 1: Create `components/hero/heroFx.tsx`**
```tsx
export function CameraGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 opacity-40"
      style={{
        backgroundImage:
          "linear-gradient(var(--glow-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--glow-cyan) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage: "linear-gradient(180deg, black, transparent 45%)",
      }}
    />
  )
}

export function VisibilityRail() {
  return (
    <div className="pointer-events-none absolute right-4 top-16 bottom-16 z-20 w-1 rounded-full"
      style={{ background: "linear-gradient(180deg, var(--accent), #dfeff5 48%, var(--accent-2))", boxShadow: "0 0 12px var(--glow-cyan)" }}
      aria-hidden
    />
  )
}
```

- [ ] **Step 2: Build + commit**
```bash
git add components/hero/heroFx.tsx
git commit -m "feat: hero FX (camera grid, visibility rail)"
```

### Task 4.3: ParallaxScene (the 3 plates)

**Files:** Create `components/hero/ParallaxScene.tsx`

- [ ] **Step 1: Create `components/hero/ParallaxScene.tsx`** (client; pointer + scroll parallax)
```tsx
"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { CameraGrid, VisibilityRail } from "@/components/hero/heroFx"

const PLATES = [
  { src: "/skyline.png", depth: 12, z: "z-0", className: "object-cover object-center" },
  { src: "/megacity.png", depth: 26, z: "z-[5]", className: "object-cover object-bottom" },
  { src: "/undergroundtransit.png", depth: 48, z: "z-[15]", className: "object-cover object-bottom translate-y-[18%]" },
] as const

export function ParallaxScene() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"))
    let raf = 0
    let px = 0, py = 0
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      px = (e.clientX - r.left) / r.width - 0.5
      py = (e.clientY - r.top) / r.height - 0.5
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const apply = () => {
      raf = 0
      const sy = window.scrollY
      for (const layer of layers) {
        const d = Number(layer.dataset.depth)
        layer.style.transform = `translate3d(${px * d * -0.6}px, ${py * d * -0.4 - sy * (d / 800)}px, 0) scale(1.08)`
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply) }
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    apply()
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden bg-bg">
      {PLATES.map((p) => (
        <div key={p.src} data-depth={p.depth} className={`absolute inset-0 ${p.z} will-change-transform`}>
          <Image src={p.src} alt="" fill priority={p.src === "/megacity.png"} className={p.className} sizes="100vw" />
        </div>
      ))}
      <CameraGrid />
      <VisibilityRail />
      <div className="pointer-events-none absolute inset-0 z-[18]"
        style={{ background: "linear-gradient(180deg, transparent 60%, var(--bg))" }} />
    </div>
  )
}
```

- [ ] **Step 2: Build + commit**

Run: `npm run build` → PASS.
```bash
git add components/hero/ParallaxScene.tsx
git commit -m "feat: hero parallax scene (3 plates, pointer+scroll)"
```

### Task 4.4: CityHero boundary (parallax / static fallback) + wire to homepage

**Files:** Create `components/hero/CityHero.tsx`; Modify `app/page.tsx`

- [ ] **Step 1: Create `components/hero/CityHero.tsx`**
```tsx
import Image from "next/image"
import { HeroHud } from "@/components/hero/HeroHud"
import { ParallaxScene } from "@/components/hero/ParallaxScene"

// Static fallback: a single plate, no motion. Used by reduced-motion via CSS + as SSR base.
function StaticScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-bg motion-safe:hidden">
      <Image src="/megacity.png" alt="" fill priority className="object-cover object-bottom" sizes="100vw" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, var(--bg))" }} />
    </div>
  )
}

export function CityHero() {
  return (
    <section className="relative h-[88vh] min-h-[560px] w-full">
      <StaticScene />
      <div className="motion-reduce:hidden absolute inset-0">
        <ParallaxScene />
      </div>
      <HeroHud />
    </section>
  )
}
```
> `motion-reduce:hidden` / `motion-safe:hidden` give a pure-CSS reduced-motion fallback (no JS branch needed); `ParallaxScene` also early-returns on `prefers-reduced-motion`.

- [ ] **Step 2: Put the hero on the homepage** — edit `app/page.tsx`, replace the placeholder `<section>...</section>` hero with `<CityHero />`:
```tsx
import { loadPosts } from "@/lib/posts/load"
import { Feed } from "@/components/feed/Feed"
import { CityHero } from "@/components/hero/CityHero"

export default function Home() {
  const posts = loadPosts()
  return (
    <main>
      <CityHero />
      <Feed posts={posts} />
    </main>
  )
}
```

- [ ] **Step 3: Build + manual checks**

Run: `npm run build` → PASS. `npm run dev`:
- Hero fills viewport; wordmark sits in the misty center channel of megacity.
- Pointer move parallaxes the plates; scroll drifts them and fades into the feed.
- DevTools → emulate `prefers-reduced-motion: reduce` → motion stops, static plate shows.
- Throttle to mobile width → still renders (parallax may be reduced; see Task 4.5).

- [ ] **Step 4: Commit**
```bash
git add components/hero/CityHero.tsx app/page.tsx
git commit -m "feat: CityHero on homepage (parallax + static fallback)"
```

### Task 4.5: Mobile guard + LCP/perf polish

**Files:** Modify `components/hero/ParallaxScene.tsx`

- [ ] **Step 1: Disable pointer parallax on coarse pointers / small screens**

In `ParallaxScene.tsx`, after the `reduce` check, add:
```tsx
const coarse = window.matchMedia("(pointer: coarse), (max-width: 768px)").matches
if (coarse) {
  // scroll-only drift on mobile; skip pointer listeners
  const onScrollOnly = () => { if (!raf) raf = requestAnimationFrame(apply) }
  window.addEventListener("scroll", onScrollOnly, { passive: true })
  apply()
  return () => { window.removeEventListener("scroll", onScrollOnly); if (raf) cancelAnimationFrame(raf) }
}
```
(Place this block before the `pointermove` wiring so mobile takes the lighter path.)

- [ ] **Step 2: Build + verify**

Run: `npm run build` → PASS. Confirm mobile width: no pointer jank, scroll drift only.

- [ ] **Step 3: Commit**
```bash
git add components/hero/ParallaxScene.tsx
git commit -m "perf: mobile-light hero (scroll-only on coarse pointers)"
```

> **Phase 4 checkpoint:** the "wow" hero is live with full reduced-motion + mobile fallbacks.

---

## PHASE 5 — Pages + project case studies

### Task 5.1: /about

**Files:** Create `app/about/page.tsx`; add about copy to `lib/site.ts`

- [ ] **Step 1: Add the career arc to `lib/site.ts`**
```ts
export const about = {
  bio: "I'm Joshua Gutierrez — a data scientist and ML engineer who makes hard things make sense. English major turned ML engineer; I build fun, useful AI and explain it in public as Wahnahbe.",
  arc: [
    { year: "2021", what: "BA English, Cal State LA — every dataset is a text with an audience." },
    { year: "2016–22", what: "Lead Patient Transport Tech, UCLA Health — cut ER ack time 31% with Tableau + Epic." },
    { year: "2023", what: "React / Mobile Dev, Atomic · Co.Lab — 30% load-time cut, predictive sleep model." },
    { year: "2024", what: "Software Engineer, Discovery Partners Institute — ingestion pipeline + Rails API." },
    { year: "2025", what: "Data Science Instructor, Coding Minds — taught K-12 Python, pandas, ML." },
    { year: "2026", what: "MS Data Science, Boston University (Dec 2026)." },
  ],
} as const
```

- [ ] **Step 2: Create `app/about/page.tsx`**
```tsx
import type { Metadata } from "next"
import { about, site } from "@/lib/site"
import { CornerFrame } from "@/components/hud/CornerFrame"

export const metadata: Metadata = { title: "About — Wahnahbe" }

export default function About() {
  return (
    <main className="mx-auto max-w-3xl px-5 pt-28 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">the human behind wahnahbe</p>
      <p className="mt-4 text-lg leading-relaxed text-text">{about.bio}</p>
      <CornerFrame className="mt-10 p-6">
        <ul className="space-y-4">
          {about.arc.map((e) => (
            <li key={e.year} className="grid grid-cols-[84px_1fr] gap-4">
              <span className="font-mono text-xs text-accent-2">{e.year}</span>
              <span className="text-sm text-text-muted">{e.what}</span>
            </li>
          ))}
        </ul>
      </CornerFrame>
      <a href={site.resume} target="_blank" rel="noopener noreferrer"
        className="mt-8 inline-block font-mono text-sm text-accent underline underline-offset-4">résumé — PDF →</a>
    </main>
  )
}
```

- [ ] **Step 3: Build + commit**

Run: `npm run build` → PASS.
```bash
git add app/about/page.tsx lib/site.ts
git commit -m "feat: /about page (bio + condensed arc)"
```

### Task 5.2: Project case studies — /p/[slug]

**Files:** Create `lib/projects/load.ts`, `app/p/[slug]/page.tsx`, `content/projects/japanese-tutor.mdx`

- [ ] **Step 1: Create `content/projects/japanese-tutor.mdx`**
```mdx
---
title: Japanese Tutor
summary: A JLPT-adaptive, story-based AI tutor (N5 → N1).
status: building
repo: https://github.com/evolshenanigans
cover: /megacity.png
---
## What it is
A story-based Japanese reading curriculum where the Japanese is the medium, not the goal...

## How it works
Per-session SRS, interlinear scaffolding, a cyberpunk Neo-Tokyo the difficulty curve runs through.
```

- [ ] **Step 2: Create `lib/projects/load.ts`**
```ts
import "server-only"
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const DIR = path.join(process.cwd(), "content", "projects")

export function projectSlugs(): string[] {
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""))
}

export function loadProject(slug: string) {
  const file = path.join(DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, "utf8"))
  return { slug, meta: data as { title: string; summary: string; status?: string; repo?: string; cover?: string }, body: content }
}
```

- [ ] **Step 3: Create `app/p/[slug]/page.tsx`**
```tsx
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import { loadProject, projectSlugs } from "@/lib/projects/load"

export function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = loadProject(slug)
  return { title: p ? `${p.meta.title} — Wahnahbe` : "Project — Wahnahbe" }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = loadProject(slug)
  if (!project) notFound()
  return (
    <main className="mx-auto max-w-3xl px-5 pt-28 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">{project.meta.status ?? "project"}</p>
      <h1 className="mt-3 font-mono text-3xl font-bold text-text">{project.meta.title}</h1>
      <p className="mt-2 text-text-muted">{project.meta.summary}</p>
      <article className="prose-invert mt-8 space-y-4 text-text/90 [&_h2]:mt-8 [&_h2]:font-mono [&_h2]:text-accent">
        <MDXRemote source={project.body} />
      </article>
      {project.meta.repo && (
        <a href={project.meta.repo} target="_blank" rel="noopener noreferrer"
          className="mt-8 inline-block font-mono text-sm text-accent underline underline-offset-4">view repo →</a>
      )}
    </main>
  )
}
```

- [ ] **Step 4: Build + manual check + commit**

Run: `npm run build` → PASS (confirm `/p/japanese-tutor` is statically generated). `npm run dev` → visit it.
```bash
git add lib/projects/load.ts app/p content/projects
git commit -m "feat: project case-study pages (/p/[slug])"
```

### Task 5.3: OG image + favicon refresh

**Files:** Modify/replace `app/opengraph-image.tsx` (if present), `app/icon` as needed

- [ ] **Step 1: Update `app/opengraph-image.tsx`** to the Neon Circuit look (black bg, cyan `WAHNAHBE ワナビー`, amber tagline). If the file imports removed v2 data, rewrite it to use `site` from `lib/site.ts`. Minimal version:
```tsx
import { ImageResponse } from "next/og"
import { site } from "@/lib/site"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#05080a", color: "#eafcff",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        fontFamily: "monospace" }}>
        <div style={{ fontSize: 90, fontWeight: 800 }}>WAHNAHBE</div>
        <div style={{ fontSize: 28, color: "#ffb020", marginTop: 12 }}>{site.tagline}</div>
      </div>
    ),
    { ...size }
  )
}
```

- [ ] **Step 2: Build + commit**

Run: `npm run build` → PASS.
```bash
git add app/opengraph-image.tsx
git commit -m "feat: Neon Circuit OG image"
```

> **Phase 5 checkpoint:** all routes exist and build statically; site is content-complete for v1.

---

## PHASE 6 — Cleanup, docs, final verification

### Task 6.1: Remove dead v2 data + confirm no orphans

**Files:** Modify/Delete `lib/data.ts`; verify

- [ ] **Step 1: Fold any still-needed bits of `lib/data.ts` into seed content / `lib/site.ts`, then delete it**
```bash
git rm lib/data.ts
```
- [ ] **Step 2: Build to surface any remaining imports**

Run: `npm run build`
Expected: PASS. Fix any dangling imports (search `from "@/lib/data"`).

- [ ] **Step 3: Run knip-style manual check** — grep for unused: `ScrollReveal`, `lib/lenis` (keep if used by layout), `components/three/SceneWrapper`. Delete confirmed-unused files.

- [ ] **Step 4: Commit**
```bash
git add -A
git commit -m "refactor: remove v2 data layer + orphans"
```

### Task 6.2: Rewrite CLAUDE.md + README

**Files:** Modify `CLAUDE.md`, `README.md`

- [ ] **Step 1: Rewrite `CLAUDE.md`** to describe v3 accurately: the Wahnahbe feed concept, post taxonomy + how to add a post (`content/feed/*.mdx` + Zod), the Neon Circuit tokens, the `<CityHero>` boundary + the 3 plates + parked 3D, pages, and the `npm run build` gate. Remove all stale v1/v2 descriptions (cyan particle network, editorial arc, etc.).

- [ ] **Step 2: Rewrite `README.md`** stack + sections to match v3 (feed, hero, pages).

- [ ] **Step 3: Update the memory note** — the `wahnahbe-redesign` memory says CLAUDE.md is stale; once rewritten, edit that memory to drop the "stale CLAUDE.md" caveat.

- [ ] **Step 4: Commit**
```bash
git add CLAUDE.md README.md
git commit -m "docs: rewrite CLAUDE.md + README for v3"
```

### Task 6.3: Final verification pass

- [ ] **Step 1: Full test + build**

Run: `npm test` → PASS. `npm run build` → PASS (zero TS/lint errors). `npm run lint` → clean.

- [ ] **Step 2: Manual a11y/perf sweep** (`npm run dev`)
- Keyboard: tab through TopBar, filter chips, feed links, hero links — visible focus, logical order.
- `prefers-reduced-motion: reduce` → hero static, no parallax, no scanline shimmer.
- Mobile width → hero renders light; feed scrolls smoothly.
- Lighthouse (mobile) → confirm LCP is the hero plate and is reasonable; no major CLS.

- [ ] **Step 3: Final commit (if any fixes)**
```bash
git add -A
git commit -m "chore: final v3 verification fixes"
```

- [ ] **Step 4: Open PR**
```bash
git push -u origin redesign/wahnahbe
gh pr create --base main --title "Portfolio v3 — Wahnahbe (Neon Circuit feed + Neo-Tokyo hero)" --body "Full rebuild per docs/superpowers/specs/2026-06-01-wahnahbe-portfolio-design.md"
```

> **Phase 6 checkpoint:** v3 is complete, documented, verified, and in a PR.

---

## Self-Review (completed)

- **Spec coverage:** Concept/feed (Phase 2–3), pages (5), Neon Circuit system (1), hero + plates + 3D-parked boundary (4), all six projects seeded (2.4 + 5.2), manual content workflow (2.4), full v2 retirement (0.3, 6.1), a11y/perf (4.4, 4.5, 6.3). Tagline/voice + monospace are spec §13 open decisions, carried as `site.ts` values to tune.
- **Placeholder scan:** the only `TODO`s are real, intentional config values (social handles in `lib/site.ts`) flagged for the author to confirm — not plan gaps. The "seed remaining four projects" note in 2.4 references the exact source (`lib/data.ts` / spec §7) and shape — repeat the build/ship MDX pattern per project.
- **Type consistency:** `Post`, `PostType`, `Filter` are defined in `lib/posts/schema.ts` + `filter.ts` and used consistently; `loadPosts()` / `filterPosts()` / `relativeTime()` names match across tasks; `links.caseStudy` drives `/p/[slug]`.
