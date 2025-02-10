import { useState, useEffect, useRef } from "react";

import "../styles/photography.scss";
import PhotoDeck from "../Components/PhotoDeck";
import { fetchAlbums } from "../api/fetchAlbums";
import SplashScreen from "../Components/SplashScreen";
import NavBar from "../Components/NavBar";
import AnimatedButton from "../Components/AnimatedButton";


const AlbumsList = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const scrollViewWidth = (dir) => {
    // Check if the ref is valid
    if (scrollRef.current) {
      console.log("Scrolling right...");
      console.log(scrollRef.current);
      console.log(dir);
      
      if (dir === "left") {
        scrollRef.current.scrollLeft -= window.innerWidth; // Scroll by the width of the viewport
      } else {
        scrollRef.current.scrollLeft += window.innerWidth; // Scroll by the width of the viewport
      }
    }
  };

  useEffect(() => {
    const getAlbums = async () => {
      const data = await fetchAlbums();
      setAlbums(data);
      setLoading(false);
    };
    getAlbums();
  }, []);

  useEffect(() => {
    // Ensure the scroll event listener is added only when the component is mounted and albums are loaded
    if (!loading && scrollRef.current) {
      // Optionally, you can log here to check when the ref and albums are ready
      console.log("Albums loaded, setting up scroll handler.");
    }
  }, [loading, scrollRef]);  // Dependency ensures this effect runs only after loading is complete

  if (loading) return <p>Loading albums...</p>;

  return (
    <div className="photo-deck-grid-list" ref={scrollRef}>
      {albums.map((album, index) => {
        const imgUrls = album.photos || []; // Ensure it's always an array
        
        return (
          <div className="photo-deck-grid-item" key={index} >
        <div className="decorative-circle"/>
            <h1>{album.name}</h1>
            {index !== 0 ? <AnimatedButton className="color-4 scroll-left" onClick={()=> scrollViewWidth("left")}  >{"<"}</AnimatedButton>: ""}
            {index !== albums.length-1 ? <AnimatedButton className="color-4 scroll-right" onClick={() => scrollViewWidth("right")}  >{">"}</AnimatedButton>: ""}
            <PhotoDeck cards={imgUrls} />
          </div>
        );
      })}
    </div>
  );
};

export const Photography = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 3000); // 5000 milliseconds = 5 seconds
    return () => clearTimeout(timeout);
  }, []); // Run effect only once when component mounts

  return (
    <>
      {showLoading ? <SplashScreen color={4} selected={true} /> : ""}
      <NavBar activeNo={4} />
      <div className={"photography-container fade-in"}>
        <AlbumsList />
        <div className="noise-overlay"></div>
      </div>
    </>
  );
};
