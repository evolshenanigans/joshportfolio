import type { ReactNode } from "react"

export function CornerFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative border border-line ${className}`}>
      <span className="pointer-events-none absolute -top-px -left-px h-3 w-3 border-t-2 border-l-2 border-accent" />
      <span className="pointer-events-none absolute -top-px -right-px h-3 w-3 border-t-2 border-r-2 border-accent" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-accent" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-accent" />
      {children}
    </div>
  )
}
