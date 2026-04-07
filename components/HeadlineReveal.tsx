"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface HeadlineRevealProps {
  text: string
  className?: string
}

export function HeadlineReveal({ text, className }: HeadlineRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const words = text.split(" ")

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      gsap.set(el.querySelectorAll(".word > span"), { yPercent: 0, rotate: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".word > span"),
        { yPercent: 110, rotate: 6 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <h1 ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          className="word inline-block overflow-hidden mr-[0.25em] align-bottom"
        >
          <span className="inline-block will-change-transform">{w}</span>
        </span>
      ))}
    </h1>
  )
}
