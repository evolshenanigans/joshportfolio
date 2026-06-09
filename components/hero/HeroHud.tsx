import type { ReactNode } from "react"
import { site } from "@/lib/site"

const comingSoon = new Set<string>(site.comingSoon)

// A social entry: a real external link, or — while the channel isn't live —
// a greyed-out label with a SOON tag instead of a dead link.
function SocialItem({ id, href, children }: { id: string; href: string; children: ReactNode }) {
  if (comingSoon.has(id)) {
    return (
      <span className="cursor-default select-none text-text-muted/50" title="coming soon">
        {children}
        <span className="ml-1.5 rounded border border-line/60 px-1 py-px align-middle text-[8px] tracking-[0.15em] text-accent-2/80">
          SOON
        </span>
      </span>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
      {children}
    </a>
  )
}

export function HeroHud() {
  return (
    <div className="relative z-20 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-5 text-center">
      {/* dark spotlight behind the content so the wordmark lifts off the neon */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[440px] w-[720px] max-w-[94vw] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(5,8,10,0.85), rgba(5,8,10,0.45) 50%, transparent 76%)", filter: "blur(12px)" }}
      />
      <h1 className="font-mono">
        <span
          className="text-5xl font-extrabold tracking-[0.04em] text-text md:text-6xl"
          style={{ textShadow: "0 2px 14px rgba(0,0,0,0.95), 0 0 16px var(--accent), 0 0 44px var(--glow-cyan)" }}
        >
          WAHNAHBE
        </span>
        <span
          className="ml-3 align-middle text-base text-accent-2"
          style={{ textShadow: "0 0 12px var(--glow-amber)" }}
        >
          {site.kana}
        </span>
      </h1>
      <p
        className="mt-3 max-w-md text-sm text-text/90"
        style={{ textShadow: "0 1px 10px rgba(0,0,0,0.95)" }}
      >
        {site.tagline}
      </p>
      <div
        className="mt-4 rounded-md border border-line px-3 py-1 font-mono text-xs text-accent"
        style={{ boxShadow: "inset 0 0 12px var(--glow-cyan)" }}
      >
        ● BUILDING · {site.building}
      </div>
      <div className="mt-4 flex items-center gap-4 font-mono text-[11px] text-text-muted">
        <SocialItem id="youtube" href={site.socials.youtube}>▶ youtube</SocialItem>
        <SocialItem id="instagram" href={site.socials.instagram}>◳ instagram</SocialItem>
        <SocialItem id="github" href={site.socials.github}>⌥ github</SocialItem>
        <a href={`mailto:${site.socials.email}`} className="hover:text-accent">
          ✉ email
        </a>
      </div>
      <div className="absolute bottom-6 left-0 right-0 animate-pulse font-mono text-[10px] tracking-[0.18em] text-accent-2/80">
        ↓ DESCEND INTO THE FEED
      </div>
    </div>
  )
}
