import { describe, it, expect } from "vitest"
import path from "node:path"
import { loadPosts } from "@/lib/posts/load"

describe("loadPosts (seed content)", () => {
  it("loads, validates, and sorts newest-first", () => {
    const posts = loadPosts()
    expect(posts.length).toBeGreaterThan(0)
    for (let i = 1; i < posts.length; i++) { expect(posts[i - 1].date >= posts[i].date).toBe(true) }
  })
  it("derives id from filename", () => {
    const posts = loadPosts()
    expect(posts.every((p) => typeof p.id === "string" && p.id.length > 0)).toBe(true)
  })
})

describe("loadPosts (fixtures)", () => {
  it("returns 1 post with correct id from feed-ok fixture", () => {
    const posts = loadPosts(path.join(process.cwd(), "test", "fixtures", "feed-ok"))
    expect(posts).toHaveLength(1)
    expect(posts[0].id).toBe("2026-01-01-sample")
  })
  it("throws on invalid frontmatter in feed-bad fixture", () => {
    expect(() => loadPosts(path.join(process.cwd(), "test", "fixtures", "feed-bad"))).toThrow(/feed-bad|bad\.mdx|Invalid/)
  })
})
