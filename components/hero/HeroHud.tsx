import { site } from "@/lib/site"

export function HeroHud() {
  return (
    <div className="relative z-20 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-5 text-center">
      <div className="font-mono">
        <span
          className="text-4xl font-extrabold tracking-[0.04em] text-text md:text-5xl"
          style={{ textShadow: "0 0 14px var(--accent), 0 0 36px var(--glow-cyan)" }}
        >
          WAHNAHBE
        </span>
        <span
          className="ml-3 align-middle text-base text-accent-2"
          style={{ textShadow: "0 0 12px var(--glow-amber)" }}
        >
          {site.kana}
        </span>
      </div>
      <p
        className="mt-3 max-w-md text-sm text-text/80"
        style={{ textShadow: "0 0 8px rgba(0,0,0,0.8)" }}
      >
        {site.tagline}
      </p>
      <div
        className="mt-4 rounded-md border border-line px-3 py-1 font-mono text-xs text-accent"
        style={{ boxShadow: "inset 0 0 12px var(--glow-cyan)" }}
      >
        ● BUILDING · {site.building}
      </div>
      <div className="mt-4 flex gap-4 font-mono text-[11px] text-text-muted">
        <a href={site.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          ▶ youtube
        </a>
        <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          ◳ instagram
        </a>
        <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          ⌥ github
        </a>
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
