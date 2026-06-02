import type { Metadata } from "next"
import { about, site } from "@/lib/site"
import { CornerFrame } from "@/components/hud/CornerFrame"

export const metadata: Metadata = { title: "About — Wahnahbe" }

export default function About() {
  return (
    <main className="mx-auto max-w-3xl px-5 pt-28 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">the human behind wahnahbe</p>
      <p className="mt-4 text-lg leading-relaxed text-text">{about.bio}</p>
      <CornerFrame className="mt-10 p-6">
        <ul className="space-y-4">
          {about.arc.map((e) => (
            <li key={e.year} className="grid grid-cols-[84px_1fr] gap-4">
              <span className="font-mono text-xs text-accent-2">{e.year}</span>
              <span className="text-sm text-text-muted">{e.what}</span>
            </li>
          ))}
        </ul>
      </CornerFrame>
      <a
        href={site.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block font-mono text-sm text-accent underline underline-offset-4"
      >
        résumé — PDF →
      </a>
    </main>
  )
}
