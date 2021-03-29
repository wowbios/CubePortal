import React from "react";
import { Html } from '@react-three/drei'
import * as THREE from "three"

const Cell3D = ({position, color, rotation, name, args}) => {
    return (
        <group>
            <mesh position={position} castShadow rotation={rotation} >
                <planeBufferGeometry attach='geometry' args={[.9, .9]}/>
                <meshStandardMaterial attach='material' color={color} side={THREE.DoubleSide}/>
                <Html scaleFactor={10}>
                    <div className='content'>
                        {/*{name}*/}
                    </div>
                </Html>
            </mesh>
        </group>
    )
}

export default Cell3D