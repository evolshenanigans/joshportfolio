"use client"
import Lenis from "@studio-freight/lenis"
import { useEffect } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Lerp mode: frame-based, accumulates flicks naturally (no tween reset).
      // 0.15 = 15% toward target per frame → immediate response, ~400ms settle.
      lerp: 0.15,
      wheelMultiplier: 1.3,
      smoothWheel: true,
      syncTouch: false,
      normalizeWheel: true,
    } as ConstructorParameters<typeof Lenis>[0])

    // Drive Lenis from GSAP's ticker so ScrollTrigger scrub stays in sync
    lenis.on("scroll", ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
  return <>{children}</>
}
