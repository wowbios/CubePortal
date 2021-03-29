import React from "react"
import Side3D from './Side3D'

const renderSides = (cube) => {
    const {
        top,
        bot,
        left,
        right,
        front,
        back
    } = cube
    
    return (
        <group>
            <Side3D side={top} />
            <Side3D side={bot} />
            <Side3D side={left} />
            <Side3D side={right} />
            <Side3D side={front} />
            <Side3D side={back} />
        </group>
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