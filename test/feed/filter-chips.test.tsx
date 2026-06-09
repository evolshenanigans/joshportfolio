import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { FilterChips } from "@/components/feed/FilterChips"

describe("FilterChips", () => {
  it("exposes the active filter via aria-pressed", () => {
    render(<FilterChips active="All" onChange={() => {}} />)
    expect(screen.getByRole("button", { name: "All", pressed: true })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Videos", pressed: false })).toBeInTheDocument()
  })

  it("fires onChange with the clicked filter", () => {
    const onChange = vi.fn()
    render(<FilterChips active="All" onChange={onChange} />)
    fireEvent.click(screen.getByRole("button", { name: "Videos" }))
    expect(onChange).toHaveBeenCalledWith("Videos")
  })
})
