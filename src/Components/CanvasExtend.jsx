import { isMobile, isSafari } from "react-device-detect";
import React, { useState, useEffect, useRef } from "react"

export default function CanvasExtend(props) {
  const [height, setHeight] = useState("100dvh");
  const canvasRef = useRef();

  useEffect(() => {
    const measureCanvasHeight = () => {
      const canvasElement = canvasRef.current;
      let canvasHeight = canvasElement.clientHeight;

      if (isSafari && canvasHeight % 2 !== 0) {
        setHeight(`${canvasHeight - 1}px`);
      }
    };

    window.requestAnimationFrame(measureCanvasHeight);
    const handleResize = () => {
      setHeight("100dvh)");
      measureCanvasHeight();
    };

    if (!isMobile && isSafari) {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className="canvas-extend" style={{ height: height, backgroundColor: props.bgColor }} ref={canvasRef}>
      {props.children}
    </div>
  );
}
