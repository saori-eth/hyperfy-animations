interface AnimationItemProps {
  name: string
  isSelected: boolean
  onSelect: (name: string) => void
}

export default function AnimationItem({ name, isSelected, onSelect }: AnimationItemProps) {
  return (
    <div
      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'bg-white/10 text-white border border-white/20 shadow-lg shadow-white/5' 
          : 'text-white/70 hover:bg-white/5 hover:text-white/90'
      }`}
      onClick={() => onSelect(name)}
    >
      {name}
    </div>
  )
} 