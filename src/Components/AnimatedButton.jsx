import React from "react"

function AnimatedButton({onClick, className, children}) {
  const handleClick = () => {
    onClick();
  }


  return  (
    <button tabIndex={0} onClick={handleClick} className={`${className}`}>
      {children}
    </button>
  )  
}

export default AnimatedButton
