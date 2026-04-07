"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import type { TimelineEntry } from "@/lib/data"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const chapterLabels: Record<TimelineEntry["chapter"], string> = {
  teacher: "Teacher",
  engineer: "Engineer",
  scientist: "Scientist",
}

interface ArcRailProps {
  entries: readonly TimelineEntry[]
}

export function ArcRail({ entries }: ArcRailProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const track = trackRef.current
    if (!wrapper || !track) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - wrapper.clientWidth

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      })
    }, wrapper)

    // Force refresh after layout settles (fonts, images, etc.)
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200)
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener("load", onLoad)

    return () => {
      window.clearTimeout(refreshTimer)
      window.removeEventListener("load", onLoad)
      ctx.revert()
    }
  }, [])

  return (
    <div ref={wrapperRef} className="section-paper overflow-hidden relative">
      {/* horizon rule — runs across entire rail */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-1/2 h-px bg-black/10 pointer-events-none"
      />
      <div
        ref={trackRef}
        className="flex items-center gap-16 py-32 pl-[10vw] will-change-transform relative"
      >
        <div className="shrink-0 max-w-md pr-12 border-r border-black/20">
          <p className="text-xs uppercase tracking-[0.3em] mb-4 text-[var(--accent)]">
            02 — The Arc
          </p>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
            Three careers.
            <br />
            <span className="italic text-[var(--accent)]">One throughline.</span>
          </h2>
          <p className="mt-6 opacity-70 max-w-sm flex items-center gap-3">
            <span className="inline-block w-10 h-px bg-[var(--accent)]" />
            Scroll →
          </p>
        </div>

        {entries.map((t, i) => {
          const prev = entries[i - 1]
          const isChapterStart = !prev || prev.chapter !== t.chapter
          const chapterNum =
            t.chapter === "teacher" ? 1 : t.chapter === "engineer" ? 2 : 3
          return (
            <div key={t.id} className="flex items-stretch gap-16 shrink-0">
              {isChapterStart && (
                <div className="flex flex-col justify-end border-l-2 border-[var(--accent)] pl-6 w-[14rem] relative">
                  <span
                    aria-hidden
                    className="absolute -left-[7px] top-1/2 w-3 h-3 rounded-full bg-[var(--accent)]"
                  />
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
                    Chapter 0{chapterNum}
                  </p>
                  <p className="font-display text-4xl md:text-5xl mt-1 italic">
                    {chapterLabels[t.chapter]}
                  </p>
                </div>
              )}
              <article className="w-[22rem] shrink-0 relative pt-6">
                {/* tick mark on the horizon rule */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 w-px h-6 bg-[var(--accent)]"
                />
                <span
                  aria-hidden
                  className="absolute -left-[4px] -top-[3px] w-[9px] h-[9px] rounded-full bg-[var(--accent)]"
                />
                <div className="border-t border-black/80 pt-4">
                  <p className="font-display text-sm text-[var(--accent)] tracking-wider">
                    {t.year}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl mt-1 leading-tight">
                    {t.role}
                  </h3>
                  <p className="text-sm opacity-60 mb-3 italic">
                    {t.org} · {t.location}
                  </p>
                  <p className="text-sm leading-relaxed">{t.blurb}</p>
                </div>
              </article>
            </div>
          )
        })}

        <div className="shrink-0 w-[20vw]" />
      </div>
    </div>
  )
}
