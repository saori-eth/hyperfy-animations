import { loadAnim, resetVRM } from '../utils'
import type { VRM } from '@pixiv/three-vrm'
import { useState, useEffect } from 'react'
import type { AnimationClip } from 'three'

export const useClips = (avatar: VRM, animationUrl: string | null): AnimationClip[] => {
  const [clips, setClips] = useState<AnimationClip[]>([])

  useEffect(() => {
    if (!animationUrl) return
    
    // Reset the avatar to its initial pose before loading new animation
    resetVRM(avatar)
    
    loadAnim(animationUrl, avatar).then((clip) => {
      if (!clip) return
      
      // Extract filename from URL (text between last slash and .fbx)
      const filename = animationUrl.split('/').pop()?.split('.fbx')[0] || 'animation'
      clip.name = filename
      setClips([clip]) // Replace existing clips with the new one
    })
  }, [avatar, animationUrl])

  return clips
}