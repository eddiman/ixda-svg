import { useState, useEffect } from "react"
import * as THREE from "three"
import SplashScreen from "../Components/SplashScreen"
import AnimatedLink from "../Components/AnimatedLink"
import Figures from "../Containers/Figures"


const rfs = THREE.MathUtils.randFloatSpread

export const Home = () => {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false)
    }, 2000) // 5000 milliseconds = 5 seconds
    return () => clearTimeout(timeout)
  }, []) // Run effect only once when component mounts

  return (
    <>
      {showLoading ? <SplashScreen /> : ""}
        <nav>
          <AnimatedLink styleClass="color-1" to={"/about"} animationClass={"selected"}>About</AnimatedLink>
          <AnimatedLink styleClass="color-2" to={"/"} animationClass={"selected"}>Work</AnimatedLink>
          <a className="color-3">Hobby</a>
          <a className="color-4">Photography</a>
          <a className="color-5">Contact</a>
        </nav>
      <div className="view-screen fade-in">
        <Figures />
      </div>
    </>
  )
}
