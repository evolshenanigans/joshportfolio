import { describe, it, expect } from "vitest"
import { loadPosts } from "@/lib/posts/load"
describe("loadPosts", () => {
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
