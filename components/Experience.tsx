'use client'
import { Canvas } from '@react-three/fiber'
import {
  // OrbitControls,
  PerspectiveCamera,
  ScrollControls,
} from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { World } from './World'
import { GUI } from './GUI'

interface ExperienceProps {
  setLoaded: (loaded: boolean) => void
}

const Experience = (props: ExperienceProps) => {
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    window.addEventListener('resize', () => {
      setMobile(window.innerWidth < 768)
    })
  }, [])
  return (
    <Canvas>
      <Suspense fallback={null}>
        <ScrollControls pages={2} damping={0.1}>
          <GUI />
        </ScrollControls>
        <PerspectiveCamera
          makeDefault
          position={[0.5, 1.25, 2]}
          fov={mobile ? 60 : 50}
        />
        <World mobile={mobile} setLoaded={props.setLoaded} />
      </Suspense>
    </Canvas>
  )
}

export default Experience
