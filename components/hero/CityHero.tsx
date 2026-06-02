import Image from "next/image"
import { HeroHud } from "@/components/hero/HeroHud"
import { ParallaxScene } from "@/components/hero/ParallaxScene"

// Reduced-motion fallback: a single still plate, no motion. CSS-gated so SSR ships both
// and the browser shows the right one with no JS branch.
function StaticScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-bg motion-safe:hidden">
      <Image src="/megacity.png" alt="" fill priority className="object-cover object-bottom" sizes="100vw" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, var(--bg))" }} />
    </div>
  )
}

export function CityHero() {
  return (
    <section className="relative h-[88vh] min-h-[560px] w-full">
      <StaticScene />
      <div className="motion-reduce:hidden absolute inset-0">
        <ParallaxScene />
      </div>
      <HeroHud />
    </section>
  )
}
