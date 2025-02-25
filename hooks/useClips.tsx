import { loadAnim } from '../utils'
import type { VRM } from '@pixiv/three-vrm'
import { useState, useEffect } from 'react'
import type { AnimationClip } from 'three'

export interface AnimationEntry {
  name: string
  url: string
}

export const useClips = (avatar: VRM, animations: AnimationEntry[]): AnimationClip[] => {
  const [clips, setClips] = useState<AnimationClip[]>([])

  useEffect(() => {
    animations.forEach(({ name, url }) => {
      loadAnim(url, avatar).then((clip) => {
        if (!clip) return
        clip.name = name
        setClips((clips) => [...clips, clip])
      })
    })
  }, [avatar, animations])

  return clips
}