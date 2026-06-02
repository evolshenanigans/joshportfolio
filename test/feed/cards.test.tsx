import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { BuildCard } from "@/components/feed/cards/BuildCard"
import type { Post } from "@/lib/posts/schema"

const p = { id: "x", type: "build", date: "2026-06-01", title: "Japanese Tutor",
  summary: "An AI tutor.", status: "building", links: {} } as unknown as Post

describe("BuildCard", () => {
  it("renders the title", () => {
    render(<BuildCard post={p as Extract<Post, { type: "build" | "ship" }>} />)
    expect(screen.getByText("Japanese Tutor")).toBeInTheDocument()
  })
})
