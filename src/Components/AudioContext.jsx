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