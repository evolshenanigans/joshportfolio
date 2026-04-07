"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { useEffect, useRef, useState } from "react"
import {
  PlayerformationsScene,
  LogiFlowScene,
  DeepLensScene,
  ChronoVaultScene,
  SentinelFraudScene,
} from "./projectScenes"

const sceneMap = {
  playerformations: PlayerformationsScene,
  "logi-flow-japan": LogiFlowScene,
  deeplens: DeepLensScene,
  chronovault: ChronoVaultScene,
  "sentinel-fraud": SentinelFraudScene,
} as const

export type ProjectSceneId = keyof typeof sceneMap

interface ProjectCanvasProps {
  id: ProjectSceneId
}

export function ProjectCanvas({ id }: ProjectCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setMounted(true)
            obs.disconnect()
            break
          }
        }
      },
      { rootMargin: "200px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const Scene = sceneMap[id]

  return (
    <div
      ref={wrapperRef}
      className="relative aspect-square w-full border border-[var(--rule)] bg-gradient-to-br from-black/40 via-[#1a0a08]/40 to-black/60"
    >
      {mounted && (
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 5, 6]} intensity={1} />
          <pointLight position={[-3, -2, -4]} intensity={0.6} color="#ff5436" />
          <Scene />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
          />
          <EffectComposer>
            <Bloom intensity={0.6} luminanceThreshold={0.3} mipmapBlur />
          </EffectComposer>
        </Canvas>
      )}
      <p className="absolute bottom-3 right-3 text-[10px] uppercase tracking-widest text-[var(--text-muted)] pointer-events-none">
        Drag to orbit
      </p>
    </div>
  )
}
