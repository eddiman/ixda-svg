import React, { useMemo } from "react"
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useSphere, useBox} from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';

const rfs = THREE.MathUtils.randFloatSpread
function getObjectByKey(obj, key) {
    return obj[key]
  }

export default function ClumpBox({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), amount, number, shapeColor, shape, nodes, ...props }) {
    const mate = new THREE.MeshStandardMaterial({ color: shapeColor, roughness: 0, envMapIntensity: 1 })
    let l = getObjectByKey(nodes, "shape_" + number)
    const linearDampingNumber = .1;
    const angularDampingNumber = .9;
    const massNumber1 = 2;
     const [ref, api] = useBox(() => ({ args: [1],mass: massNumber1, angularDamping: angularDampingNumber, linearDamping: linearDampingNumber, position: [rfs(5), rfs(5), rfs(5)] }))

/*     let ref = null;
    let api = null;
    switch(number) {
        case 1: {            
        [ref, api] = useBox(() => ({ args: [1],mass: massNumber1, angularDamping: angularDampingNumber, linearDamping: linearDampingNumber, position: [rfs(5), rfs(5), rfs(5)] }))
    } 
        case 2: {
        [ref, api] = useBox(() => ({ args: [1],mass: massNumber1, angularDamping: angularDampingNumber, linearDamping: linearDampingNumber, position: [rfs(5), rfs(5), rfs(5)] }))
    } 
        case 3: {
        [ref, api] = useSphere(() => ({ args: [1], mass: massNumber1, angularDamping: linearDampingNumber, linearDamping: linearDampingNumber, position: [rfs(5), rfs(5), rfs(5)] }))
    } 
        case 4: {
        [ref, api] = useSphere(() => ({ args: [2,2,.75], mass: massNumber1, angularDamping: angularDampingNumber, linearDamping: linearDampingNumber, position: [rfs(5), rfs(5), rfs(5)] }))
    } 
        case 5: {
        [ref, api] = useBox(() => ({ args: [1],mass: massNumber1, angularDamping: angularDampingNumber, linearDamping: linearDampingNumber, position: [rfs(5), rfs(5), rfs(5)] }))
    } 
        default: {
        [ref, api] = useBox(() => ({ args: [1,1,1], mass: massNumber1, angularDamping: angularDampingNumber, linearDamping: linearDampingNumber, position: [rfs(5), rfs(5), rfs(5)] }))
    }  
    
}*/
  

    useFrame(() => {
      for (let i = 0; i < amount; i++) {
        // Get current whereabouts of the instanced sphere
        ref.current.getMatrixAt(i, mat)
        // Normalize the position and multiply by a negative force.
        // This is enough to drive it towards the center-point.
        console.log(api);
        
        if(api !== undefined){
          api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-50).toArray(), [0, 0, 0])
        } else {console.log("sea");
        }
      }
    })
    return (
      <instancedMesh ref={ref} castShadow receiveShadow args={[l.geometry, mate, amount]}>
        <meshStandardMaterial roughness={0} color={shapeColor} />

      </instancedMesh>
    )
  }

/*   return (
    <instancedMesh  args={[null, mate, amount]}>
      <mesh ref={ref} geometry={nodes[`shape_${number}`].geometry} />
    </instancedMesh>
  ); */