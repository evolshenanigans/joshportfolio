import path from "node:path"
import { describe, it, expect } from "vitest"
import { loadProject, projectSlugs } from "@/lib/projects/load"
import { projectSchema } from "@/lib/projects/schema"

const OK_DIR = path.join(process.cwd(), "test", "fixtures", "projects-ok")
const BAD_DIR = path.join(process.cwd(), "test", "fixtures", "projects-bad")

describe("projectSchema", () => {
  it("accepts valid frontmatter", () => {
    const r = projectSchema.safeParse({
      title: "T",
      summary: "S",
      status: "building",
      repo: "https://github.com/example/x",
    })
    expect(r.success).toBe(true)
  })

  it("rejects frontmatter missing a title", () => {
    const r = projectSchema.safeParse({ summary: "S" })
    expect(r.success).toBe(false)
  })
})

describe("loadProject (fixtures)", () => {
  it("loads and validates a valid project", () => {
    const p = loadProject("sample", OK_DIR)
    expect(p).not.toBeNull()
    expect(p?.meta.title).toBe("Sample Project")
    expect(p?.body).toContain("Fixture body")
  })

  it("throws with the filename on invalid frontmatter", () => {
    expect(() => loadProject("bad", BAD_DIR)).toThrow(/bad\.mdx|Invalid/)
  })

  it("returns null for a missing slug", () => {
    expect(loadProject("does-not-exist", OK_DIR)).toBeNull()
  })
})

describe("loadProject (live content)", () => {
  it("every committed project validates", () => {
    for (const slug of projectSlugs()) {
      expect(() => loadProject(slug)).not.toThrow()
    }
  })
})
