import * as THREE from "three"
import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber"
import { Environment, useGLTF, MeshPortalMaterial, Text, Html, Stats } from "@react-three/drei"
import { EffectComposer, N8AO, Noise, DepthOfField, HueSaturation, SSR } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import { geometry } from "maath"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { CustomSSR } from "./CustomSSR"

extend(geometry)

export const AboutMeView = ({ speed = 1, count = 80, depth = 80, easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) => (
  <>
    <div className="aboutme-bg">
      <Canvas shadows gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [1, 5, 10], fov: 60, near: 1, far: depth + 15 }}>
        <fog attach="fog" args={["#9aa9df", 30, 40]} />
        <color attach="background" args={["#9aa9df"]} />
        <ambientLight intensity={0.1} color={"#4B65C6"} />
        <spotLight intensity={0.7} color="" angle={1} penumbra={1} position={[0, 3, 0]} castShadow shadow-mapSize={[512, 512]} />
        <Stats />

        <Frame id="01" name="Edvard Pires Bjørgen" author="McCree" position={[0, 0.4, 0]}>
          <spotLight intensity={0.7} color="" angle={1} penumbra={1} position={[0, 2, 2]} castShadow shadow-mapSize={[512, 512]} />

          <ImgFrame />
          <EddiShape />
        </Frame>
        <Cube size={[100, 1, 100]} position={[0, -4, 0]} matColor={"#4b65c6"} showGeometry={true} />

        <Environment files="/adamsbridge.hdr" />
        <EffectComposer disableNormalPass>
          <N8AO halfRes color="#645299" aoRadius={2} intensity={3} aoSamples={6} denoiseSamples={4} />

          <Noise opacity={0.2} />
          <HueSaturation
            blendFunction={BlendFunction.NORMAL} // blend mode
            saturation={0.4} // saturation in radians
          />
          <DepthOfField focusDistance={0} focalLength={0} bokehScale={0} />
        </EffectComposer>
        <Rig from={-Math.PI / 2} to={Math.PI / 2.66} />
      </Canvas>
    </div>
  </>
)
function Rig() {
  useFrame((state) => {
    //state.camera.position.lerp({ x: 0, y: -state.pointer.y / 2, z: state.pointer.x / 2 }, 0.1)
    state.camera.position.lerp({ x: -state.pointer.x / 1, y: -state.pointer.y / 4, z: 2 }, 0.1)
    state.camera.lookAt(0, 0, 0)
  })
}
function ImgFrame({ ...props }) {
  const colorMap = useLoader(TextureLoader, "IMG_4087_kun_bakgrunn.jpg")
  return (
    <mesh castShadow position={[0, 0, -1]}>
      <>
        <boxGeometry args={[2.5, 2.5, 0.01]} />
        <meshStandardMaterial roughness="0" map={colorMap} />
      </>
    </mesh>
  )
}

function EddiShape({ clip, ...props }) {
  const { nodes, materials } = useGLTF("/eddi2.glb")
  const colorMap = useLoader(TextureLoader, "IMG_4087.jpg")
  return (
    <>
      <mesh castShadow geometry={nodes.eddi.geometry} position={[0, -0.15, -0.1]} rotation={[0, 3, 0]}>
        <meshStandardMaterial map={colorMap} material={materials["Wood"]} />
      </mesh>
    </>
  )
}

function Frame({ id, name, position, width = 1, height = 1, children, ...props }) {
  const { nodes } = useGLTF("/portfolio_shapes.glb")

  return (
    <group {...props}>
      <Text color="#1d2b5d" fontSize={0.06} letterSpacing={-0.025} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.45, 0.65, 0.001]}>
        {name}
      </Text>
      <mesh name={id} position={position}>
        <roundedPlaneGeometry name="33" args={[width, height, 0.01]} />
        <MeshPortalMaterial>{children}</MeshPortalMaterial>
      </mesh>

      <mesh name={id} position={[position[0], position[1], position[2] - 0.601]} geometry={nodes.shape_2.geometry}>
        {/*<boxGeometry args={[width + 0.5, height + 0.5, 1]} />*/}
        <meshStandardMaterial roughness={0.1} Material color="#1d2b5d" />
      </mesh>

      <mesh name={id} scale={[1, 0.5, 1]} position={[position[0], position[1] - 0.9, position[2] - 0.6]} geometry={nodes.shape_2.geometry}>
        {/*<roundedPlaneGeometry args={[1 + 0.05, 0.35 + 0.05, 0.01]} />*/}
        <meshStandardMaterial roughness={0.1} color="#1d2b5d" />
      </mesh>

      <Html className="content" scale={0.2} position={[0, position[1] - 0.88, position[2] + 0.01]} transform>
        <div className="wrapper about-me" onPointerDown={(e) => e.stopPropagation()}>
          {/*<p>
            Certified UX designer and developer with a M.Sc. in Information Science at the University of Bergen, consisting of elements that focus on user
            experience, interaction design and development.
            <br />
            <br />
            I’m based in Stavanger and work as UX and UI designer and developer at Olavstoppen. In addition to web development and UX / UI design, I have
            experience and knowledge in 3D modeling, development and design of VR and 3D applications in Unity.{" "}
          </p>*/}
        </div>
      </Html>
    </group>
  )
}
function Cube({ size, showGeometry, matColor, position, ...props }) {
  return (
    <mesh castShadow position={position}>
      {showGeometry ? (
        <>
          <boxGeometry args={size} />
          <meshStandardMaterial roughness="1" color={matColor === "" ? "#fbb033" : matColor} />{" "}
        </>
      ) : (
        ""
      )}
    </mesh>
  )
}
