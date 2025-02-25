import { useClips } from '@/hooks/useClips'
import { useVRMloader } from '@/hooks/useVRMLoader'
import { SpotLight, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'
import { degToRad } from 'three/src/math/MathUtils.js'

interface AvatarProps {
  setLoaded: (loaded: boolean) => void
}

export const Avatar = (props: AvatarProps) => {
  const { setLoaded } = props
  const vrm = useVRMloader('/avatar/avatar.vrm')
  const clips = useClips(vrm)
  const { mixer, actions } = useAnimations(clips, vrm.scene)

  useEffect(() => {
    if (!actions.idle) return console.error('No idle animation found')
    actions.idle.setEffectiveTimeScale(0.5)
    actions.idle.play()
    setLoaded(true)
  }, [actions, setLoaded])

  useFrame((_, delta) => {
    vrm.update(delta)
    mixer.update(delta)
  })

  return (
    <>
      <group position={[0.1, 0.5, 0]} rotation={[0, degToRad(45), 0]}>
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
