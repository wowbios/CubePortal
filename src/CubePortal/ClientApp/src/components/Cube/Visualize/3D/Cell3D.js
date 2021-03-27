import React from "react";
import * as THREE from "three"

const Cell3D = ({position, color, rotation, args}) => {
    return (
        <mesh position={position} castShadow rotation={rotation} >
            <planeBufferGeometry attach='geometry' args={[.9, .9]}/>
            <meshStandardMaterial attach='material' color={color} side={THREE.DoubleSide}/>
        </mesh>
    )
}

export default Cell3D