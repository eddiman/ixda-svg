import React, { createContext, useContext, useState, useEffect } from "react"

// Create the audio context
const AudioContext = createContext()

// Custom hook to use audio context
export const useAudio = () => useContext(AudioContext)

// Audio Provider component
export const AudioProvider = ({ children }) => {
  const [audio, setAudio] = useState(null)
  const [audioLoop, setAudioLoop] = useState(null)
  //just needs a valid audio src, the play changes it anyways
  const [audioSrc, setAudioSrc] = useState('')
  

  useEffect(() => {
    // Only create a new Audio object if audioSrc is not an empty string
    if (audioSrc) {
      const newAudio = new Audio(audioSrc);
      newAudio.loop = audio?.loop || false; // Use existing loop state or default to false
      newAudio.play();
      setAudio(newAudio); // Update the audio state with the new Audio object
    }
  }, [audioSrc]);

  // Method to play audio
  const playAudio = (url, loop = false) => {
    if (audio) {
      audio.pause(); // Stop any audio that's currently playing
    }
    console.log("Playing audio...");
    
    setAudioSrc(url); // This will trigger the effect to load and play the new audio
    setAudio((currentAudio) => {
      if (currentAudio) {
        currentAudio.loop = loop; // Set loop for the current audio if it exists
      }
      return currentAudio;
    });
  };

  // Method to pause audio
  const stopAudio = () => {
    setAudioSrc(''); // Resetting the src to stop the audio
    if (audio) {
      audio.pause();
      setAudio(null);
    }
  };

  return (
    <AudioContext.Provider value={{ playAudio, pauseAudio: stopAudio }}>
      {children}
    </AudioContext.Provider>
  );
};
