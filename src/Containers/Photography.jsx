import { useState, useEffect } from "react";
import * as THREE from "three";
import SplashScreen from "../Components/SplashScreen";
import NavBar from "../Components/NavBar";
import "../styles/photography.scss"

const rfs = THREE.MathUtils.randFloatSpread;

const GRID_ITEMS = 100;
const PASTEL_COLORS = [
  'pink', 'purple', 'indigo', 'blue', 'cyan',
  'teal', 'green', 'lime', 'yellow', 'orange'
];

function PhotoGrid() {
  const getColor = (index) => PASTEL_COLORS[index % PASTEL_COLORS.length];

  return (
    <main className="photo-grid-main-container">
          {Array.from({ length: GRID_ITEMS }).map((_, index) => (
            <div
              key={index}
              className={`photo-grid-item`}
              style={ {backgroundColor : getColor(index)} }
            />
          ))}
    </main>
  );
}



export const Photography = () => {
  const [showLoading, setShowLoading] = useState(true);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 300); // 5000 milliseconds = 5 seconds
    return () => clearTimeout(timeout);
  }, []); // Run effect only once when component mounts
  
  return (
    <>
      {showLoading ? (
        <SplashScreen color={4} selected={true} />
      ) : (
        <>
          <NavBar />
          <PhotoGrid/>
        </>
      )}
    </>
  );
};
export default Photography;
