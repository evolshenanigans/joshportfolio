import "server-only"
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const DIR = path.join(process.cwd(), "content", "projects")

export function projectSlugs(): string[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

export interface ProjectMeta {
  title: string
  summary: string
  status?: string
  repo?: string
  cover?: string
}

export interface Project {
  slug: string
  meta: ProjectMeta
  body: string
}

export function loadProject(slug: string): Project | null {
  const file = path.join(DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, "utf8"))
  return { slug, meta: data as ProjectMeta, body: content }
}
