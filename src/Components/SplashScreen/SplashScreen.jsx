import React, { useState, useEffect, useRef } from "react"
import IxdaLogo from "../IxdaLogo/IxdaLogo";


const SplashScreen = ({selected, color, ...props}) => {
  
  return (
    <div className={`loading-component`} style={selected ? {} : {backgroundColor : "white"}}>
       <IxdaLogo color={"grey-1"} />
    </div>
  )
}

export default SplashScreen;
