import React, { useState, useEffect, useRef } from "react"
import {Html } from "@react-three/drei"


const Loading = (props) => {
  return (
    <div className="loading-component">
        <div className="figures-inner">

        <figure className="cube"/>
        <figure className="circle"/>
        <figure className="triangle"/>
        <figure className="cross"/>
        <figure className="donut"/>
        </div>
    </div>
  )
}

export default Loading;
