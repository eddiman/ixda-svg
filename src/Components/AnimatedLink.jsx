import React, { useState } from "react"
import { useNavigate } from "react-router-dom" // Assuming you're using React Router for navigation

function AnimatedLink({ isActive, to, children, animationClass, styleClass }) {
  const navigate = useNavigate() // useNavigate hook for navigation
  const [animationComplete, setAnimationComplete] = useState(false)

  const handleClick = () => {
    // Apply the animation class
    setAnimationComplete(true)
  }

  const handleAnimationEnd = () => {
    // After animation is complete, navigate to the specified location
    navigate(to)
  }

  return isActive ? (
    <a className={`${styleClass}`}>{children}</a>
  ) : (
    <a tabindex= {0} onClick={handleClick} className={`${styleClass} ${animationComplete ? animationClass : ""}`} onAnimationEnd={handleAnimationEnd}>
      {children}
    </a>
  )
}

export default AnimatedLink
