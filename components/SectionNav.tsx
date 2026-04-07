"use client"

import { useEffect, useState } from "react"

const sections = [
  { id: "manifesto", label: "Intro" },
  { id: "arc", label: "Arc" },
  { id: "work", label: "Work" },
  { id: "toolbox", label: "Tools" },
  { id: "numbers", label: "Numbers" },
  { id: "contact", label: "Contact" },
] as const

export function SectionNav() {
  const [active, setActive] = useState<string>("manifesto")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { threshold: [0.3, 0.6] },
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block mix-blend-difference">
      <ul className="flex flex-col gap-4">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="group flex items-center gap-3 justify-end"
              aria-label={s.label}
            >
              <span
                className={`font-sans text-xs uppercase tracking-widest transition-opacity ${
                  active === s.id ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                } text-white`}
              >
                {s.label}
              </span>
              <span
                className={`font-display text-xs tabular-nums text-white transition-opacity ${
                  active === s.id ? "opacity-100" : "opacity-40"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
