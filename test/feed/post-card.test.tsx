import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PostCard } from "@/components/feed/cards/PostCard"
import type { Post } from "@/lib/posts/schema"

type IgPost = Extract<Post, { type: "post" }>

const base = {
  id: "ig-1",
  type: "post",
  date: "2026-06-01",
  caption: "Day 12 of building in public",
  image: "/covers/japanese-tutor.webp",
  body: "",
} as unknown as IgPost

describe("PostCard", () => {
  it("renders the image with the caption as alt text", () => {
    render(<PostCard post={base} />)
    expect(screen.getByAltText("Day 12 of building in public")).toBeInTheDocument()
    expect(screen.getByText("Instagram")).toBeInTheDocument()
  })

  it("wraps in a safe external link when permalink is set", () => {
    render(<PostCard post={{ ...base, permalink: "https://instagram.com/p/abc" } as IgPost} />)
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "https://instagram.com/p/abc")
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("renders no link without a permalink", () => {
    render(<PostCard post={base} />)
    expect(screen.queryByRole("link")).toBeNull()
  })
})
