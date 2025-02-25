import { MeshReflectorMaterial } from '@react-three/drei'
import { Avatar } from './Avatar'
import { Skybox } from './Skybox'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap/gsap-core'

const defaultCamPos = {
  x: 0.5,
  y: 1.25,
}

interface WorldProps {
  mobile: boolean
  setLoaded: (loaded: boolean) => void
}

export const World = (props: WorldProps) => {
  useFrame((state) => {
    if (props.mobile) return
    gsap.to(state.camera.position, {
      x: defaultCamPos.x + state.pointer.x / 200,
      y: defaultCamPos.y + state.pointer.y / 200,
      duration: 0.5,
    })
  })
  return (
    <>
      <ambientLight intensity={0.5} />
      <Skybox />
      <Avatar setLoaded={props.setLoaded} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, -0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          metalness={0.5}
          roughness={0.5}
          mirror={0.5}
          color={'#a0a0a0'}
        />
      </mesh>
    </>
  )
}
