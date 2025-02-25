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
    <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Animations</h1>
        <div className="space-y-2">
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