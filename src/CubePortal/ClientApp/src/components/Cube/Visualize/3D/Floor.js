import React from "react";

const Floor = () => {
    return (
        <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
            receiveShadow>
            <planeBufferGeometry attach='geometry' args={[100, 100]}/>
            <meshStandardMaterial attach='material' color={'#3d3d3d'}/>
        </mesh>
    )
}

export default Floor