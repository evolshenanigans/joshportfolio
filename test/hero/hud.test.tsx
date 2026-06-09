import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { HeroHud } from "@/components/hero/HeroHud"

describe("HeroHud", () => {
  it("exposes the wordmark as the page h1", () => {
    render(<HeroHud />)
    expect(screen.getByRole("heading", { level: 1, name: /WAHNAHBE/ })).toBeInTheDocument()
  })

  it("renders the building pill and safe external links", () => {
    render(<HeroHud />)
    expect(screen.getByText(/BUILDING/)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("greys out coming-soon socials instead of linking", () => {
    render(<HeroHud />)
    // youtube isn't live yet (site.comingSoon) — no dead link, just a SOON tag
    expect(screen.queryByRole("link", { name: /youtube/i })).toBeNull()
    expect(screen.getByText(/youtube/i)).toBeInTheDocument()
    expect(screen.getByText("SOON")).toBeInTheDocument()
  })
})
