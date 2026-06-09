import fs from "node:fs"
import path from "node:path"
import { describe, it, expect } from "vitest"
import { loadPosts } from "@/lib/posts/load"

// Guards against referencing assets that exist locally but aren't committed
// (e.g. gitignored hero source media) — such paths 404 on a fresh clone/deploy.
describe("content asset references", () => {
  it("every content image path resolves under public/", () => {
    for (const p of loadPosts()) {
      const refs = [
        "cover" in p ? p.cover : undefined,
        "image" in p ? p.image : undefined,
        "thumbnail" in p ? p.thumbnail : undefined,
      ]
      for (const ref of refs) {
        if (ref?.startsWith("/")) {
          expect(
            fs.existsSync(path.join(process.cwd(), "public", ref)),
            `${p.id} references ${ref}, which does not exist under public/`,
          ).toBe(true)
        }
      }
    }
  })
})
