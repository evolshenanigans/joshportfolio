import { site } from "@/lib/site"

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
