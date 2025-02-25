import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

export const LoadingScreen = () => {
  const { progress } = useProgress()
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  const messages = [
    'This is loading...',
    'Very efficiently...',
    'I promise...',
    'Super well written...',
    'Trust me...',
    'Ok thanks...',
  ]

  useEffect(() => {
    const current = Math.floor(progress / 20)
    setCurrentMessageIndex(current)
  }, [progress])

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-start items-start bg-black text-white text-2xl z-20">
      <div className="pl-8 pt-8 text-lime-500 font-mono">
        <div className="w-full bg-gray-500" style={{ width: 300 }}>
          <div className="bg-lime-500 h-4" style={{ width: `${progress}%` }} />
        </div>
        <>
          {messages.slice(0, currentMessageIndex + 1).map((message, index) => (
            <div key={index} className="py-1">
              {message}
            </div>
          ))}
        </>
      </div>
    </div>
  )
}
