import { loadAnim } from '../utils'
import type { VRM } from '@pixiv/three-vrm'
import { useState, useEffect } from 'react'
import type { AnimationClip } from 'three'

const animationMap = {
  idle: '/avatar/idle.fbx',
}

export const useClips = (avatar: VRM): AnimationClip[] => {
  const [clips, setClips] = useState<AnimationClip[]>([])

  useEffect(() => {
    for (const [name, url] of Object.entries(animationMap)) {
      loadAnim(url, avatar).then((clip) => {
        if (!clip) return
        clip.name = name
        setClips((clips) => [...clips, clip])
      })
    }
  }, [avatar])

  return clips
}
