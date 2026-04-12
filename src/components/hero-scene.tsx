'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import {
  Center,
  Clone,
  Float,
  OrbitControls,
  PointMaterial,
  Points,
  useGLTF,
} from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import type { Group } from 'three'

function TrooperModel() {
  const { scene } = useGLTF('/models/automaton_troopers.glb')
  const group = useRef<Group>(null)
  const model = useRef<Group>(null)
  const baseX = 0
  const baseY = 4

  useFrame((state) => {
    if (!group.current || !model.current) return

    const t = state.clock.elapsedTime

    group.current.position.y = baseY + Math.sin(t * 0.7) * 0.06
    group.current.position.x = baseX + Math.sin(t * 0.35) * 0.04

    model.current.rotation.y = t * 0.28
    model.current.rotation.z = Math.sin(t * 0.8) * 0.03
    model.current.rotation.x = Math.cos(t * 0.55) * 0.02
  })

  return (
    <group ref={group} position={[baseX, baseY, 0]}>
      <group ref={model}>
        <Center>
          <Clone object={scene} scale={2.9} />
        </Center>
      </group>
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
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.6) * 0.03
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
    <div className="relative h-[420px] cursor-grab overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_45%,rgba(8,145,178,0.22),transparent_24%),radial-gradient(circle_at_20%_25%,rgba(56,189,248,0.18),transparent_32%),linear-gradient(135deg,_rgba(1,4,15,0.98),_rgba(2,8,23,0.98)_45%,_rgba(3,7,18,1))] shadow-[0_30px_120px_rgba(2,132,199,0.22)] active:cursor-grabbing">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,211,252,0.08),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.12),transparent_28%)]" />
      <Canvas camera={{ position: [0, 0.08, 7.8], fov: 35 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 7, 14]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 1.4, 3]} intensity={18} color="#67e8f9" />
        <pointLight position={[-2.4, 1.8, 2]} intensity={6} color="#38bdf8" />

        <StarLayer count={700} spread={[18, 12, 16]} color="#e2f3ff" size={0.026} speed={0.008} />
        <StarLayer count={380} spread={[12, 8, 10]} color="#7dd3fc" size={0.038} speed={0.014} />

        <Float speed={0.8} rotationIntensity={0.04} floatIntensity={0.08}>
          <Suspense fallback={null}>
            <TrooperModel />
          </Suspense>
        </Float>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.75}
          minPolarAngle={Math.PI / 2.35}
          maxPolarAngle={Math.PI / 1.75}
          target={[0, 0.35, 0]}
        />
      </Canvas>
      <p className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-[11px] text-slate-300">
        Drag to rotate
      </p>
    </div>
  )
}

useGLTF.preload('/models/automaton_troopers.glb')
