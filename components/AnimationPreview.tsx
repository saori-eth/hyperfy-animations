'use client'
import dynamic from "next/dynamic"
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false })

interface AnimationPreviewProps {
  selectedAnimation: string | null
}

export default function AnimationPreview({ selectedAnimation }: AnimationPreviewProps) {
  return (
    <div className="w-2/3 p-4 flex items-center min-h-screen">
        <Experience />
    </div>
  )
} 