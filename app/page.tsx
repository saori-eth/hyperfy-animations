'use client'
import dynamic from 'next/dynamic'
const Experience = dynamic(() => import('../components/Experience'), {
  ssr: false,
})
import { Header } from '@/components/Header'
import { useState } from 'react'
import { LoadingScreen } from '@/components/LoadingScreen'

export default function Home() {
  const [loaded, setLoaded] = useState<boolean>(false)
  return (
    <>
      {!loaded && <LoadingScreen />}
      {loaded && <Header />}
      <Experience setLoaded={setLoaded} />
    </>
  )
}
