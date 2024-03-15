import * as THREE from "three"
import { useRef, useReducer, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, PerformanceMonitor, Environment, Lightformer, Stats } from "@react-three/drei"
import { CuboidCollider, BallCollider, Physics, RigidBody } from "@react-three/rapier"
import { EffectComposer, N8AO, Noise, Vignette, HueSaturation, DepthOfField } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import { easing } from "maath"

const accents = ["white", "#f2d39a", "#7385c4", "#e9b28f", "#aad6b8", "#8a7faa"]
const shuffle = (accent = 0) => [
  { color: accents[accent], roughness: 0.1, number: 1 },
  { color: accents[accent], roughness: 0.75, number: 2 },
  { color: accents[accent], roughness: 0.75, number: 3 },
  { color: accents[accent], roughness: 0.1, number: 4 },
  { color: accents[accent], roughness: 0.75, number: 5 },
  { color: accents[accent], roughness: 0.1, number: 1 },
  { color: accents[accent], roughness: 0.1, number: 1 },
  { color: accents[accent], roughness: 0.75, number: 2 },
  { color: accents[accent], roughness: 0.75, number: 3 },
  { color: accents[accent], roughness: 0.1, number: 4 },
  { color: accents[accent], roughness: 0.75, number: 5 },
  { color: accents[accent], roughness: 0.1, number: 1 },
  { color: accents[accent], roughness: 0.1, number: 1 },
  { color: accents[accent], roughness: 0.75, number: 2 },
  { color: accents[accent], roughness: 0.75, number: 3 },
  { color: accents[accent], roughness: 0.1, number: 4 },
  { color: accents[accent], roughness: 0.75, number: 5 },
  { color: accents[accent], roughness: 0.1, number: 1 },
  { color: accents[accent], roughness: 0.1, number: 1 },
  { color: accents[accent], roughness: 0.75, number: 2 },
  { color: accents[accent], roughness: 0.75, number: 3 },
  { color: accents[accent], roughness: 0.1, number: 4 },
  { color: accents[accent], roughness: 0.75, number: 5 },
  { color: accents[accent], roughness: 0.1, number: 1 },
  /* { color: accents[accent], roughness: 0.1, number: 1 }, */
  { color: "#F5C163", roughness: 0.1, accent: true, number: 1 },
  { color: "#4B65C6", roughness: 0.75, accent: true, number: 2 },
  { color: "#F19A62", roughness: 0.1, accent: true, number: 3 },
  { color: "#72CD90", roughness: 0.1, accent: true, number: 4 },
  { color: "#645299", roughness: 0.1, accent: true, number: 5 },
]

const Figures = () => <Scene />

function Scene(props) {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0)
  const connectors = useMemo(() => shuffle(accent), [accent])

  const [dpr, setDpr] = useState(1)

  return (
    <Canvas onClick={click} shadows dpr={[0.8, 1]} gl={{ antialias: false }} camera={{ position: [0, 0, 15], fov: 30, near: 1, far: 40 }} {...props}>

<Stats/>
      <color attach="background" args={["#e2e2e2"]} />
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <Physics /*debug*/ gravity={[0, 0, 0]}>
        <Pointer />
        {connectors.map((props, i) => <FigurePhysics key={i} {...props} />) /* prettier-ignore */}

      </Physics>
      <EffectComposer disableNormalPass multisampling={8}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={2} />
        <Noise opacity={0.1} />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
        
        <HueSaturation
          blendFunction={BlendFunction.NORMAL} // blend mode
          hue={0} // hue in radians
          saturation={0.3} // saturation in radians
        />
      </EffectComposer>
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={3.5} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={1} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={1} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={1} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
        </group>
      </Environment>
    </Canvas>
  )
}

function FigurePhysics({ position, children, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, accent, ...props }) {
  const api = useRef()
  const pos = useMemo(() => position || [r(10), r(10), r(10)], [])
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta)
    api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.2))
  })

  return (
    <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={pos} ref={api} colliders={"ball"}>
      {children ? children : <Model {...props} />}
      {accent && <pointLight intensity={3} distance={2.5} color={props.color} />}
    </RigidBody>
  )
}

function Model({ children, color = "white", roughness = 0, number = 1, ...props }) {
  const ref = useRef()
  const { nodes } = useGLTF("/portfolio_shapes.glb")

  let figureModel = getObjectByKey(nodes, "shape_" + number)

  useFrame((state, delta) => {
    easing.dampC(ref.current.material.color, color, 0.4, delta)
  })
  return (
    <mesh ref={ref} castShadow receiveShadow scale={1} rotation={[2.3, 4, 1.3]} geometry={figureModel.geometry}>
      <meshStandardMaterial metalness={0.2} roughness={roughness} />
      {children}
    </mesh>
  )
}
function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0))
  })
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1.5]} />
    </RigidBody>
  )
}

function getObjectByKey(obj, key) {
  return obj[key]
}

export default Figures
