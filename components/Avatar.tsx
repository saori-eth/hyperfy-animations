'use client'
import { useClips } from '@/hooks/useClips'
import { useVRMloader } from '@/hooks/useVRMLoader'
import { SpotLight, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'


interface AvatarProps {
  selectedAnimation: string | null
}

const CROSSFADE_DURATION = 0.3

export const Avatar = (props: AvatarProps) => {
  const { selectedAnimation } = props
  const [baseUrl, setBaseUrl] = useState('')

  useEffect(() => {
    // Check hostname only after component mounts (client-side)
    const isLocal = window.location.hostname === 'localhost'
    setBaseUrl(isLocal 
      ? 'https://pub-721c47b6ff3b462c912047ba95047431.r2.dev'
      : 'https://382e3677732d815d678860b4a09b4d59.r2.cloudflarestorage.com/hyperfy-fbx'
    )
  }, [])

  const vrm = useVRMloader('/avatar/avatar.vrm')
  const animationUrl = selectedAnimation && baseUrl ? `${baseUrl}/${selectedAnimation}.fbx` : null
  const clips = useClips(vrm, animationUrl)
  const { mixer, actions } = useAnimations(clips, vrm.scene)
  const initialPosition = useRef(new THREE.Vector3(0, 0.1, 0))
  const currentActionRef = useRef<THREE.AnimationAction | null>(null)
  const transitionTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Store initial position when the component mounts
    if (vrm.scene) {
      initialPosition.current.copy(vrm.scene.position)
    }
  }, [vrm.scene])

  useEffect(() => {
    // Cleanup function to clear any pending timeouts
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // Clear any existing transition timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
    }

    if (!selectedAnimation || !actions[selectedAnimation]) {
      // If no animation is selected, stop current animation
      if (currentActionRef.current) {
        currentActionRef.current.fadeOut(CROSSFADE_DURATION)
        transitionTimeoutRef.current = setTimeout(() => {
          if (currentActionRef.current) {
            currentActionRef.current.stop()
            currentActionRef.current = null
          }
        }, CROSSFADE_DURATION * 1000)
      }
      return
    }

    // Reset all animations first
    Object.values(actions).forEach(action => {
      if (action) {
        action.reset().stop()
      }
    })

    const newAction = actions[selectedAnimation]
    const currentAction = currentActionRef.current

    // Configure the new action
    newAction.reset()
    newAction.setEffectiveTimeScale(0.5)
    newAction.clampWhenFinished = true
    newAction.setLoop(THREE.LoopRepeat, Infinity)

    // Handle the transition
    if (currentAction) {
      // Ensure the current action is properly configured
      currentAction.setLoop(THREE.LoopRepeat, Infinity)
      currentAction.clampWhenFinished = true
      
      // Perform the crossfade
      newAction.crossFadeFrom(currentAction, CROSSFADE_DURATION, true)
    } else {
      // If there's no current action, just fade in the new one
      newAction.fadeIn(CROSSFADE_DURATION)
    }

    newAction.play()
    currentActionRef.current = newAction
  }, [actions, selectedAnimation])

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