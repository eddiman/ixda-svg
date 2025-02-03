import React, { useRef, useState, useEffect } from "react";

const DiagonalScrollContainer = ({ children, enableDragScroll = true }) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [velocityX, setVelocityX] = useState(0);
  const [velocityY, setVelocityY] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event) => {
      event.preventDefault();
      container.scrollLeft += event.deltaX || event.deltaY;
      container.scrollTop += event.deltaY;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleMouseDown = (event) => {
    if (!enableDragScroll) return;
    setIsDragging(true);
    setStartX(event.pageX);
    setStartY(event.pageY);
    setScrollLeft(containerRef.current.scrollLeft);
    setScrollTop(containerRef.current.scrollTop);
    setVelocityX(0);
    setVelocityY(0);
    cancelAnimationFrame(animationRef.current);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    event.preventDefault();

    const deltaX = event.pageX - startX;
    const deltaY = event.pageY - startY;

    const newScrollLeft = scrollLeft - deltaX;
    const newScrollTop = scrollTop - deltaY;

    const container = containerRef.current;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const maxScrollTop = container.scrollHeight - container.clientHeight;

    // Scroll limits
    container.scrollLeft = Math.min(Math.max(newScrollLeft, 0), maxScrollLeft);
    container.scrollTop = Math.min(Math.max(newScrollTop, 0), maxScrollTop);

    setVelocityX(deltaX);
    setVelocityY(deltaY);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    applyMomentum(velocityX * 0.1, velocityY * 0.1); // Apply momentum after drag
  };

  const applyMomentum = (vx, vy) => {
    const friction = 0.96; // Momentum decay factor (smooth deceleration)
    const container = containerRef.current;

    const step = () => {
      // Decay velocity on each frame
      vx *= friction;
      vy *= friction;

      container.scrollLeft -= vx;
      container.scrollTop -= vy;

      // Stop momentum when the velocity is small enough
      if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
        animationRef.current = requestAnimationFrame(step);
      }
    };

    animationRef.current = requestAnimationFrame(step);
  };

  return (
    <div
      ref={containerRef}
      className="draggable-scroll-container"
      style={{ overflow: "auto", cursor: isDragging ? "grabbing" : "grab" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default DiagonalScrollContainer;
