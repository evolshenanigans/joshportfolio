import Image from "next/image"
import { HeroHud } from "@/components/hero/HeroHud"
import { ParallaxScene } from "@/components/hero/ParallaxScene"

// Reduced-motion fallback: the same single plate + legibility gradient, no motion.
// CSS-gated (motion-safe/motion-reduce) so SSR ships both and the browser picks one.
function StaticScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-bg motion-safe:hidden">
      <Image src="/megacity.png" alt="" fill priority sizes="100vw" className="object-cover object-[50%_42%] scale-[1.08]" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(115% 85% at 50% 44%, rgba(5,8,10,0.10), rgba(5,8,10,0.52) 52%, rgba(5,8,10,0.92))" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(180deg, transparent, var(--bg))" }}
      />
    </div>
  )
}

export function CityHero() {
  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      <StaticScene />
      <div className="motion-reduce:hidden absolute inset-0">
        <ParallaxScene />
      </div>
      <HeroHud />
    </section>
  )
}
