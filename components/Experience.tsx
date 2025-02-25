'use client'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Avatar } from './Avatar'
import { Camera } from './Camera'
import { Skybox } from './Skybox'

interface ExperienceProps {
  selectedAnimation: string | null
}

const Experience = ({ selectedAnimation }: ExperienceProps) => {

  return (
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight intensity={0.75} />
        <Camera />
        <Avatar selectedAnimation={selectedAnimation} />
        <Skybox />

      </Suspense>
    </Canvas>
  )
}

export default Experience
