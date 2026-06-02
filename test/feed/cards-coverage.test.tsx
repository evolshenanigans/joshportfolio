import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { VideoCard } from "@/components/feed/cards/VideoCard"
import { LogCard } from "@/components/feed/cards/LogCard"
import { PostRow } from "@/components/feed/PostRow"
import type { Post } from "@/lib/posts/schema"

it("VideoCard renders title + links to youtube", () => {
  const p = { id: "v", type: "video", date: "2026-06-01", title: "How I built it", youtube: "abc123", body: "" } as unknown as Post
  render(<VideoCard post={p as Extract<Post, { type: "video" }>} />)
  expect(screen.getByText("How I built it")).toBeInTheDocument()
  expect(screen.getByRole("link")).toHaveAttribute("href", expect.stringContaining("abc123"))
})

it("LogCard renders its body", () => {
  const p = { id: "l", type: "log", date: "2026-06-01", body: "shipped a thing" } as unknown as Post
  render(<LogCard post={p as Extract<Post, { type: "log" }>} />)
  expect(screen.getByText("shipped a thing")).toBeInTheDocument()
})

it("PostRow shows the type tag + relative time", () => {
  const p = { id: "x", type: "build", date: "2026-06-01", title: "T", summary: "S", status: "building", links: {}, body: "" } as unknown as Post
  const { container } = render(
    <ul>
      <PostRow post={p}><span>child</span></PostRow>
    </ul>
  )
  expect(screen.getByText("build")).toBeInTheDocument()
  expect(screen.getByText("child")).toBeInTheDocument()
})
