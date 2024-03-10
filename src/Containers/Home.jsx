import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, MeshTransmissionMaterial, useGLTF } from "@react-three/drei"
import { Physics, useSphere, useBox, useCylinder } from "@react-three/cannon"
import { EffectComposer, N8AO, DepthOfField, Noise, Vignette, HueSaturation } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import { useControls } from "leva"

const rfs = THREE.MathUtils.randFloatSpread
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const baubleMaterial = new THREE.MeshStandardMaterial({ color: "white", roughness: 0, envMapIntensity: 1 })

export const Home = () => (
  <>
    <Canvas shadows gl={{ antialias: false }} dpr={[3, 1.5]} camera={{ position: [0, 0, 20], fov: 20, near: 1, far: 40 }}>
      <ambientLight intensity={0.5} color={"#d3d3d3"} />
      <color attach="background" args={["#e2e2e2"]} />
      <spotLight intensity={1} angle={0.2} penumbra={1} position={[30, 30, 30]} castShadow shadow-mapSize={[512, 512]} />
      <Physics gravity={[0, -9.81, 0]} iterations={10}>
        <Pointer />
        {
          <>
            <ItemBox number={1} shapeColor="#F5C163" position={[-3, 5, 0]} />
            <ItemBox number={2} shapeColor={"#4B65C6"} position={[0, 9, 0]} />
            <ItemSphere number={3} size={[0.6, 0.6, 0.6]} shapeColor={"#F19A62"} position={[2, 8, 0]} />
            <ItemCylinder number={4} size={[1, 0.2, 1]} shapeColor={"#72CD90"} position={[1, 9, 0]} />
            <ItemBox number={5} shapeColor={"#645299"} position={[2, 9, 0]} />
          </>
        }
        <sphereGeometry mass={0} args={[3, 3, 3]} position={[10, 0, 0]}>
          <meshStandardMaterial roughness={1} color={"#000"} />
        </sphereGeometry>
        <ClumpBox number={1} amount={1} shapeColor="#F5C163" />
        <ClumpBox number={2} amount={1} shapeColor="#4B65C6" />
        <ClumpBox number={3} amount={1} shapeColor="#F19A62" />
        <ClumpBox number={4} amount={1} shapeColor="#72CD90" />
        <ClumpBox number={5} amount={1} shapeColor="#645299" />

        <ClumpBox number={1} amount={2} shapeColor="#d2d2d2" />
        <ClumpBox number={2} amount={7} shapeColor="#c1c1c1" />
        <ClumpBox number={3} amount={4} shapeColor="#e3e3e3" />
        <ClumpBox number={4} amount={7} shapeColor="#a1a1a1" />
        <ClumpBox number={5} amount={5} shapeColor="#d6d6d6" />

        <Cube size={[1, 15, 5]} matColor={"blue"} position={[7, 4, 0]} mass={0} showGeometry={false} />
        <Cube size={[13, 15, 1]} matColor={"blue"} position={[0, 4, -3]} mass={0} showGeometry={false} />
        <Cube size={[1, 15, 5]} matColor={"blue"} position={[-7, 4, 0]} mass={0} showGeometry={false} />
        <Cube size={[13, 15, 1]} matColor={"blue"} position={[0, 4, 3]} mass={0} showGeometry={false} />
        <Cube size={[13, 1, 15]} matColor={"blue"} position={[0, 10, -3]} mass={0} showGeometry={false} />

        <Cube size={[100, 1, 100]} position={[0, -4, 0]} mass={0} showGeometry={false} />
      </Physics>
      <Environment files="/adamsbridge.hdr" />
      <EffectComposer disableNormalPass multisampling={0}>
        <N8AO halfRes color="#645299" aoRadius={2} intensity={3} aoSamples={6} denoiseSamples={4} />

        <Noise opacity={0} />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
        <HueSaturation
          blendFunction={BlendFunction.NORMAL} // blend mode
          hue={0} // hue in radians
          saturation={0.4} // saturation in radians
        />
      </EffectComposer>
    </Canvas>
  </>
)

function getObjectByKey(obj, key) {
  return obj[key]
}

function ItemBox({ number, shapeColor, shape, ...props }) {
  const { nodes } = useGLTF("/portfolio_shapes.glb")
  var l = getObjectByKey(nodes, "shape_" + number)
  const [ref, api] = useBox(() => ({ friction: 0.1, mass: 1, ...props }))
  return (
    <>
      <mesh castShadow ref={ref} geometry={l.geometry}>
        <meshStandardMaterial roughness={0} color={shapeColor} />
      </mesh>
    </>
  )
}

function ItemSphere({ number, size, shapeColor, shape, ...props }) {
  const { nodes } = useGLTF("/portfolio_shapes.glb")
  var l = getObjectByKey(nodes, "shape_" + number)
  const [ref, api] = useSphere(() => ({ linearDamping: 0.1, friction: 0.1, mass: 1, args: size, ...props }))
  return (
    <>
      <mesh castShadow ref={ref} geometry={l.geometry}>
        <meshStandardMaterial roughness={0} color={shapeColor} />
      </mesh>
    </>
  )
}

function ItemCylinder({ number, size, shapeColor, shape, ...props }) {
  const { nodes } = useGLTF("/portfolio_shapes.glb")
  var l = getObjectByKey(nodes, "shape_" + number)
  const [ref, api] = useCylinder(() => ({ friction: 0.1, mass: 1, args: size, ...props }))
  return (
    <>
      <mesh castShadow ref={ref} geometry={l.geometry}>
        <meshStandardMaterial roughness={0} color={shapeColor} />
      </mesh>
    </>
  )
}

function Pointer() {
  const viewport = useThree((state) => state.viewport)
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [2], position: [-100, -100, -100] }))
  return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0))
}

function ClumpBox({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), amount, number, shapeColor, shape, ...props }) {
  const { nodes } = useGLTF("/portfolio_shapes.glb")
  const mate = new THREE.MeshStandardMaterial({ color: shapeColor, roughness: 0, envMapIntensity: 1 })
  var l = getObjectByKey(nodes, "shape_" + number)
  const [ref, api] = useSphere(() => ({ args: [0.5], mass: 1, angularDamping: 0.1, linearDamping: 0.9, position: [rfs(5), rfs(5), rfs(5)] }))

  useFrame((state) => {
    for (let i = 0; i < amount; i++) {
      // Get current whereabouts of the instanced sphere
      ref.current.getMatrixAt(i, mat)
      // Normalize the position and multiply by a negative force.
      // This is enough to drive it towards the center-point.
      api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-40).toArray(), [0, 0, 0])
    }
  })
  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[l.geometry, mate, amount]}>
      <meshStandardMaterial roughness={0} color={shapeColor} />
    </instancedMesh>
  )
}

function Cube({ size, mass, showGeometry, matColor, ...props }) {
  const [ref] = useBox(() => ({ args: size, mass: mass, ...props }))
  return (
    <mesh castShadow ref={ref}>
      {showGeometry ? (
        <>
          <boxGeometry args={size} />
          <meshStandardMaterial roughness="0" color={matColor === "" ? "#fbb033" : matColor} />{" "}
        </>
      ) : (
        ""
      )}
    </mesh>
  )
}
