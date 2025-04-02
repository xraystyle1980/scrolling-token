'use client'

import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false })

export default function Scene3DWrapper() {
  return (
    <Scene3D scroll={0} />
  )
}