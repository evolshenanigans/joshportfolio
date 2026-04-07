"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface StatCounterProps {
  value: string // e.g. "31%"
  className?: string
}

export function StatCounter({ value, className }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const match = value.match(/^(\d+)(.*)$/)
    if (!match) {
      setDisplay(value)
      return
    }
    const target = Number(match[1])
    const suffix = match[2]

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(`${target}${suffix}`)
      return
    }

    const obj = { n: 0 }
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: target,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => setDisplay(`${Math.round(obj.n)}${suffix}`),
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })
    }, el)

    return () => ctx.revert()
  }, [value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
