import { describe, it, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Feed } from "@/components/feed/Feed"
import type { Post } from "@/lib/posts/schema"

const posts = [
  {
    id: "b1",
    type: "build",
    date: "2026-06-01",
    title: "Japanese Tutor",
    summary: "An AI tutor.",
    status: "building",
    links: {},
    body: "",
  },
  {
    id: "v1",
    type: "video",
    date: "2026-05-20",
    title: "How I built it",
    youtube: "abc123",
    body: "",
  },
] as unknown as Post[]

describe("Feed filtering", () => {
  it("shows only videos when the Videos chip is clicked, and all again on All", () => {
    render(<Feed posts={posts} />)
    expect(screen.getByText("Japanese Tutor")).toBeInTheDocument()
    expect(screen.getByText("How I built it")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Videos" }))
    expect(screen.queryByText("Japanese Tutor")).toBeNull()
    expect(screen.getByText("How I built it")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "All" }))
    expect(screen.getByText("Japanese Tutor")).toBeInTheDocument()
    expect(screen.getByText("How I built it")).toBeInTheDocument()
  })
})
