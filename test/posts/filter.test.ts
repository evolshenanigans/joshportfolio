import { describe, it, expect } from "vitest"
import { filterPosts, FILTERS } from "@/lib/posts/filter"
import type { Post } from "@/lib/posts/schema"

const posts = [
  { id: "a", type: "build", date: "2026-06-01", body: "" },
  { id: "b", type: "ship", date: "2026-05-01", body: "" },
  { id: "c", type: "video", date: "2026-04-01", body: "" },
  { id: "d", type: "log", date: "2026-03-01", body: "" },
  { id: "e", type: "post", date: "2026-02-01", body: "" },
] as unknown as Post[]

describe("filterPosts", () => {
  it("All returns everything", () => { expect(filterPosts(posts, "All")).toHaveLength(5) })
  it("Projects returns build + ship", () => { expect(filterPosts(posts, "Projects").map((p) => p.id)).toEqual(["a", "b"]) })
  it("Videos returns only video", () => { expect(filterPosts(posts, "Videos").map((p) => p.id)).toEqual(["c"]) })
  it("Posts returns only post type", () => { expect(filterPosts(posts, "Posts").map((p) => p.id)).toEqual(["e"]) })
  it("Logs returns only log type", () => { expect(filterPosts(posts, "Logs").map((p) => p.id)).toEqual(["d"]) })
  it("exposes the chip list", () => { expect(FILTERS).toContain("All") })
})
