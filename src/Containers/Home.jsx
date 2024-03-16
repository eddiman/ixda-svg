import { useState, useEffect } from "react"
import * as THREE from "three"
import SplashScreen from "../Components/SplashScreen"
import NavBar from "../Components/NavBar" 
import Figures from "../Components/Figures"

const rfs = THREE.MathUtils.randFloatSpread

export const Home = () => {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false)
    }, 3000) // 5000 milliseconds = 5 seconds
    return () => clearTimeout(timeout)
  }, []) // Run effect only once when component mounts

  return (
    <>
      {showLoading ? <SplashScreen /> : ""}
      <NavBar />
      <div className="view-screen fade-in">
        <Figures />
      </div>
    </>
  )
}
