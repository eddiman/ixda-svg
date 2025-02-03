import React, { useState, useRef, useEffect } from "react";

const PhotoGridItem = ({
  index,
  isSelected,
  isLandscape,
  selectedIndex,
  onSelect,
}) => {
  const itemRef = useRef(null);

  // Handle mouse movement for 3D tilt
  const handleMouseMove = (event) => {
    // if (isSelected) return; // Disable tilt when selected

    const item = itemRef.current;
    if (!item) return;

    const { left, top, width, height } = item.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;

    const rotateX = y * 15;
    const rotateY = -x * 15;

    item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04) `;

    if (isSelected) {
      item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.5) `;
    }
    item.style.boxShadow = `${-rotateY * 5}px ${
      rotateX * 5
    }px 32px rgba(0, 0, 0, 0.15)`;
  };

  const handleMouseLeave = () => {
    if (isSelected) return; // Don't reset while expanded

    const item = itemRef.current;
    if (!item) return;

    item.style.transform = "rotateX(0deg) rotateY(0deg) scale(1) ";
    item.style.boxShadow = "rgba(149, 157, 165, 0.2) 0px 8px 24px";
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onSelect();
      }
    };
    if (isSelected) {
      const item = itemRef.current;
      document.addEventListener("keydown", handleKeyDown);
      if (!item) return;
      item.style.transform = `rotateX(0deg) rotateY(0deg) scale(1.5) `;
    } else {
      const item = itemRef.current;
      document.removeEventListener("keydown", handleKeyDown);
      if (!item) return;
      item.style.transform = `rotateX(0deg) rotateY(0deg) scale(1.04) `;
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSelected]);

  return (
    <>
      {isSelected ? (
        <div className="photo-grid-item-overlay" onClick={onSelect}></div>
      ) : (
        ""
      )}
      <button
        ref={itemRef}
        className={`photo-grid-item ${isSelected ? "selected" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onSelect}
        key={index}
        tabIndex={0}
      >
        <div
          className={`photo-grid-img ${isLandscape ? "landscape" : "portrait"}`}
        ></div>
      </button>
    </>
  );
};

export default PhotoGridItem;
