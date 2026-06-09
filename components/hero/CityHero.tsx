import { CityDescent } from "@/components/hero/CityDescent"

// CityHero is the swap point for the hero treatment. It renders the
// scroll-driven canvas frame-sequence descent (CityDescent) and can be swapped
// for an R3F/Three.js renderer later without touching callers.
export function CityHero() {
  return <CityDescent />
}
