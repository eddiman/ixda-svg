import { useState, useEffect } from "react"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Stats, useGLTF } from "@react-three/drei"
import { Physics, useSphere, useBox, useCylinder } from "@react-three/cannon"
import { EffectComposer, N8AO, Noise, Vignette, HueSaturation } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import ClumpBox from "../Components/ClumpBox"
import LoadingComp from "../Components/Loading"
import Figures from "../Containers/Figures"

const rfs = THREE.MathUtils.randFloatSpread

export const Home = () => {
  const [showLoading, setShowLoading] = useState(true)
  const { nodes } = useGLTF("/portfolio_shapes.glb")

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false)
    }, 1000) // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timeout)
  }, []) // Run effect only once when component mounts

  return (
    <>
      <Figures />
    </>
  )
}
