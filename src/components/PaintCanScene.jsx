import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import PaintCan from './PaintCan'

export default function PaintCanScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 6], fov: 38 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.0} />
      <directionalLight position={[-4, 3, -3]} intensity={0.25} />

      <Suspense fallback={null}>
        <PaintCan />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  )
}
