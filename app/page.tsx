import { headline, projects, timeline, stats, skills, contact } from "@/lib/data"
import { ScrollReveal } from "@/components/ScrollReveal"
import { SectionNav } from "@/components/SectionNav"
import { StatCounter } from "@/components/StatCounter"
import { HeadlineReveal } from "@/components/HeadlineReveal"
import { ArcRail } from "@/components/ArcRail"
import { ColdOpen } from "@/components/three/ColdOpen"
import { ProjectCanvas, type ProjectSceneId } from "@/components/three/ProjectCanvas"

export default function Home() {
  return (
    <main>
      <SectionNav />
      {/* 00 — Cold open */}
      <section
        id="open"
        className="relative min-h-screen flex items-center justify-center px-6"
      >
        <div className="absolute inset-0">
          <ColdOpen />
        </div>
        <p className="relative font-display text-sm uppercase tracking-[0.4em] text-[var(--text-muted)] self-start mt-8 pointer-events-none">
          Joshua Gutierrez — Portfolio 2026
        </p>
      </section>

      {/* 01 — Manifesto / headline */}
      <section
        id="manifesto"
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 max-w-[1400px] mx-auto"
      >
        <HeadlineReveal
          text={headline.h1}
          className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight"
        />
        <ScrollReveal
          as="p"
          delay={0.15}
          className="mt-8 max-w-2xl text-lg md:text-xl text-[var(--text-muted)] font-sans"
        >
          {headline.sub}
        </ScrollReveal>
      </section>

      {/* 02 — The Arc (horizontal rail) */}
      <section id="arc">
        <ArcRail entries={timeline} />
      </section>

      {/* 03 — Selected Work */}
      <section id="work" className="py-32 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-4 text-[var(--text-muted)]">
            03 — Selected Work
          </p>
          <h2 className="font-display text-4xl md:text-6xl mb-16">The receipts.</h2>
          <ul className="grid gap-24">
            {projects.map((p, i) => (
              <li
                key={p.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-[var(--rule)] pt-10"
              >
                <div
                  className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <ProjectCanvas id={p.id as ProjectSceneId} />
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                  <span className="font-display text-xl text-[var(--accent)] mb-2">
                    {p.number}
                  </span>
                  <h3 className="font-display text-3xl md:text-5xl leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-[var(--text-muted)] mb-4">{p.subtitle}</p>
                  <p className="max-w-xl mb-5">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs uppercase tracking-wider border border-[var(--rule)] px-2 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--accent)] underline underline-offset-4 self-start"
                  >
                    View repo →
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — Toolbox */}
      <section
        id="toolbox"
        className="section-paper py-40 px-6 md:px-16 min-h-screen flex items-center"
      >
        <div className="max-w-[1400px] mx-auto w-full grid md:grid-cols-[0.9fr_1.4fr] gap-16 md:gap-24">
          <div className="md:sticky md:top-32 self-start">
            <p className="text-xs uppercase tracking-[0.3em] mb-4 text-[var(--accent)]">
              04 — The Toolbox
            </p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] mb-6">
              What&apos;s on
              <br />
              the <span className="italic">desk.</span>
            </h2>
            <p className="text-lg opacity-70 max-w-sm">
              Tools I reach for without thinking — grouped by where they live in my
              workflow.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {(
              [
                { key: "core", label: "Core", num: "01" },
                { key: "ml", label: "Machine Learning", num: "02" },
                { key: "data", label: "Data & Analytics", num: "03" },
                { key: "eng", label: "Engineering", num: "04" },
                { key: "cloud", label: "Cloud", num: "05" },
              ] as const
            ).map((group) => {
              const items = skills.filter((s) => s.category === group.key)
              return (
                <div
                  key={group.key}
                  className="grid grid-cols-[auto_1fr] gap-6 md:gap-8 border-t border-black/80 pt-5"
                >
                  <div className="flex flex-col">
                    <span className="font-display text-xs tracking-[0.3em] text-[var(--accent)]">
                      {group.num}
                    </span>
                    <span className="font-display text-lg md:text-xl italic opacity-80 whitespace-nowrap">
                      {group.label}
                    </span>
                  </div>
                  <ul className="flex flex-wrap gap-x-6 gap-y-2 items-baseline">
                    {items.map((s, i) => (
                      <li
                        key={s.name}
                        className="font-display text-2xl md:text-4xl leading-none flex items-baseline"
                      >
                        {s.name}
                        {i < items.length - 1 && (
                          <span
                            aria-hidden
                            className="ml-6 text-[var(--accent)] text-xl"
                          >
                            ·
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 05 — Numbers that moved */}
      <section id="numbers" className="py-32 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-4 text-[var(--text-muted)]">
            05 — Numbers that moved
          </p>
          <ul className="grid md:grid-cols-2 gap-10 mt-16">
            {stats.map((s) => (
              <li key={s.label} className="border-t border-[var(--rule)] pt-6">
                <p className="font-display text-6xl md:text-8xl text-[var(--accent)]">
                  <StatCounter value={s.value} />
                </p>
                <p className="mt-2 text-lg">{s.label}</p>
                <p className="text-sm text-[var(--text-muted)]">{s.source}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — Contact */}
      <section
        id="contact"
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden"
      >
        {/* giant background numeral */}
        <p
          aria-hidden
          className="pointer-events-none absolute -right-8 md:-right-16 bottom-0 font-display leading-none text-[28rem] md:text-[44rem] text-[var(--accent)]/[0.05] select-none"
        >
          06
        </p>
        {/* accent ruled line */}
        <div
          aria-hidden
          className="absolute top-[22%] left-0 w-[38%] h-px bg-[var(--accent)]/40"
        />
        <div className="relative max-w-[1400px] mx-auto w-full grid md:grid-cols-[auto_1fr] gap-12 items-start">
          <div className="shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 overflow-hidden border border-[var(--rule)] grayscale hover:grayscale-0 transition-all">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={contact.photo}
                alt="Joshua Gutierrez"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] mb-4 text-[var(--text-muted)]">
            06 — Say hello
          </p>
          <h2 className="font-display text-5xl md:text-7xl mb-10">Let&apos;s build something.</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`mailto:${contact.email}`} className="border border-[var(--rule)] p-6 hover:border-[var(--accent)] transition-colors">
              <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Email</p>
              <p className="font-display text-xl mt-1">{contact.email}</p>
            </a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="border border-[var(--rule)] p-6 hover:border-[var(--accent)] transition-colors">
              <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">GitHub</p>
              <p className="font-display text-xl mt-1">evolshenanigans</p>
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="border border-[var(--rule)] p-6 hover:border-[var(--accent)] transition-colors">
              <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">LinkedIn</p>
              <p className="font-display text-xl mt-1">gjgutierrez</p>
            </a>
            <a href={contact.resume} target="_blank" rel="noopener noreferrer" className="border border-[var(--rule)] p-6 hover:border-[var(--accent)] transition-colors">
              <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Resume</p>
              <p className="font-display text-xl mt-1">2026 — PDF</p>
            </a>
          </div>
          <p className="mt-10 text-sm text-[var(--text-muted)]">
            {contact.location}
          </p>
          </div>
        </div>
      </section>
    </main>
  )
}
