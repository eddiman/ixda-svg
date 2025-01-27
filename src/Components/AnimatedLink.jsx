import React, { useState } from "react"
import { useNavigate } from "react-router-dom" // Assuming you're using React Router for navigation
import { useAudio } from "../Components/AudioContext"

function AnimatedLink({ isActive = false, to, children, animationClass, callback, styleClass, number }) {
  const navigate = useNavigate() // useNavigate hook for navigation
  const [animationComplete, setAnimationComplete] = useState(false)
  const { playAudio } = useAudio();


  const handleClick = () => {
    // Apply the animation class
    
    if(!isActive) {
      let src = "/sounds/home/piano_"+ number +".mp3"

      setAnimationComplete(true)
      
      const timeout = setTimeout(() => {
        playAudio(src, false)
      }, 300) // 5000 milliseconds = 5 seconds
  
      return () => clearTimeout(timeout)
    }
  }

  const handleAnimationEnd = () => {
    if(callback !== undefined) {
      callback();
    }
    // After animation is complete, navigate to the specified location
    navigate(to)
  }

  return isActive ? (
    <a className={`${styleClass}`}>{children}</a>
  ) : (
    <a tabIndex= {0} onClick={handleClick} className={`${styleClass} ${animationComplete ? animationClass : ""}`} onAnimationEnd={handleAnimationEnd}>
      {children}
    </a>
  )
}

export default AnimatedLink
