import { useState, useEffect } from "react"
import * as THREE from "three"
import LoadingComp from "../Components/Loading"
import Figures from "../Containers/Figures"

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
      {showLoading ? <LoadingComp /> : ""}
      <div className="view-screen fade-in">
        <nav>
          <a className="color-1" href={"/about"}>About</a>
          <a className="color-2">Work</a>
          <a className="color-3">Hobby</a>
          <a className="color-4">Photography</a>
          <a className="color-5">Contact</a>
        </nav>
        <Figures />
      </div>
    </>
  )
}
