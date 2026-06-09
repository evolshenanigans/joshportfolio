import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import { loadProject, projectSlugs } from "@/lib/projects/load"

export function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = loadProject(slug)
  return { title: p ? `${p.meta.title} — Wahnahbe` : "Project — Wahnahbe" }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = loadProject(slug)
  if (!project) notFound()
  return (
    <main className="mx-auto max-w-3xl px-5 pt-28 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
        {project.meta.status ?? "project"}
      </p>
      <h1 className="mt-3 font-mono text-3xl font-bold text-text">{project.meta.title}</h1>
      <p className="mt-2 text-text-muted">{project.meta.summary}</p>
      <article className="mt-8 space-y-4 text-text/90 [&_h2]:mt-8 [&_h2]:font-mono [&_h2]:text-accent [&_h2]:text-lg [&_p]:leading-relaxed">
        <MDXRemote source={project.body} />
      </article>
      {project.meta.repo && (
        <a
          href={project.meta.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block font-mono text-sm text-accent underline underline-offset-4"
        >
          view repo →
        </a>
      )}
    </main>
  )
}
