'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PointMaterial, Points } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import type { Group } from 'three'

function NebulaCore() {
  const group = useRef<Group>(null)

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.04
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12) * 0.08
  })

  return (
    <group ref={group}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh>
          <sphereGeometry args={[1.15, 64, 64]} />
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#0ea5e9"
            emissiveIntensity={1.8}
            transparent
            opacity={0.9}
            roughness={0.35}
          />
        </mesh>
      </Float>

      <mesh rotation={[1.05, 0.4, 0.35]}>
        <torusGeometry args={[1.85, 0.06, 16, 180]} />
        <meshStandardMaterial
          color="#bae6fd"
          emissive="#38bdf8"
          emissiveIntensity={1.1}
          transparent
          opacity={0.45}
        />
      </mesh>

      <mesh rotation={[0.3, 1.15, 1.5]}>
        <torusGeometry args={[2.35, 0.03, 12, 220]} />
        <meshStandardMaterial
          color="#7dd3fc"
          emissive="#22d3ee"
          emissiveIntensity={0.9}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

function StarLayer({
  count,
  spread,
  color,
  size,
  speed,
}: {
  count: number
  spread: [number, number, number]
  color: string
  size: number
  speed: number
}) {
  const group = useRef<Group>(null)
  const points = useMemo(() => {
    const output = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      output[index * 3] = (Math.random() - 0.5) * spread[0]
      output[index * 3 + 1] = (Math.random() - 0.5) * spread[1]
      output[index * 3 + 2] = (Math.random() - 0.5) * spread[2]
    }

    return output
  }, [count, spread])

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * speed
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.6) * 0.05
  })

  return (
    <group ref={group}>
      <Points positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

export function HeroScene() {
  return (
    <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_45%,rgba(8,145,178,0.22),transparent_24%),radial-gradient(circle_at_20%_25%,rgba(56,189,248,0.18),transparent_32%),linear-gradient(135deg,_rgba(1,4,15,0.98),_rgba(2,8,23,0.98)_45%,_rgba(3,7,18,1))] shadow-[0_30px_120px_rgba(2,132,199,0.22)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,211,252,0.08),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.12),transparent_28%)]" />
      <Canvas camera={{ position: [0, 0, 5.5], fov: 42 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 12]} />
        <ambientLight intensity={0.45} />
        <pointLight position={[0, 0, 2]} intensity={24} color="#38bdf8" />
        <pointLight position={[-3, 2, 1]} intensity={8} color="#22d3ee" />

        <StarLayer count={900} spread={[18, 12, 16]} color="#e2f3ff" size={0.028} speed={0.012} />
        <StarLayer count={550} spread={[12, 8, 10]} color="#7dd3fc" size={0.04} speed={0.024} />
        <NebulaCore />
      </Canvas>
    </div>
  )
}
