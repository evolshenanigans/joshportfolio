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
