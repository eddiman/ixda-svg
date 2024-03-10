import React, { useState, useEffect, useRef, memo } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import Typed from "typed.js"
import { Environment, OrbitControls, useGLTF, Stats, useTexture, Html } from "@react-three/drei"
import { EffectComposer, N8AO, ToneMapping, Bloom, Noise, DepthOfField, HueSaturation, SSR } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import "../styles/crt.scss"

export const About = () => {
  const [step, setStep] = useState(-1)
  const [globalAudio, setGlobalAudio] = useState(null)
  const [audioPath, setAudioPath] = useState("/sounds/alttp_story.mp3")
  const [audioLoop, setAudioLoop] = useState(false)

  useEffect(() => {

    if(globalAudio) {
      globalAudio.pause();
    }
    const audio = new Audio(audioPath);
    audio.loop = audioLoop;
    setGlobalAudio(audio)
  }, [audioPath]); 

  const playMusic = (audioPath, isLoop) => {
    // Create and play new audio
    setAudioPath(audioPath);
    setAudioLoop(isLoop);
    globalAudio.play();
  }; 


  const handleStart = () => {
    setStep(0)
  }

  const Triforce = (props) => {
    return (
      <div className="triforce ">
        <div className={`triangle triangle-one ${props.rotate ? "rotatemodeTop" : ""}`}>
          <div className="tri-front"></div>
          <div className="tri-back"></div>
          <div className="tri-left"></div>
          <div className="tri-right"></div>
          <div className="tri-bottom"></div>
        </div>
        <div className={`triangle triangle-two ${props.rotate ? "rotatemodeLeft" : ""}`}>
          <div className="tri-front"></div>
          <div className="tri-back"></div>
          <div className="tri-left"></div>
          <div className="tri-right"></div>
          <div className="tri-bottom"></div>
        </div>
        <div className={`triangle triangle-three ${props.rotate ? "rotatemodeRight" : ""}`}>
          <div className="tri-front"></div>
          <div className="tri-back"></div>
          <div className="tri-left"></div>
          <div className="tri-right"></div>
          <div className="tri-bottom"></div>
        </div>
      </div>
    )
  }
  const Intro = () => {
    const storyEl = React.useRef(null)
    const [typedComplete, setTypedComplete] = useState(false)
    const typedRef = useRef(null)

    useEffect(() => {
      if (step == 0) {
        playMusic("/sounds/alttp_intro.mp3", false)

        globalAudio.play();
        const timer = setTimeout(() => {
          setStep(1)
        }, 3000)

        return () => clearTimeout(timer)
      }
    }, []) // Run only once on component mount

    useEffect(() => {
      if (step == 2) {
        playMusic("/sounds/alttp_story.mp3", true)
        typedRef.current = new Typed(storyEl.current, {
          strings: [
            "Amidst the scenic vistas of Stavanger, I'm a certified UX designer and developer shaping seamless experiences at Olavstoppen.",
            "Beyond work, I explore 3D modeling and VR in Unity, while indulging in game development for creative thrills.",
            "In a nutshell, I'm all about crafting digital wonders and chasing innovation!",
          ],
          typeSpeed: 50,
          showCursor: false,
          fadeOut: true,
          fadeOutClass: "move-up-and-fade",
          backDelay: 2000,

          onComplete: () => {
            setTypedComplete(true) // Update state when Typed.js completes
          },
        })
        return () => {
          // Destroy Typed instance during cleanup to stop animation
          typedRef.current.destroy()
        }
      }
    }, []) // Run only once on component mount

    // Restart Typed.js
    const restartTyped = () => {
      if (typedRef.current) {
        typedRef.current.reset()
        setTypedComplete(false)
      }
    }

    const handleToggle = () => {
      if (step === 2) {
        if (typedRef.current) {
          typedRef.current.destroy()
          setTypedComplete(false)
        }
        setStep(0)
      } else {
        setStep(2)
      }
    }

    return (
      <>
        {step === 0 && (
          <div className="first">
            <span>- PIRES -</span>
            <span>presents</span>
          </div>
        )}

        {step === 1 && (
          <>
            {
              <div className="triforce-entry">
                <Triforce rotate={true} />
              </div>
            }
            <div className="welcome-screen">
              <Triforce rotate={false} />
              <div className="master-sword"></div>
              <span className="title-sub-text top">THE STORY OF</span>
              <h1>Edvard</h1>

              <button
                className="start-story-btn"
                onClick={() => {
                  handleToggle()
                }}>
                <span>Click to Start</span>
              </button>
              <div className="border">
                <p>©1993</p>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="story-screen">
            <div className="content-container">
              <img src="" />
              <span ref={storyEl}></span>
              {typedComplete ? (
                <>
                  <button className="restart-story-btn" onClick={restartTyped}>
                    Restart
                  </button>
                  <button className="go-back-btn" onClick={handleToggle}>
                    ←
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </>
    )
  }
  return (
    <Canvas shadows camera={{ position: [0, 0, 3], near: 0.1, far: 40 }} dpr={1}>
      <Stats />
      <LerpCameraFOV isToggled={step == 2} />
      <color attach="background" args={["#0f1837"]} />
      <ambientLight intensity={1} color={"#394160"} />
      <spotLight intensity={0.8} color="white" angle={0.3} penumbra={1} position={[0, 1, 4]} castShadow shadow-mapSize={[512, 512]} />
      <spotLight intensity={0.2} color="white" angle={0.3} penumbra={1} position={[-2, 3, -3]} castShadow shadow-mapSize={[512, 512]} />
      <spotLight intensity={0.3} color="white" angle={1} penumbra={1} position={[0, 1.75, 0]} castShadow shadow-mapSize={[512, 512]} />

      <spotLight position={[0, 0, 0]} angle={0.5} intensity={1} castShadow />

      {/* Add a helper to visualize the spotlight */}

      <OrbitControls
        enablePan={false}
        maxDistance={4}
        minDistance={1.7}
        minAzimuthAngle={-Math.PI / 8.5}
        maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 2.2}
      />
      <RoomModel position={[0.1, -0.55, 0.5]} rotation={[0, -0.5, 0]} scale={[1, 1, 1]}>
        <Html className="content" scale={[0.15, 0.15, 0.15]} rotation-y={0.35} position={[-0.34, 0.52, -0.33]} transform occlude="blending">
          <div className="tv-container crt-scanlines crt-flicker">{step === -1 ? 
          <div className="av-screen">
            <span className="channel-label">AV 9 - SPEL</span>
            <button className="initiate-btn" onClick={handleStart}> START </button> 
            <div className="white-noise"> </div>
          </div>: <Intro />}</div>
        </Html>

      </RoomModel>
      <EffectComposer>
    
        <N8AO
          halfRes={false} // Whether to render at half resolution for performance (true/false)
          color="#0a027d" // Base color for occlusion
          aoRadius={0.15} // Radius of the ambient occlusion effect
          intensity={1.5} // Intensity of the ambient occlusion effect
          aoSamples={4} // Number of samples used for ambient occlusion calculation
          denoiseSamples={2} // Number of samples used for denoising (reduce noise)
        />

        <Noise opacity={0.2} />
        <HueSaturation blendFunction={BlendFunction.NORMAL} hue={0} saturation={0.4} />
      </EffectComposer>
    </Canvas>
  )
}

const RoomModel = memo(({ position, scale, rotation, ...props }) => {
  // Load the 3D model
  const { scene } = useGLTF("/room.gltf")

  // Load the texture

  return (
    <primitive position={position} rotation={rotation} scale={scale} object={scene}>
      {" "}
      {props.children}
    </primitive>
  )
})
const LerpCameraFOV = ({ isToggled }) => {
  const { camera } = useThree()
  const targetFOV = isToggled ? 15 : 30
  const lerpFactor = 0.05
  const animationRef = useRef()

  useEffect(() => {
    const updateCamera = () => {
      const currentFOV = camera.fov
      const lerpedFOV = currentFOV + (targetFOV - currentFOV) * lerpFactor

      camera.fov = lerpedFOV
      camera.updateProjectionMatrix()

      if (Math.abs(lerpedFOV - targetFOV) > 0.01) {
        // Continue animating
        animationRef.current = requestAnimationFrame(updateCamera)
      }
    }

    // Start animation
    animationRef.current = requestAnimationFrame(updateCamera)

    return () => cancelAnimationFrame(animationRef.current)
  }, [camera, targetFOV])

  return null
}

export default About
