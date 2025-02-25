'use client'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Avatar } from './Avatar'
import { Camera } from './Camera'
import { Skybox } from './Skybox'
import { MeshReflectorMaterial } from '@react-three/drei'

interface ExperienceProps {
  selectedAnimation: string | null
}

const Experience = ({ selectedAnimation }: ExperienceProps) => {

  return (
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <Camera />
        <Avatar selectedAnimation={selectedAnimation} />
        <Skybox />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          metalness={0.5}
          roughness={0.5}
          mirror={0.5}
          color={'#a0a0a0'}
        />
      </mesh>
      </Suspense>
    </Canvas>
  )
}

export default Experience
