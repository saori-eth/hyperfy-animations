import { loadAnim } from '../utils'
import type { VRM } from '@pixiv/three-vrm'
import { useState, useEffect } from 'react'
import type { AnimationClip } from 'three'

export const useClips = (avatar: VRM, animationUrl: string | null): AnimationClip[] => {
  const [clips, setClips] = useState<AnimationClip[]>([])

  useEffect(() => {
    if (!animationUrl) return
    
    loadAnim(animationUrl, avatar).then((clip) => {
      if (!clip) return
      clip.name = 'animation'
      setClips([clip]) // Replace existing clips with the new one
    })
  }, [avatar, animationUrl])

  return clips
}