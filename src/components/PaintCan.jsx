import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Decal, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const bodyMat = {
  color: '#E8E4DE',
  roughness: 0.22,
  metalness: 0.15,
  clearcoat: 0.6,
  clearcoatRoughness: 0.2,
  reflectivity: 0.5,
  envMapIntensity: 1.2,
}

const chrome = {
  color: '#D8D8D8',
  roughness: 0.08,
  metalness: 0.95,
  clearcoat: 1.0,
  clearcoatRoughness: 0.05,
  reflectivity: 1.0,
  envMapIntensity: 1.8,
}

const HERO_LEAN_Z = THREE.MathUtils.degToRad(-15)
const ABOUT_LEAN_Z = THREE.MathUtils.degToRad(12)
const CONSTANT_TILT_X = THREE.MathUtils.degToRad(-5)

export default function PaintCan({ scrollProgressRef }) {
  const group = useRef()
  const baseRotation = useRef(THREE.MathUtils.degToRad(60))

  const logoTexture = useTexture('/dycon-logo.png')
  logoTexture.colorSpace = THREE.SRGBColorSpace

  const handleGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.3, 1.45, 0),
      new THREE.Vector3(-1.25, 1.2, -0.5),
      new THREE.Vector3(-1.0, 0.8, -1.2),
      new THREE.Vector3(0, 0.5, -1.5),
      new THREE.Vector3(1.0, 0.8, -1.2),
      new THREE.Vector3(1.25, 1.2, -0.5),
      new THREE.Vector3(1.3, 1.45, 0),
    ])
    return new THREE.TubeGeometry(curve, 48, 0.03, 8, false)
  }, [])

  useFrame(({ clock }) => {
    if (!group.current) return

    const progress = scrollProgressRef?.current ?? 0

    baseRotation.current += 0.005
    const scrollYOffset = progress * THREE.MathUtils.degToRad(90)

    group.current.rotation.y = baseRotation.current + scrollYOffset
    group.current.rotation.z = THREE.MathUtils.lerp(HERO_LEAN_Z, ABOUT_LEAN_Z, progress)
    group.current.rotation.x = CONSTANT_TILT_X
  })

  return (
    <group ref={group} rotation={[CONSTANT_TILT_X, THREE.MathUtils.degToRad(60), HERO_LEAN_Z]}>
      {/* Main body */}
      <mesh>
        <cylinderGeometry args={[1.2, 1.15, 2.8, 64]} />
        <meshPhysicalMaterial {...bodyMat} />
        <Decal
          position={[0, 0.2, 1.17]}
          rotation={[0, 0, 0]}
          scale={[1.8, 0.6, 1]}
          map={logoTexture}
          depthTest
          depthWrite={false}
        />
      </mesh>

      {/* Top lid */}
      <mesh position={[0, 1.425, 0]}>
        <cylinderGeometry args={[1.22, 1.22, 0.05, 64]} />
        <meshPhysicalMaterial {...chrome} />
      </mesh>

      {/* Top rim */}
      <mesh position={[0, 1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.22, 0.055, 12, 64]} />
        <meshPhysicalMaterial {...chrome} />
      </mesh>

      {/* Bottom rim */}
      <mesh position={[0, -1.325, 0]}>
        <cylinderGeometry args={[1.18, 1.18, 0.15, 64]} />
        <meshPhysicalMaterial {...chrome} />
      </mesh>

      {/* Bail handle — hangs from outside the rim, rests behind the can */}
      <mesh>
        <primitive object={handleGeo} attach="geometry" />
        <meshPhysicalMaterial {...chrome} />
      </mesh>

      {/* Handle pivot — left */}
      <mesh position={[-1.3, 1.45, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.1, 12]} />
        <meshPhysicalMaterial {...chrome} />
      </mesh>

      {/* Handle pivot — right */}
      <mesh position={[1.3, 1.45, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.1, 12]} />
        <meshPhysicalMaterial {...chrome} />
      </mesh>
    </group>
  )
}
