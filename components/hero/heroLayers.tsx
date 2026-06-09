import { CameraGrid } from "@/components/hero/heroFx"

// Shared hero chrome painted above the visual (canvas frames), below the HUD:
// legibility vignette, camera grid, faint scanlines, and the bottom fade into
// the page background.
export function HeroOverlays() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: "radial-gradient(120% 90% at 50% 44%, rgba(5,8,10,0.02), rgba(5,8,10,0.40) 56%, rgba(5,8,10,0.92))" }}
      />
      <CameraGrid />
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.06]"
        style={{ background: "repeating-linear-gradient(0deg, rgba(234,252,255,0.5) 0 1px, transparent 1px 3px)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3"
        style={{ background: "linear-gradient(180deg, transparent, rgba(5,8,10,0.5) 48%, var(--bg))" }}
      />
    </>
  )
}
