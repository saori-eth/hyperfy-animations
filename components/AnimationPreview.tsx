'use client'
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false })

interface AnimationPreviewProps {
  selectedAnimation: string | null
}

export default function AnimationPreview({ selectedAnimation }: AnimationPreviewProps) {
  const [baseUrl, setBaseUrl] = useState('')

  useEffect(() => {
    const isLocal = window.location.hostname === 'localhost'
    setBaseUrl(isLocal 
      ? 'https://pub-ac11f60c4b384fa1b5f4cb1e2bba77ba.r2.dev'
      : 'https://hyperfy-content.com/'
    )
  }, [])

  const handleDownload = () => {
    if (!selectedAnimation || !baseUrl) return
    const url = `${baseUrl}/${selectedAnimation}.glb`
    const link = document.createElement('a')
    link.href = url
    link.download = `${selectedAnimation}.glb`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="w-2/3 flex items-center min-h-screen relative bg-black/90">
      <Experience selectedAnimation={selectedAnimation} />
      {selectedAnimation && (
        <button
          onClick={handleDownload}
          className="absolute top-8 right-8 bg-black/80 hover:bg-black/90 text-white/90 hover:text-white px-6 py-3 rounded-xl shadow-xl backdrop-blur-lg transition-all duration-200 flex items-center space-x-3 border border-white/10 hover:border-white/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span>Download GLB</span>
        </button>
      )}
    </div>
  )
} 