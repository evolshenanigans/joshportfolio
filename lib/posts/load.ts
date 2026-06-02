import "server-only"
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { postFrontmatterSchema, type Post } from "@/lib/posts/schema"

const DIR = path.join(process.cwd(), "content", "feed")

export function loadPosts(dir: string = DIR): Post[] {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8")
    const { data, content } = matter(raw)
    // gray-matter auto-parses bare YAML dates to Date objects; coerce back to ISO string
    const normalized = { ...data, date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date }
    const parsed = postFrontmatterSchema.safeParse(normalized)
    if (!parsed.success) {
      throw new Error(`Invalid frontmatter in ${path.join(dir, file)}: ${parsed.error.message}`)
    }
    const id = file.replace(/\.mdx$/, "")
    return { ...parsed.data, id, body: content.trim() } as Post
  })
  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}
