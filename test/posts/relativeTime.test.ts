import { describe, it, expect } from "vitest"
import { relativeTime } from "@/lib/posts/relativeTime"
const now = new Date("2026-06-10T00:00:00Z")
describe("relativeTime", () => {
  it("returns 'now' for today", () => { expect(relativeTime("2026-06-10", now)).toBe("now") })
  it("returns days", () => { expect(relativeTime("2026-06-05", now)).toBe("5d") })
  it("returns weeks", () => { expect(relativeTime("2026-05-20", now)).toBe("3w") })
  it("returns months", () => { expect(relativeTime("2026-03-10", now)).toBe("3mo") })
})
