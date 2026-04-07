"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// ---------- Playerformations: athlete ring ----------
export function PlayerformationsScene() {
  const ringRef = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (ringRef.current) ringRef.current.rotation.y += dt * 0.3
  })
  const markers = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2
        return [Math.cos(a) * 1.5, Math.sin(i * 0.8) * 0.3, Math.sin(a) * 1.5] as [
          number,
          number,
          number,
        ]
      }),
    [],
  )
  return (
    <group>
      {/* athlete silhouette — simple capsule */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.35, 0.9, 8, 16]} />
        <meshStandardMaterial color="#f4f1ea" roughness={0.6} />
      </mesh>
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.015, 8, 64]} />
          <meshStandardMaterial
            color="#ff5436"
            emissive="#ff5436"
            emissiveIntensity={0.8}
          />
        </mesh>
        {markers.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial
              color="#ff5436"
              emissive="#ff5436"
              emissiveIntensity={1}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// ---------- Logi-Flow Japan: globe with routes ----------
export function LogiFlowScene() {
  const globeRef = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (globeRef.current) globeRef.current.rotation.y += dt * 0.15
  })

  const arcs = useMemo(() => {
    const arcsData: THREE.BufferGeometry[] = []
    const start = [
      [0.8, 0.6, 0.4],
      [0.2, 0.3, 0.9],
      [-0.7, 0.4, 0.5],
      [0.5, -0.3, 0.8],
    ]
    const end = [
      [-0.5, 0.8, -0.3],
      [0.9, -0.2, -0.3],
      [0.6, 0.7, -0.5],
      [-0.8, 0.5, 0.3],
    ]
    for (let i = 0; i < start.length; i++) {
      const s = new THREE.Vector3(...start[i]).normalize().multiplyScalar(1.3)
      const e = new THREE.Vector3(...end[i]).normalize().multiplyScalar(1.3)
      const mid = s.clone().add(e).multiplyScalar(0.5).normalize().multiplyScalar(1.9)
      const curve = new THREE.QuadraticBezierCurve3(s, mid, e)
      const pts = curve.getPoints(40)
      const g = new THREE.BufferGeometry().setFromPoints(pts)
      arcsData.push(g)
    }
    return arcsData
  }, [])

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry args={[1.3, 48, 48]} />
        <meshStandardMaterial
          color="#0b0b0d"
          roughness={0.8}
          wireframe
          wireframeLinewidth={1}
          emissive="#1a1a22"
        />
      </mesh>
      {arcs.map((g, i) => (
        <line key={i}>
          <primitive object={g} attach="geometry" />
          <lineBasicMaterial color="#ff5436" />
        </line>
      ))}
    </group>
  )
}

// ---------- DeepLens: camera frustum + point cloud ----------
export function DeepLensScene() {
  const cloudRef = useRef<THREE.Points>(null)
  useFrame((_, dt) => {
    if (cloudRef.current) cloudRef.current.rotation.y += dt * 0.2
  })

  const positions = useMemo(() => {
    const n = 400
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const r = 0.5 + Math.random() * 1.3
      const t = Math.random() * Math.PI * 2
      const p = Math.acos(2 * Math.random() - 1)
      arr[i * 3 + 0] = r * Math.sin(p) * Math.cos(t)
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t)
      arr[i * 3 + 2] = r * Math.cos(p)
    }
    return arr
  }, [])

  return (
    <group>
      <points ref={cloudRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#ff5436" />
      </points>
      {/* camera frustum wireframe */}
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[1.2, 1.8, 4, 1, true]} />
        <meshBasicMaterial color="#f4f1ea" wireframe />
      </mesh>
    </group>
  )
}

// ---------- ChronoVault: time-series ribbon ----------
export function ChronoVaultScene() {
  const ribbonRef = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (ribbonRef.current) ribbonRef.current.rotation.y += dt * 0.25
  })

  const bars = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      const x = (i - 20) * 0.12
      const h = 0.3 + Math.sin(i * 0.4) * 0.4 + Math.cos(i * 0.2) * 0.3
      return { x, h, y: h / 2 }
    })
  }, [])

  return (
    <group ref={ribbonRef}>
      {bars.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, 0]}>
          <boxGeometry args={[0.08, Math.abs(b.h) + 0.05, 0.08]} />
          <meshStandardMaterial
            color="#ff5436"
            emissive="#ff5436"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

// ---------- Sentinel Fraud: scatter cube with flagged anomalies ----------
export function SentinelFraudScene() {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.2
      groupRef.current.rotation.x += dt * 0.05
    }
  })

  const { normal, flagged } = useMemo(() => {
    const normalArr: [number, number, number][] = []
    const flaggedArr: [number, number, number][] = []
    for (let i = 0; i < 180; i++) {
      const p: [number, number, number] = [
        (Math.random() - 0.5) * 2.4,
        (Math.random() - 0.5) * 2.4,
        (Math.random() - 0.5) * 2.4,
      ]
      if (Math.random() < 0.08) flaggedArr.push(p)
      else normalArr.push(p)
    }
    return { normal: normalArr, flagged: flaggedArr }
  }, [])

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[2.6, 2.6, 2.6]} />
        <meshBasicMaterial color="#1a1a22" wireframe />
      </mesh>
      {normal.map((p, i) => (
        <mesh key={`n-${i}`} position={p}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#6b6b75" />
        </mesh>
      ))}
      {flagged.map((p, i) => (
        <mesh key={`f-${i}`} position={p}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial
            color="#ff5436"
            emissive="#ff5436"
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  )
}
