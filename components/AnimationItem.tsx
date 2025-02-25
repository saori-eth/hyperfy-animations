interface AnimationItemProps {
  name: string
  isSelected: boolean
  onSelect: (name: string) => void
}

export default function AnimationItem({ name, isSelected, onSelect }: AnimationItemProps) {
  return (
    <div
      className={`p-3 rounded cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
      }`}
      onClick={() => onSelect(name)}
    >
      {name}
    </div>
  )
} 