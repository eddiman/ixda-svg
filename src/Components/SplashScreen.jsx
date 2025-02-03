import React, { useState, useEffect, useRef } from "react"


const SplashScreen = ({selected, color, ...props}) => {
  
  return (
    <div className={`loading-component`} style={selected ? {} : {backgroundColor : "white"}}>
        <div className={`figures-inner`} >

        <figure className={`cube ${selected ? "selected" : ""}` }/>
        <figure className={`circle ${selected ? "selected" : ""}`}/>
        <figure className={`triangle ${selected ? "selected" : ""}`}/>
        <figure className={`donut ${selected ? "selected" : ""}`}/>
        <figure className={`cross ${selected ? "selected" : ""}`}/>
        </div>
        {selected ? <div className={`overlay ${"color-" + color}`}> </div> : ""}
    </div>
  )
}

export default SplashScreen;
