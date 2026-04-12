'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { PointMaterial, Points } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import type { Group, Mesh } from 'three'
import { AdditiveBlending } from 'three'

function CursorNebula() {
  const group = useRef<Group>(null)
  const core = useRef<Mesh>(null)

  useFrame((state) => {
    if (!group.current || !core.current) return

    const pointerX = state.pointer.x * 1.2
    const pointerY = state.pointer.y * 0.8

    group.current.position.x += (pointerX - group.current.position.x) * 0.02
    group.current.position.y += (pointerY - group.current.position.y) * 0.02
    group.current.rotation.z = state.clock.elapsedTime * 0.03

    core.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 0.35) * 0.08
    core.current.scale.y = 1 + Math.cos(state.clock.elapsedTime * 0.28) * 0.1
  })

  return (
    <group ref={group} position={[0, 0, -1]}>
      <mesh ref={core}>
        <sphereGeometry args={[1.35, 48, 48]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.1}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh scale={[2.6, 1.6, 1]} rotation={[0, 0, 0.5]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.06}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

function StarField({
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
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      array[index * 3] = (Math.random() - 0.5) * spread[0]
      array[index * 3 + 1] = (Math.random() - 0.5) * spread[1]
      array[index * 3 + 2] = (Math.random() - 0.5) * spread[2]
    }

    return array
  }, [count, spread])

  useFrame((state) => {
    if (!group.current) return

    group.current.rotation.y = state.clock.elapsedTime * speed
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.6) * 0.04
  })

  return (
    <group ref={group}>
      <Points positions={positions} stride={3} frustumCulled={false}>
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

function ConstellationRings() {
  const group = useRef<Group>(null)

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.z = state.clock.elapsedTime * 0.02
    group.current.rotation.y = state.clock.elapsedTime * 0.04
  })

  return (
    <group ref={group} position={[2.2, -0.6, -2.2]}>
      <mesh rotation={[1.1, 0.2, 0.1]}>
        <torusGeometry args={[1.8, 0.02, 12, 220]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[0.2, 1.3, 0.7]}>
        <torusGeometry args={[2.6, 0.015, 12, 220]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.14} />
      </mesh>
    </group>
  )
}

export function SiteBackground() {
  return (
    <div className="site-bg pointer-events-none fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 6, 18]} />
        <ambientLight intensity={0.15} />
        <pointLight position={[0, 0, 3]} intensity={8} color="#38bdf8" />
        <pointLight position={[-4, 1, 2]} intensity={3} color="#22d3ee" />

        <StarField count={1800} spread={[30, 20, 24]} color="#f8fbff" size={0.018} speed={0.004} />
        <StarField count={900} spread={[20, 14, 14]} color="#7dd3fc" size={0.028} speed={0.008} />
        <CursorNebula />
        <ConstellationRings />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.06),transparent_24%),radial-gradient(circle_at_80%_15%,rgba(56,189,248,0.05),transparent_22%),linear-gradient(180deg,rgba(2,6,23,0.15),rgba(2,6,23,0.4)_45%,rgba(0,0,0,0.72))]" />
    </div>
  )
}
