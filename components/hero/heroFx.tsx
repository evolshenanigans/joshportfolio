export function CameraGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 opacity-40"
      style={{
        backgroundImage:
          "linear-gradient(var(--glow-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--glow-cyan) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage: "linear-gradient(180deg, black, transparent 45%)",
        WebkitMaskImage: "linear-gradient(180deg, black, transparent 45%)",
      }}
    />
  )
}

export function VisibilityRail() {
  return (
    <div
      className="pointer-events-none absolute right-4 top-16 bottom-16 z-20 w-1 rounded-full"
      style={{
        background: "linear-gradient(180deg, var(--accent), #dfeff5 48%, var(--accent-2))",
        boxShadow: "0 0 12px var(--glow-cyan)",
      }}
      aria-hidden
    />
  )
}
