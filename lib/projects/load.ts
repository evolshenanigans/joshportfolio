import "server-only"
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { projectSchema, type Project } from "@/lib/projects/schema"

const DIR = path.join(process.cwd(), "content", "projects")

export function projectSlugs(dir: string = DIR): string[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

export function loadProject(slug: string, dir: string = DIR): Project | null {
  const file = path.join(dir, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, "utf8"))
  const parsed = projectSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(`Invalid frontmatter in ${file}: ${parsed.error.message}`)
  }
  return { slug, meta: parsed.data, body: content }
}

export type { Project, ProjectMeta } from "@/lib/projects/schema"
