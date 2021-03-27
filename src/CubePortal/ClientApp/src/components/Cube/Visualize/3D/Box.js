import React from "react";

const Box = ({position, args}) => {
    return (
        <mesh position={position}>
            <boxBufferGeometry attach='geometry'/>
            <meshStandardMaterial attach='material' color={'lightblue'}/>
        </mesh>
    )
}
export default Box