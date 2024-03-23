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
  const [audioSrc, setAudioSrc] = useState("/sounds/home/piano_0.mp3")

  useEffect(() => {
    if (audioSrc === "") {
      return;
    }
      stopAudio()
      const audio = new Audio(audioSrc)
      audio.loop = audioLoop
      setAudio(audio)
      console.log("state change");
  }, [audioSrc])

  // Method to play audio
  const playAudio = (url, loop = false) => {
    setAudioSrc(url)
    setAudioLoop(loop)
    audio.loop = loop // Set loop property based on the prop value
    audio.play()
    setAudio(audio)


  }

  // Method to pause audio
  const stopAudio = () => {
    if (audio) {
console.log("pause");

      audio.pause()
      setAudio(null)
    }
  }

  return <AudioContext.Provider value={{ playAudio, pauseAudio: stopAudio }}>{children}</AudioContext.Provider>
}
