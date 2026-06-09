---
title: Wahnahbe — Builder/Creator Hub (Portfolio v3) — Design Spec
date: 2026-06-01
status: approved
author: Joshua Gutierrez (with Claude)
supersedes: Portfolio v2 (editorial R3F/GSAP/Lenis site at b3soft.vercel.app)
---

# Wahnahbe — Builder/Creator Hub

## 1. Summary

A full rebuild of the personal site, rebranded from a résumé-style data-science portfolio into **Wahnahbe** — a personal-brand hub for a builder/creator who ships *fun, useful AI* and explains it in public. The site is a **single living feed**: every entry is a typed post (a project being built, a shipped project, a YouTube video, an Instagram post, or a short "just shipped" log), newest first, in one chronological column. Projects and content are co-equal front doors of the same stream and rebalance automatically based on what gets posted. The aesthetic is **"Neon Circuit"** — a fun, modern cyberpunk system (near-black, ice-cyan, hot-amber, HUD/terminal motifs) whose hero is an animated, layered-parallax **vertical slice of Neo-Tokyo** drawn from the user's own worldbuilding for his flagship Japanese-tutor project.

## 2. Goals & non-goals

**Goals**
- A flagship URL that is unmistakably *Wahnahbe* and ages well across LinkedIn, email signatures, conference bios.
- One feed that holds heterogeneous posts (projects + content) and treats them as equal.
- A first-second "wow" via the hero, without sacrificing scroll/mobile performance.
- Zero-friction posting: the author adds a post by committing a file. No CMS, no backend, no API keys.
- Preserve and surface DS/ML credibility as a trust layer, not the headline.

**Non-goals (v1)**
- No live API ingestion from YouTube/Instagram (manual entries only).
- No comments, analytics dashboards, auth, or server runtime beyond static rendering.
- No per-project 3D scenes (retired with the v2 concept).
- No blog/CMS engine — the feed *is* the content system.

## 3. Audience

Primary: a general personal-brand audience (D). Anyone who lands from a bio link — peers, collaborators, followers, occasionally recruiters. The site must read in 5 seconds (who is this, what do they make) and reward a scroll (there's always something new).

## 4. Brand & positioning

- **Name:** Wahnahbe (a wink on "wannabe"; phonetically *wa-na-be*, rhyming with the Japanese thread in the work; katakana **ワナビー** reads "wannabe").
- **Through-line:** *I make hard things make sense.* Projects prove the rigor; content proves the reach. Same person.
- **Voice:** confident, playful, honest, build-in-public. Self-aware wit on top of real competence.
- **Tagline (to finalize in a copy pass — candidates):** "Fun, useful AI — built & explained in public." / "Wannabe everything. Building it anyway." Placeholder in mockups: the former.
- **Human behind the brand:** Joshua Gutierrez — data scientist / ML engineer, MS Data Science (Boston University, Dec 2026). Career arc (English major → ML engineer) lives on `/about`, condensed.

## 5. Information architecture

| Route | Purpose |
|---|---|
| `/` | Hero (animated Neo-Tokyo) + the feed. ~90% of sessions live here. |
| `/about` | "The human behind Wahnahbe" — short bio, condensed career arc, DS/ML credibility, BU MS, links. The trust layer, one click away. |
| `/p/[slug]` | Project case-study detail pages. Only `build`/`ship` projects that warrant depth get one. |

**Navigation:** a slim fixed HUD top bar — `WAHNAHBE ワナビー` (home) on the left; `feed · about` + social links (YouTube, Instagram, GitHub, email) on the right.

**Feed filtering:** filter chips above the feed — `All · Projects · Videos · Posts · Logs`. `Projects` = `build` + `ship`. Chips let projects vs. content rebalance with one click. Default `All`.

## 6. The feed (the engine)

One chronological column, newest first. Each entry is a **typed post**; the type controls the card layout but all types share the timeline. A small uppercase type tag (`build` / `ship` / `video` / `post` / `log`) and a relative date sit in the left gutter; content sits on the right.

### 6.1 Post taxonomy

| Type | Is | Card shows | Opens |
|---|---|---|---|
| `build` | a project in progress | thumbnail/visual, title, summary, tags, status | `/p/[slug]` (if case study) or repo |
| `ship` | a shipped project | same as build, "shipped" styling | `/p/[slug]` or repo/live |
| `video` | a YouTube video | thumbnail + title | YouTube (new tab) or lightbox embed |
| `post` | an Instagram post | image + caption | Instagram permalink (new tab) |
| `log` | a short text update | the text, no media required | nothing (inline) — the low-friction cadence |

### 6.2 Data model (shape — final field details in the plan)

```ts
type PostType = 'build' | 'ship' | 'video' | 'post' | 'log'

interface PostBase {
  readonly id: string          // stable slug; also the filename
  readonly type: PostType
  readonly date: string        // ISO date — sole ordering key (newest first)
  readonly tags?: readonly string[]
}

interface ProjectPost extends PostBase {
  readonly type: 'build' | 'ship'
  readonly title: string
  readonly summary: string
  readonly status: 'building' | 'active' | 'shipped'
  readonly links: { repo?: string; live?: string; caseStudy?: string }
  readonly cover?: string      // image in /public
}

interface VideoPost extends PostBase {
  readonly type: 'video'
  readonly title: string
  readonly youtube: string     // id or url
  readonly thumbnail?: string
}

interface InstagramPost extends PostBase {
  readonly type: 'post'
  readonly caption: string
  readonly image: string
  readonly permalink?: string
}

interface LogPost extends PostBase {
  readonly type: 'log'
  readonly body: string        // short markdown
}

type Post = ProjectPost | VideoPost | InstagramPost | LogPost
```

### 6.3 Content workflow (manual, file-per-post)

- Each post is one file under `content/feed/` (e.g., `content/feed/2026-06-01-japanese-tutor.mdx`) with typed frontmatter + optional MDX body.
- Project case studies live at `content/projects/[slug].mdx` and render at `/p/[slug]`.
- Frontmatter is **validated with Zod** per post type at build time; an invalid post fails the build loudly rather than rendering broken.
- A lightweight loader (gray-matter + typed parse, or Velite) reads the directory, validates, sorts by `date` desc, and feeds the feed. No Contentlayer dependency required.
- **Posting = adding a file and committing.** That is the entire authoring loop and is itself building-in-public.

## 7. Projects

All six are featured (each a `build`/`ship` post; case-study pages added as desired):

1. **Japanese Tutor** — flagship. JLPT-adaptive (N5→N1) story-based AI tutor; the source of the hero world. Status: building.
2. **Playerformations** — athlete performance modeling.
3. **Logi-Flow Japan** — cross-border logistics analytics.
4. **DeepLens** — computer-vision experiments.
5. **ChronoVault** — time-series forecasting toolkit.
6. **Sentinel Fraud** — explainable fraud detection (SHAP).

## 8. Visual design system — "Neon Circuit"

Fun, modern cyberpunk. Restrained glow, HUD/terminal motifs, monospace accents, katakana, scanlines.

### 8.1 Color tokens (CSS variables, exposed via Tailwind `@theme inline`)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#05080A` | page base (pure near-black) |
| `--surface` | `#0A0E12` | cards, panels |
| `--surface-2` | `#0C1316` | insets, media wells |
| `--accent` | `#19E6FF` | ice-cyan — primary/cool, glow |
| `--accent-2` | `#FFB020` | hot amber — secondary/warm |
| `--text` | `#EAFCFF` | primary text |
| `--text-muted` | `#6C8A90` | meta, labels |
| `--line` | `rgba(25,230,255,0.20)` | borders, HUD frames |
| `--glow-cyan` | `#19E6FF55` | text/box glow |
| `--glow-amber` | `#FFB02066` | text/box glow |

**Type-tag colors** (kept in-family for cohesion): `build` → cyan `#19E6FF`; `ship` → mint `#21E6C4`; `video` → amber `#FFB020`; `post` → soft cyan `#7FDFFF`; `log` → muted `#6C8A90`.

### 8.2 Typography

- **Display / HUD / labels / meta:** a monospace (JetBrains Mono, via `next/font`). Wordmark `WAHNAHBE` in uppercase mono with cyan glow.
- **Body / post content:** a clean grotesk sans (Inter, retained, via `next/font`).
- Replaces v2's Fraunces + Inter editorial pairing.

### 8.3 Motifs (used sparingly — "modern," not maximalist)

- HUD **corner brackets** on framed panels.
- `SYS://` readout lines and a live **"● BUILDING · {project}"** status pill.
- **Scanline** overlay (subtle; reuse/replace v2's film-grain layer) and a faint **camera-grid** in the hero (the world's surveillance motif).
- Katakana accents (ワナビー).
- Glow on accents only, never on body text.

## 9. The hero — animated vertical Neo-Tokyo

### 9.1 Concept

A full-viewport landing that is a **vertical slice of Neo-Tokyo**, drawn from the user's Japanese-tutor worldbuilding (`C:\Users\gjgut\japanesetutor`). The palette *encodes the lore*: cold ice-cyan up top = the **Glass Mile** (Obsidian-9 corporate arcologies, "white and too bright"); warm amber below = **Under-Ueno / The Rust** ("welding torches glow orange at the descent"); the **Kuroshibuya** neon spine in the middle is where the WAHNAHBE wordmark, status pill, and links sit. A right-edge **visibility-gradient rail** runs cyan→amber. Scrolling down = descending the gradient into the feed (`↓ DESCEND INTO THE FEED`). Insiders recognize the world; everyone else sees a striking neon hero that also advertises the flagship project.

Art direction follows the world canon's **"not neon and rain"** principle, dialed to **balanced (C)**: punchy enough to stop a scroll, but grounded in procedural-opacity / surveillance texture with neon as accent.

### 9.2 Build approach — layered parallax (with 3D parked)

- **Chosen:** layered parallax. 2–3 photoreal depth plates composited in code, with parallax driven by pointer + scroll, plus code-drawn FX (scanlines, camera-grid, drifting embers, the visibility rail, and the live HUD/wordmark).
- **Parked fallback:** a 3D (React Three Fiber) depth version. The hero is architected behind a `<CityHero>` boundary so the renderer can be swapped to 3D later **without** regenerating art or touching the page.

### 9.3 Image assets (author-generated in Nano Banana Pro) — DELIVERED ✓ 2026-06-01

Three full ultra-wide photoreal plates (prompts in Appendix A), in `public/`:
- **`public/megacity.png`** — Plate 1, establishing. Full vertical city; has a calm misty vertical channel up the center for the wordmark, cyan signage high → warm amber street low. → **mid / base plane**.
- **`public/undergroundtransit.png`** — Plate 2, foreground / The Rust. Bottom-weighted (welding torch, salvaged signage, pipes) with a dark upper sky. → **front plane** (code-masked/feathered along the bottom).
- **`public/skyline.png`** — Plate 3, far towers + visibility-gradient sky + hazy moon, heavy negative space. → **back plane** (parallaxes slowly behind the center channel).
- Optional later: an L0 haze pass and a focal prop (moon / hanging sign / torii).

Plates are full frames (no transparency needed); compositing, masking, and parallax are handled in code. Delivered as PNG; the build converts to optimized WebP/AVIF (via `next/image` or a build step).

### 9.4 Performance & accessibility (hero)

- The hero is the *only* heavy element on the page. Lazy-init; pause when offscreen.
- **Mobile:** reduced layer count / static composite, capped DPR, no pointer-parallax.
- **`prefers-reduced-motion: reduce`:** a calm static frame, no drift/parallax.
- Plates preloaded with width/height to avoid layout shift; LCP target respected (poster/first plate prioritized).

## 10. Motion, performance, accessibility (global)

- Feed is lightweight: CSS/Canvas FX only, fast on phones; no WebGL in the feed.
- Honor `prefers-reduced-motion` everywhere (glow-pulse, glitch-on-hover, scanline shimmer all degrade to static).
- Keyboard-navigable nav, filters, and posts; visible focus states in cyan.
- Sufficient contrast: `--text` on `--bg` is high-contrast; muted text reserved for non-essential meta.
- Smooth scroll (Lenis) retained but optional; must not trap keyboard/reduced-motion users.

## 11. Tech stack & architecture

**Retained from v2:** Next.js 16 (App Router, Turbopack), TypeScript, Tailwind v4 (CSS-variable tokens via `@theme inline`), `next/font`, Vercel deploy. Optionally Lenis; optionally GSAP for micro-interactions. R3F stays available (parked hero fallback) but is not used in v1.

**Retired:** the editorial v2 — `ColdOpen`, `ProjectCanvas`, `projectScenes`, `ArcRail`, `HeadlineReveal`, the 7-section `page.tsx`, Fraunces, the paper/editorial tokens, per-project 3D.

**New structure (illustrative; follow "many small, focused files"):**

```
app/
  layout.tsx            # HUD nav, fonts, tokens, providers
  page.tsx              # hero + feed
  about/page.tsx
  p/[slug]/page.tsx     # project case study (MDX)
components/
  hero/CityHero.tsx     # parallax boundary (swappable → 3D later)
  hero/ParallaxPlate.tsx
  hero/HeroHud.tsx      # wordmark, status pill, links, rail
  feed/Feed.tsx
  feed/FilterChips.tsx
  feed/cards/{BuildCard,ShipCard,VideoCard,PostCard,LogCard}.tsx
  hud/{TopBar,CornerFrame,Scanlines}.tsx
content/
  feed/*.mdx            # one file per post (typed frontmatter)
  projects/*.mdx        # case studies
lib/
  posts.ts             # load + Zod-validate + sort
  schema.ts            # Zod schemas per post type
  tokens — in app/globals.css
public/
  megacity.png  undergroundtransit.png  skyline.png   # hero plates (build → webp/avif)
```

Design tokens move into `app/globals.css`; all components consume tokens, never hardcoded hex.

## 12. Scope

**v1 (this build):**
- Neon Circuit design system + tokens + fonts.
- HUD nav, `/`, `/about`, `/p/[slug]`.
- Feed with all five post types, Zod-validated file-per-post loader, filter chips.
- Layered-parallax hero wired to the three plates + code FX, with full a11y/perf fallbacks.
- Seed content: the six projects as posts (+ at least the Japanese Tutor case study), a couple of `log` posts; `video`/`post` types fully supported and seeded empty/placeholder until the author creates content.
- Retire all v2 editorial components.

**Later / parked:**
- 3D-depth hero renderer (swap behind `<CityHero>`).
- L0 haze + focal-prop hero plates.
- Real YouTube/Instagram content as it's produced.
- Optional live-pull integrations (explicitly deferred).
- Custom Wahnahbe domain (currently b3soft.vercel.app).

## 13. Open decisions (non-blocking)

- Final tagline / voice pass (candidates in §4).
- Exact monospace face (JetBrains Mono vs. alternative) — confirm in build.
- Whether `video` opens a lightbox embed or links out (default: links out v1).
- Domain (separate decision; does not affect the build).

---

## Appendix A — Nano Banana Pro plate prompts

Generated via the Banana Pro Director skill (Mode 3B environment plate, M5 atmospheric, photoreal). Set ultra-wide (21:9) + max resolution in the UI; generate Plate 1 first and use it as a style reference for 2 & 3.

**Plate 1 — Hero establishing**
```
An ultra-wide cinematic establishing photograph looking up through a stratified near-future Japanese megacity at night, the kind of frame a cinematographer locks off and grabs between takes. The upper third of the frame holds distant, tall, impossibly thin mirror-black corporate arcology towers, lit only by cold cyan and pale blue-white edge light, clinical, sparse, silent, their tops dissolving into faint smog; a barely-perceptible rectilinear surveillance camera-grid shimmer hangs in the upper air. The middle band is a dense vertical street-canyon of stacked mid-rise concrete buildings crusted with glowing Japanese kanji and katakana signage in cyan and amber, vending-machine glow and noodle-stall light spilling into narrow alleys — neon used as restrained accent, not a saturated wall — with a calmer dark vertical channel of negative space running up the center where the open sky shows through. The bottom of the frame opens onto a half-collapsed lower level rising in warm amber sodium and welding-torch glow, salvaged signage, drifting steam, rust and exposed conduit. The palette flows cold cyan at the top through neutral grey-black to warm amber at the bottom, over deep near-black #05080A voids, cyan #19E6FF cold highlights, amber #FFB020 warm lows, ice #EAFCFF speculars. Faint atmospheric mist, no heavy rain, procedural and surveilled and quiet. Shot on an ARRI Alexa Mini LF with Panavision Ultra Vintage anamorphic lenses in the 35 to 85mm range at T2.3, Tiffen Black Pro-Mist 1/4 filtration, Kodak Vision3 250D at 400 ASA, palette-driven grade, strong vertical negative space, ultra-wide establishing framing.

Hyperrealistic photography. Surfaces and materials rendered with real texture — weathered concrete, brushed and rusted steel, smudged glass, glowing glass neon tubing, condensation and grime — with real weight and real surface variation. Light with real falloff, real bounce, and real atmospheric scatter through haze. Visible fine film grain, subtle chromatic aberration at the edges of the frame, soft lens vignette, cinematic color grade with cool clinical highlights and warm amber lows and deep retained blacks. Lived-in, not pristine. Photographic, not rendered.
```

**Plate 2 — Foreground / The Rust**
```
An ultra-wide cinematic foreground photograph, bottom-weighted, of the lip of a half-collapsed underground transit entrance at night, the kind of frame a cinematographer grabs on a location scout. Along the lower portion of the frame: corrugated steel and cracked concrete, exposed conduit and tangled pipes, salvaged rail and station signage from several older systems stacked at mismatched angles, scattered scrap and disassembled mechanical limb parts, a single salvaged neon tube buzzing amber. A welder's torch throws warm amber and orange light raking across rusted metal, with a faint cold cyan rim spilling from somewhere above. The upper two-thirds of the frame is deep near-black void and shadow — vast empty negative space above the detailed foreground silhouette, with only faint drifting haze and a distant pinprick of cold light. Warm amber and sodium palette grounded in near-black #05080A, amber #FFB020 dominant, a thread of cyan #19E6FF rim light, ice #EAFCFF hot specular on the torch flame. Gritty, weathered, lived-in, faintly surveilled, no people, no rain. Shot on an ARRI Alexa Mini LF with Panavision Ultra Vintage anamorphic lenses in the 35 to 85mm range at T2.3, Tiffen Black Pro-Mist 1/4 filtration, Kodak Vision3 250D at 400 ASA, palette-driven grade, heavy negative space in the upper frame, ultra-wide framing.

Hyperrealistic photography. Surfaces and materials rendered with real texture — weathered concrete, brushed and rusted steel, oxidized copper, glowing glass neon tubing, oil, condensation and grime — with real weight and real surface variation. Light with real falloff, real bounce, and real atmospheric scatter through haze. Visible fine film grain, subtle chromatic aberration at the edges of the frame, soft lens vignette, cinematic color grade with warm amber lows and deep retained blacks. Lived-in, not pristine. Photographic, not rendered.
```

**Plate 3 — Far / sky**
```
An ultra-wide cinematic atmospheric photograph of a distant near-future skyline dissolving into haze at night, maximal negative space, the kind of quiet wide a cinematographer grabs for an establishing plate. Far across the frame, tall impossibly thin mirror-black corporate arcology towers stand far apart, lit by clinical cold cyan and pale blue-white light, half-dematerialized by smog, silent and sparse. Above and around them an immense dark sky grades from cold cyan-teal at the very top down toward a warm amber wash near the low horizon, a faint hazy pale disc of a moon barely punching through the murk, and a barely-perceptible rectilinear surveillance camera-grid shimmer hanging in the air. The frame is mostly empty atmosphere and depth, minimal foreground, vast and still. The palette flows near-black #05080A through cold cyan #19E6FF to warm amber #FFB020, with ice #EAFCFF faint speculars. Procedural, surveilled, quiet, no rain. Shot on an ARRI Alexa Mini LF with Panavision Ultra Vintage anamorphic lenses in the 35 to 85mm range at T2.3, Tiffen Black Pro-Mist 1/4 filtration, Kodak Vision3 250D at 400 ASA, palette-driven grade, extreme negative space, ultra-wide atmospheric establishing framing.

Hyperrealistic photography. Surfaces and materials rendered with real texture — distant glass and steel, layered atmospheric smog, faint light haze — with real weight and real surface variation. Light with real falloff, real bounce, and real atmospheric scatter through deep haze. Visible fine film grain, subtle chromatic aberration at the edges of the frame, soft lens vignette, cinematic color grade with cool clinical highlights and warm amber lows and deep retained blacks. Lived-in, not pristine. Photographic, not rendered.
```

## Appendix B — World reference

The hero world derives from the user's Japanese-tutor vault at `C:\Users\gjgut\japanesetutor` (Neo-Tokyo; three layers — Glass Mile / Kuroshibuya / Under-Ueno-The Rust; the visibility gradient; factions Obsidian-9, Onryō, Ghostline, DNS, The Rust). Canon is frozen; the portfolio only borrows the *setting's structure and palette mapping* for the hero, not plot or characters.
