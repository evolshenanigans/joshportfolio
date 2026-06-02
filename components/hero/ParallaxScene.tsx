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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"))
    let raf = 0
    let px = 0, py = 0

    const apply = () => {
      raf = 0
      const sy = window.scrollY
      for (const layer of layers) {
        const d = Number(layer.dataset.depth)
        layer.style.transform = `translate3d(${px * d * -0.6}px, ${py * d * -0.4 - sy * (d / 800)}px, 0) scale(1.08)`
      }
    }

    // Mobile / coarse pointers: scroll-only drift, no pointer parallax.
    if (window.matchMedia("(pointer: coarse), (max-width: 768px)").matches) {
      const onScrollOnly = () => { if (!raf) raf = requestAnimationFrame(apply) }
      window.addEventListener("scroll", onScrollOnly, { passive: true })
      apply()
      return () => { window.removeEventListener("scroll", onScrollOnly); if (raf) cancelAnimationFrame(raf) }
    }

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      px = (e.clientX - r.left) / r.width - 0.5
      py = (e.clientY - r.top) / r.height - 0.5
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
