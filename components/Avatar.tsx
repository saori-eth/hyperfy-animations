import { useVRMloader } from '@/hooks/useVRMLoader'
import { SpotLight } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'


export const Avatar = () => {
  const vrm = useVRMloader('/avatar/avatar.vrm')


  useFrame((_, delta) => {
    vrm.update(delta)
  })

  return (
    <>
      <group position={[0, 0, 0]}>
        <primitive object={vrm.scene} />
      </group>

      <group position={[1, 2.25, 0]}>
        <SpotLight
          distance={5}
          angle={0.15}
          attenuation={2.75}
          anglePower={5}
        />
      </group>
    </>
  )
}
