'use client'

import { useEffect, useState } from 'react'
import AnimationList from '@/components/AnimationList'
import AnimationPreview from '@/components/AnimationPreview'

export default function Home() {
  const [animations, setAnimations] = useState<string[]>([])
  const [selectedAnimation, setSelectedAnimation] = useState<string | null>(null)

  useEffect(() => {
    // Load animations from JSON file
    fetch('/mixamo_animations.json')
      .then(res => res.json())
      .then(data => {
        setAnimations(data)
        if (data.length > 0) {
          setSelectedAnimation(data[0])
        }
      })
  }, [])

  return (
    <div className="flex h-screen">
      <AnimationList
        animations={animations}
        selectedAnimation={selectedAnimation}
        onSelectAnimation={setSelectedAnimation}
      />
      <AnimationPreview selectedAnimation={selectedAnimation} />
    </div>
  )
}
