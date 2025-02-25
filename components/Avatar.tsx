import { useClips } from '@/hooks/useClips'
import { useVRMloader } from '@/hooks/useVRMLoader'
import { SpotLight, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface AvatarProps {
  selectedAnimation: string | null
}

const BASE_URL = 'https://pub-721c47b6ff3b462c912047ba95047431.r2.dev'

export const Avatar = (props: AvatarProps) => {
  const { selectedAnimation } = props
  const vrm = useVRMloader('/avatar/avatar.vrm')
  const animationUrl = selectedAnimation ? `${BASE_URL}/${selectedAnimation}.fbx` : null
  const clips = useClips(vrm, animationUrl)
  const { mixer, actions } = useAnimations(clips, vrm.scene)
  const initialPosition = useRef(new THREE.Vector3(0, 0.1, 0))

  useEffect(() => {
    // Store initial position when the component mounts
    if (vrm.scene) {
      initialPosition.current.copy(vrm.scene.position)
    }
  }, [vrm.scene])

  useEffect(() => {
    // Stop any currently playing animations
    Object.values(actions).forEach(action => action?.stop())

    // Play the new animation if available
    if (actions.animation) {
      actions.animation.setEffectiveTimeScale(0.5)
      actions.animation.play()
    }
  }, [actions])

  useFrame((_, delta) => {
    vrm.update(delta)
    mixer.update(delta)
    
    // Reset position to initial position after each frame update
    if (vrm.scene) {
      vrm.scene.position.copy(initialPosition.current)
    }
  })

  return (
    <>
      <group position={[0, 0.1, 0]}>
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