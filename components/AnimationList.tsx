import AnimationItem from './AnimationItem'
import { useState } from 'react'

interface AnimationListProps {
  animations: string[]
  selectedAnimation: string | null
  onSelectAnimation: (animation: string) => void
}

export default function AnimationList({
  animations,
  selectedAnimation,
  onSelectAnimation,
}: AnimationListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAnimations = animations.filter(animation =>
    animation.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-1/3 border-r border-gray-600/20 overflow-y-auto bg-black/80 backdrop-blur-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-white/90">Hyperfy Animations</h1>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search animations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600/20 rounded-lg text-white/90 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="space-y-3">
          {filteredAnimations.map((animation) => (
            <AnimationItem
              key={animation}
              name={animation}
              isSelected={selectedAnimation === animation}
              onSelect={onSelectAnimation}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 