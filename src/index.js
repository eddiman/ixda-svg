// Original: https://dribbble.com/shots/5708399-Christmas-Collisions
// By: 𝔅𝔢𝔰𝔱𝔖𝔢𝔯𝔳𝔢𝔡𝔅𝔬𝔩𝔡 @bstsrvdbld

import { createRoot } from "react-dom/client"
import { Suspense } from "react"
import { App } from "src/App"
import "./styles/global.scss"
import { AudioProvider } from "./Components/AudioContext"

createRoot(document.getElementById("root")).render(
  <>
    <Suspense fallback={null}>
      <AudioProvider>
        <App />
      </AudioProvider>
    </Suspense>
  </>,
)
