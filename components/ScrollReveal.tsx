"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  as?: "div" | "section" | "h1" | "h2" | "h3" | "p" | "ul" | "li"
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 40,
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [delay, y])

  const Tag = as as unknown as React.ComponentType<{
    ref?: React.Ref<HTMLElement>
    className?: string
    children?: React.ReactNode
  }>
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
