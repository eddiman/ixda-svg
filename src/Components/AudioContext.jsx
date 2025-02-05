/* import React, { createContext, useContext, useState, useEffect } from "react"

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
 */
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the audio context
const AudioContext = createContext();

// Custom hook to use audio context
export const useAudio = () => useContext(AudioContext);

// Audio Provider component
export const AudioProvider = ({ children }) => {
  const [audio, setAudio] = useState(null);
  const [audioSrc, setAudioSrc] = useState("");
  const [isLooping, setIsLooping] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // 🔹 NEW: Global mute state

  useEffect(() => {
    if (!audioSrc || isMuted) return; // Prevent playing audio if muted

    // Cleanup previous audio before creating a new one
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Reset time
    }

    const newAudio = new Audio(audioSrc);
    newAudio.loop = isLooping; // Set loop state
    newAudio.muted = isMuted;  // 🔹 NEW: Apply mute setting
    newAudio.play();

    setAudio(newAudio); // Store the new audio instance

    return () => {
      newAudio.pause(); // Ensure cleanup when unmounting
    };
  }, [audioSrc, isLooping, isMuted]); // 🔹 Depend on isMuted

  // Method to play audio
  const playAudio = (url, loop = false) => {
    if (isMuted) return; // 🔹 NEW: Don't play if muted

    if (audio) {
      audio.pause(); // Stop any currently playing audio
      audio.currentTime = 0; // Reset playback position
    }

    setIsLooping(loop); // Update loop state
    setAudioSrc(url); // Trigger effect to create and play new audio
  };

  // Method to stop audio
  const stopAudio = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }
    setAudioSrc("");
  };

  // Method to toggle global mute
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (audio) audio.muted = !isMuted; // 🔹 Ensure audio follows mute state
  };

  return (
    <AudioContext.Provider value={{ playAudio, stopAudio, toggleMute, isMuted }}>
      {children}
    </AudioContext.Provider>
  );
};