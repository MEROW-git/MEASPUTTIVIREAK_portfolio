'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { PointMaterial, Points } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Group, Mesh } from 'three'
import { AdditiveBlending, Color } from 'three'

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
          opacity={0.08}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh scale={[2.6, 1.6, 1]} rotation={[0, 0, 0.5]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.05}
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
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.12} />
      </mesh>
      <mesh rotation={[0.2, 1.3, 0.7]}>
        <torusGeometry args={[2.6, 0.015, 12, 220]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

type PlanetSpec = {
  color: string
  emissive: string
  accent: string
  radius: number
  ring?: boolean
  band?: boolean
  x: number
  y: number
}

const PLANETS: PlanetSpec[] = [
  {
    color: '#9bd8ff',
    emissive: '#38bdf8',
    accent: '#e0f2fe',
    radius: 1.15,
    ring: true,
    x: 2.8,
    y: 2,
  },
  {
    color: '#ffe66d',
    emissive: '#facc15',
    accent: '#fef08a',
    radius: 1,
    band: true,
    x: -2.7,
    y: 1.25,
  },
  {
    color: '#a7f38f',
    emissive: '#22c55e',
    accent: '#bef264',
    radius: 0.95,
    ring: true,
    band: true,
    x: 2.6,
    y: -0.35,
  },
  {
    color: '#d8c2ff',
    emissive: '#8b5cf6',
    accent: '#c4b5fd',
    radius: 1.2,
    band: true,
    x: -2.3,
    y: -1.6,
  },
]

function Planet({
  spec,
  progress,
  index,
}: {
  spec: PlanetSpec
  progress: number
  index: number
}) {
  const group = useRef<Group>(null)
  const sphere = useRef<Mesh>(null)
  const total = PLANETS.length
  const scaledProgress = progress * (total - 1)
  const distance = Math.abs(scaledProgress - index)
  const visibility = Math.max(0, 1 - distance * 1.2)

  useFrame((state) => {
    if (!group.current || !sphere.current) return

    const t = state.clock.elapsedTime
    group.current.position.x += (spec.x - group.current.position.x) * 0.04
    group.current.position.y += (spec.y - group.current.position.y) * 0.04
    group.current.position.z += ((distance < 0.55 ? -0.3 : -1.6 - distance) - group.current.position.z) * 0.05
    group.current.rotation.y = t * (0.1 + index * 0.02)
    group.current.rotation.z = Math.sin(t * 0.2 + index) * 0.08

    sphere.current.scale.setScalar(0.72 + visibility * 0.5)
  })

  return (
    <group ref={group}>
      <mesh position={[0, 0, -0.6]} scale={[2.6, 2.6, 1]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={spec.emissive} transparent opacity={0.025 + visibility * 0.07} />
      </mesh>

      <mesh ref={sphere}>
        <sphereGeometry args={[spec.radius, 64, 64]} />
        <meshStandardMaterial
          color={new Color(spec.color)}
          emissive={new Color(spec.emissive)}
          emissiveIntensity={0.2 + visibility * 0.45}
          roughness={0.55}
          metalness={0.08}
          transparent
          opacity={0.14 + visibility * 0.78}
        />
      </mesh>

      {spec.band ? (
        <mesh rotation={[0.4, 0.7, 0.25]}>
          <torusGeometry args={[spec.radius * 0.78, 0.06, 16, 200]} />
          <meshBasicMaterial color={spec.accent} transparent opacity={0.08 + visibility * 0.16} />
        </mesh>
      ) : null}

      {spec.ring ? (
        <mesh rotation={[1.15, 0.35, 0.45]}>
          <torusGeometry args={[spec.radius * 1.55, 0.045, 16, 220]} />
          <meshBasicMaterial color={spec.accent} transparent opacity={0.12 + visibility * 0.24} />
        </mesh>
      ) : null}
    </group>
  )
}

function PlanetCycle({ progress }: { progress: number }) {
  return (
    <group>
      {PLANETS.map((planet, index) => (
        <Planet key={`${planet.color}-${index}`} spec={planet} progress={progress} index={index} />
      ))}
    </group>
  )
}

export function SiteBackground() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const next = scrollable <= 0 ? 0 : window.scrollY / scrollable
      setScrollProgress(Math.max(0, Math.min(1, next)))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="site-bg pointer-events-none fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 6, 18]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 3]} intensity={8} color="#38bdf8" />
        <pointLight position={[-4, 1, 2]} intensity={3} color="#22d3ee" />

        <StarField count={1800} spread={[30, 20, 24]} color="#f8fbff" size={0.018} speed={0.004} />
        <StarField count={900} spread={[20, 14, 14]} color="#7dd3fc" size={0.028} speed={0.008} />
        <PlanetCycle progress={scrollProgress} />
        <CursorNebula />
        <ConstellationRings />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.06),transparent_24%),radial-gradient(circle_at_80%_15%,rgba(56,189,248,0.05),transparent_22%),linear-gradient(180deg,rgba(2,6,23,0.15),rgba(2,6,23,0.4)_45%,rgba(0,0,0,0.72))]" />
    </div>
  )
}
