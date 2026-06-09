import { describe, it, expect } from "vitest"
import { postFrontmatterSchema } from "@/lib/posts/schema"

describe("postFrontmatterSchema", () => {
  it("accepts a valid build post", () => {
    const r = postFrontmatterSchema.safeParse({ type: "build", date: "2026-06-01", title: "Japanese Tutor", summary: "An AI tutor.", status: "building", links: { repo: "https://x.com" } })
    expect(r.success).toBe(true)
  })
  it("rejects a build post missing a title", () => {
    const r = postFrontmatterSchema.safeParse({ type: "build", date: "2026-06-01", summary: "x", status: "building" })
    expect(r.success).toBe(false)
  })
  it("accepts a log post", () => {
    const r = postFrontmatterSchema.safeParse({ type: "log", date: "2026-06-01" })
    expect(r.success).toBe(true)
  })
  it("rejects an unknown type", () => {
    const r = postFrontmatterSchema.safeParse({ type: "tweet", date: "2026-06-01" })
    expect(r.success).toBe(false)
  })
})
