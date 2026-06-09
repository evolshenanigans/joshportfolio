import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { HeroHud } from "@/components/hero/HeroHud"

describe("HeroHud", () => {
  it("exposes the wordmark as the page h1", () => {
    render(<HeroHud />)
    expect(screen.getByRole("heading", { level: 1, name: /WAHNAHBE/ })).toBeInTheDocument()
  })

  it("renders the building pill and social links", () => {
    render(<HeroHud />)
    expect(screen.getByText(/BUILDING/)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /youtube/i })).toHaveAttribute("rel", "noopener noreferrer")
  })
})
