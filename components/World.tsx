import { MeshReflectorMaterial } from '@react-three/drei'
import { Avatar } from './Avatar'
import { Skybox } from './Skybox'

const defaultCamPos = {
  x: 0.5,
  y: 1.25,
}

interface WorldProps {
  mobile: boolean
  setLoaded: (loaded: boolean) => void
}

export const World = (props: WorldProps) => {

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
