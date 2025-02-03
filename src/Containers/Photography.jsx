import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import SplashScreen from "../Components/SplashScreen";
import PhotoGridItem from "../Components/PhotoGridItem";
import NavBar from "../Components/NavBar";
import DraggableScrollContainer from "../Components/DraggableScrollContainer";
import "../styles/photography.scss";
import { useDraggable } from "react-use-draggable-scroll";

const GRID_ITEMS = 100;
const PASTEL_COLORS = [
  "pink",
  "purple",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "lime",
  "yellow",
  "orange",
];
const PhotoGrid = ({ isLandscape }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
    <DraggableScrollContainer enableDragScroll={true}>
      <main className="photo-grid-main-container">
        {Array.from({ length: GRID_ITEMS }).map((_, index) => {
const isLandscape = Math.random() < 1
          return (
            <PhotoGridItem
              key={index}
              index={index}
              isLandscape={isLandscape}
              isSelected={selectedIndex === index}
              selectedIndex={selectedIndex}
              onSelect={() =>
                setSelectedIndex(index === selectedIndex ? null : index)
              }
            />
          );
        })}
      </main>
    </DraggableScrollContainer>
  );
}

//item.style.boxShadow = `${-rotateY * 5}px ${rotateX * 5}px 40px rgba(40, 124, 70, .2)`;

export const Photography = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 300); // 300 milliseconds
    return () => clearTimeout(timeout);
  }, []); // Run effect only once when component mounts

  useEffect(() => {
    // Center the user in the middle of the photo grid
    const container = document.querySelector(".draggable-scroll-container");
    if (container) {
      container.scrollTo({
        top: container.scrollHeight / 2 - container.clientHeight / 2,
        left: container.scrollWidth / 2 - container.clientWidth / 2,
      });
    }
  }, [showLoading]);
  return (
    <>
      {showLoading ? (
        <SplashScreen color={4} selected={true} />
      ) : (
        <>
          <NavBar />
          <PhotoGrid isLandscape={Math.random() < 0.3} />
        </>
      )}
    </>
  );
};
export default Photography;
