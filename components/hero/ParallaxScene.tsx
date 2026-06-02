"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { CameraGrid, VisibilityRail } from "@/components/hero/heroFx"

// One clean plate (the full vertical Neo-Tokyo) with a slow Ken-Burns zoom (CSS)
// plus a gentle mouse-tilt + scroll drift (JS). The plates are full scenes, not
// transparent cut-outs, so we lead with the strongest single image rather than
// stacking three. CityHero keeps this behind a swap boundary for a future 3D version.
export function ParallaxScene() {
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let px = 0
    let py = 0
    const apply = () => {
      raf = 0
      const sy = window.scrollY
      el.style.transform = `translate3d(${px * 14}px, ${py * 10 + sy * 0.12}px, 0)`
    }

    // Mobile / coarse pointers: scroll drift only, no pointer tilt.
    if (window.matchMedia("(pointer: coarse), (max-width: 768px)").matches) {
      const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply) }
      window.addEventListener("scroll", onScroll, { passive: true })
      apply()
      return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf) }
    }

    const onMove = (e: PointerEvent) => {
      px = e.clientX / window.innerWidth - 0.5
      py = e.clientY / window.innerHeight - 0.5
      if (!raf) raf = requestAnimationFrame(apply)
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
    <div className="absolute inset-0 overflow-hidden bg-bg">
      <div ref={wrap} className="hero-zoom absolute inset-[-9%] will-change-transform">
        <Image src="/megacity.png" alt="" fill priority sizes="100vw" className="object-cover object-[50%_42%]" />
      </div>
      {/* legibility: soft center light → dark vignette so the HUD reads over the city */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(115% 85% at 50% 44%, rgba(5,8,10,0.10), rgba(5,8,10,0.52) 52%, rgba(5,8,10,0.92))" }}
      />
      <CameraGrid />
      <VisibilityRail />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(180deg, transparent, var(--bg))" }}
      />
    </div>
  )
}
