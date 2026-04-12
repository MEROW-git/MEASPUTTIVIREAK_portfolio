'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Center,
  Clone,
  Float,
  OrbitControls,
  Text,
  useFBX,
  useGLTF,
} from '@react-three/drei'
import type { Group } from 'three'

import type { ToolItem } from '@/types'

type ToolStackProps = {
  tools: ToolItem[]
}

function GlbModel({
  modelPath,
  scale,
  position = [0, 0, 0],
}: {
  modelPath: string
  scale: number
  position?: [number, number, number]
}) {
  const { scene } = useGLTF(modelPath)
  const group = useRef<Group>(null)

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.8
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.45) * 0.08
  })

  return (
    <group ref={group} position={position}>
      <Center>
        <Clone object={scene} scale={scale} />
      </Center>
    </group>
  )
}

function FbxModel({
  modelPath,
  scale,
  position = [0, 0, 0],
}: {
  modelPath: string
  scale: number
  position?: [number, number, number]
}) {
  const object = useFBX(modelPath)
  const clone = useMemo(() => object.clone(), [object])
  const group = useRef<Group>(null)

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.9
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.06
  })

  return (
    <group ref={group} position={position}>
      <Center>
        <primitive object={clone} scale={scale} />
      </Center>
    </group>
  )
}

function ToolModel({ tool, isMobile = false }: { tool: ToolItem; isMobile?: boolean }) {
  if (!tool.modelPath) return null

  const configMap: Record<
    string,
    { scale: number; position?: [number, number, number] }
  > = {
    React: { scale: 0.0044, position: [0, -0.02, 0] },
    Python: { scale: 12, position: [0, 0.02, 0] },
    JavaScript: { scale: 14, position: [0, 0.04, 0] },
    TypeScript: { scale: 14, position: [0, 0.04, 0] },
    'Node.js': { scale: 11, position: [0, 0.02, 0] },
    Docker: { scale: 13.5, position: [0, 0.02, 0] },
  }

  const config = configMap[tool.name] ?? { scale: 10, position: [0, 0, 0] as [number, number, number] }
  const mobileScale = isMobile ? 0.72 : 1

  if (tool.modelPath.endsWith('.fbx')) {
    return (
      <FbxModel
        modelPath={tool.modelPath}
        scale={config.scale * mobileScale}
        position={config.position}
      />
    )
  }

  return (
    <GlbModel
      modelPath={tool.modelPath}
      scale={config.scale * mobileScale}
      position={config.position}
    />
  )
}

function FloatingLogo({
  tool,
  position,
  isMobile = false,
}: {
  tool: ToolItem
  position: [number, number, number]
  isMobile?: boolean
}) {
  return (
    <Float speed={1} rotationIntensity={0.22} floatIntensity={0.65}>
      <group position={position}>
        <mesh position={[0, 0, -0.35]} scale={isMobile ? [1.05, 0.72, 1] : [1.45, 0.95, 1]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={tool.glow} transparent opacity={0.05} />
        </mesh>

        <mesh position={[0, 0, -0.18]} scale={isMobile ? [0.72, 0.48, 1] : [0.95, 0.62, 1]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={tool.color} transparent opacity={0.07} />
        </mesh>

        <Suspense
          fallback={
            <Text
              fontSize={0.34}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {tool.short}
            </Text>
          }
        >
          <ToolModel tool={tool} isMobile={isMobile} />
        </Suspense>

        {!isMobile ? (
          <Text
            position={[0, -1.35, 0]}
            fontSize={0.18}
            color="#e2e8f0"
            anchorX="center"
            anchorY="middle"
            maxWidth={2.4}
          >
            {tool.name}
          </Text>
        ) : null}
      </group>
    </Float>
  )
}

function LogoCloud({ tools, isMobile = false }: { tools: ToolItem[]; isMobile?: boolean }) {
  const group = useRef<Group>(null)
  const layout = useMemo(() => {
    return tools.map((tool, index) => {
      const column = index % (isMobile ? 2 : 3)
      const row = Math.floor(index / (isMobile ? 2 : 3))

      return {
        tool,
        position: [
          isMobile
            ? (column - 0.5) * 4.2
            : (column - 1) * 4.2 + (row % 2 === 0 ? 0.18 : -0.18),
          isMobile ? 2.7 - row * 2.45 : 1.65 - row * 2.8,
          isMobile ? (row % 2 === 0 ? 0.15 : -0.15) : ((index % 2) - 0.5) * 1,
        ] as [number, number, number],
      }
    })
  }, [tools, isMobile])

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y += (0.18 - group.current.rotation.y) * 0.012
    group.current.rotation.x += (-0.03 - group.current.rotation.x) * 0.012
  })

  return (
    <group ref={group}>
      {layout.map((item) => (
        <FloatingLogo
          key={item.tool.name}
          tool={item.tool}
          position={item.position}
          isMobile={isMobile}
        />
      ))}
    </group>
  )
}

export function ToolStack({ tools }: ToolStackProps) {
  const modelTools = tools.filter((tool) => tool.modelPath)
  const textTools = tools.filter((tool) => !tool.modelPath)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const sync = () => setIsMobile(mediaQuery.matches)

    sync()
    mediaQuery.addEventListener('change', sync)

    return () => mediaQuery.removeEventListener('change', sync)
  }, [])

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.5),rgba(2,6,23,0.9))]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(34,211,238,0.08),transparent_18%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.08),transparent_20%)]" />
        <div className={`${isMobile ? 'h-[340px]' : 'h-[520px]'} w-full cursor-grab active:cursor-grabbing`}>
          <Canvas camera={{ position: isMobile ? [0, 0.15, 16.5] : [0, 0.2, 13.5], fov: isMobile ? 24 : 30 }}>
            <ambientLight intensity={1.1} />
            <directionalLight position={[4, 6, 6]} intensity={2.2} color="#ffffff" />
            <pointLight position={[-5, 2, 4]} intensity={16} color="#38bdf8" />
            <pointLight position={[5, -2, 4]} intensity={10} color="#22d3ee" />
            <spotLight position={[0, 6, 6]} intensity={28} angle={0.35} penumbra={0.8} color="#e0f2fe" />
            <LogoCloud tools={modelTools} isMobile={isMobile} />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              rotateSpeed={isMobile ? 0.9 : 0.7}
              minPolarAngle={Math.PI / 2.35}
              maxPolarAngle={Math.PI / 1.82}
            />
          </Canvas>
        </div>
        <p className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-[11px] text-slate-300">
          Drag to rotate
        </p>
      </div>

      {isMobile ? (
        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
            >
              {tool.name}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {textTools.map((tool) => (
            <span
              key={tool.name}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
            >
              {tool.name}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

useGLTF.preload('/models/node-js-logo.glb')
useGLTF.preload('/models/python-logo.glb')
useGLTF.preload('/models/js-logo.glb')
useGLTF.preload('/models/ts-logo.glb')
useGLTF.preload('/models/docker-logo.glb')
