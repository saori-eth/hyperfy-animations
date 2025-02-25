import AnimationItem from './AnimationItem'

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
  return (
    <div className="w-1/3 border-r border-gray-600/20 overflow-y-auto bg-black/80 backdrop-blur-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-white/90">Hyperfy Animations</h1>
        <div className="space-y-3">
          {animations.map((animation) => (
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