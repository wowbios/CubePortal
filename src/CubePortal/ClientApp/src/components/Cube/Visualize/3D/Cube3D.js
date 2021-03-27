import React from "react"
import Side3D from './Side3D'

const renderSides = (cube) => {
    const {
        top,
        // bot,
        // left,
        // right,
        // front,
        // back
    } = cube
    
    return (
        <Side3D side={top} />
    )
}

const Cube3D = ({cube}) => {
    return (
        <group>
            { renderSides(cube) }
        </group>
    )
}

export default Cube3D 