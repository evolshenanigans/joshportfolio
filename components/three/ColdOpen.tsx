"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { useMemo, useRef, useState, useEffect } from "react"
import * as THREE from "three"

// Deterministic neural-node edges (computed once at module level).
const NODE_COUNT = 14
const nodePositions: [number, number, number][] = Array.from(
  { length: NODE_COUNT },
  (_, i) => {
    // Distribute on a fibonacci sphere for even spacing.
    const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    const r = 1.1
    return [
      r * Math.cos(theta) * Math.sin(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(phi),
    ]
  },
)

const edges: [number, number][] = []
for (let i = 0; i < NODE_COUNT; i++) {
  for (let j = i + 1; j < NODE_COUNT; j++) {
    const [ax, ay, az] = nodePositions[i]
    const [bx, by, bz] = nodePositions[j]
    const d = Math.hypot(ax - bx, ay - by, az - bz)
    if (d < 1.5) edges.push([i, j])
  }
}

const edgePoints = new Float32Array(edges.length * 2 * 3)
edges.forEach(([a, b], k) => {
  const pa = nodePositions[a]
  const pb = nodePositions[b]
  edgePoints.set(pa, k * 6)
  edgePoints.set(pb, k * 6 + 3)
})

type Phase = 0 | 1 | 2

interface MorphObjectProps {
  phase: Phase
}

function Chalk({ visible }: { visible: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.x += dt * 0.3
      ref.current.rotation.y += dt * 0.4
      const target = visible
      ref.current.scale.lerp(
        new THREE.Vector3(target, target, target),
        0.08,
      )
    }
  })
  return (
    <mesh ref={ref}>
      <cylinderGeometry args={[0.18, 0.18, 1.6, 24]} />
      <meshStandardMaterial
        color="#f4f1ea"
        roughness={0.9}
        metalness={0.05}
      />
    </mesh>
  )
}

function Key({ visible }: { visible: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.x += dt * 0.2
      ref.current.rotation.y += dt * 0.3
      const target = visible
      ref.current.scale.lerp(
        new THREE.Vector3(target, target, target),
        0.08,
      )
    }
  })

  const keySize = 0.18
  const gap = 0.04
  const step = keySize + gap

  // 4 rows x 10 cols keyboard grid
  const keys = useMemo(() => {
    const arr: { x: number; z: number; w: number }[] = []
    const rows = 4
    const cols = 10
    const offsetX = -((cols - 1) * step) / 2
    const offsetZ = -((rows - 1) * step) / 2
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // spacebar on last row middle
        if (r === rows - 1 && c >= 3 && c <= 6) {
          if (c === 3) arr.push({ x: offsetX + 4.5 * step, z: offsetZ + r * step, w: 4 })
          continue
        }
        arr.push({ x: offsetX + c * step, z: offsetZ + r * step, w: 1 })
      }
    }
    return arr
  }, [step])

  return (
    <group ref={ref} rotation={[-0.35, 0, 0]}>
      {/* base slab — brushed aluminum */}
      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[2.3, 0.08, 1.0]} />
        <meshStandardMaterial
          color="#c8cdd4"
          roughness={0.35}
          metalness={0.9}
        />
      </mesh>
      {/* keys — ivory with soft cyan backlight */}
      {keys.map((k, i) => {
        const width = keySize * k.w + gap * (k.w - 1)
        return (
          <mesh key={i} position={[k.x, 0.03, k.z]}>
            <boxGeometry args={[width, 0.07, keySize]} />
            <meshStandardMaterial
              color="#f4f1ea"
              roughness={0.55}
              metalness={0.2}
              emissive="#6fc3ff"
              emissiveIntensity={0.22}
            />
          </mesh>
        )
      })}
      {/* cyan accent line under base */}
      <mesh position={[0, -0.14, 0]}>
        <boxGeometry args={[2.35, 0.015, 1.05]} />
        <meshStandardMaterial
          color="#6fc3ff"
          emissive="#6fc3ff"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  )
}

function NeuralNode({ visible }: { visible: number }) {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.25
      groupRef.current.rotation.x += dt * 0.08
      const target = visible
      groupRef.current.scale.lerp(
        new THREE.Vector3(target, target, target),
        0.08,
      )
    }
  })

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(edgePoints, 3))
    return g
  }, [])

  return (
    <group ref={groupRef}>
      {nodePositions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#ff5436"
            emissive="#ff5436"
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}
      <lineSegments>
        <primitive object={geometry} attach="geometry" />
        <lineBasicMaterial color="#ff5436" transparent opacity={0.35} />
      </lineSegments>
    </group>
  )
}

function MorphScene({ phase }: MorphObjectProps) {
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <Chalk visible={phase === 0 ? 1 : 0} />
      <Key visible={phase === 1 ? 1 : 0} />
      <NeuralNode visible={phase === 2 ? 1 : 0} />
    </Float>
  )
}

export function ColdOpen() {
  const [phase, setPhase] = useState<Phase>(0)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return
    const phases: Phase[] = [0, 1, 2]
    let i = 0
    const id = window.setInterval(() => {
      i = (i + 1) % phases.length
      setPhase(phases[i])
    }, 2200)
    return () => window.clearInterval(id)
  }, [])

  const labels = ["Chalk.", "Keyboard.", "Neural net."] as const

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 5, 6]} intensity={1.1} />
        <pointLight position={[-3, -2, -4]} intensity={0.5} color="#ff5436" />
        <MorphScene phase={phase} />
        <EffectComposer>
          <Bloom intensity={0.8} luminanceThreshold={0.2} mipmapBlur />
          <Vignette eskil={false} offset={0.2} darkness={0.6} />
        </EffectComposer>
      </Canvas>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
        <p
          key={phase}
          className="font-display text-sm uppercase tracking-[0.4em] text-[var(--text-muted)] animate-[fadeIn_0.8s_ease]"
        >
          {labels[phase]}
        </p>
      </div>
    </div>
  )
}
