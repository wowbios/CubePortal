import React from "react";
import Color from '../../Model/Color'
import Cell3D from "./Cell3D";

const transpose = (type, position) => {
    
    return position
}

const Side3D = ({side: {cells, type}}) => {
    const renderedCells = []
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) {
            const position = transpose(type, [0, i, j])
            const rotation = [0, -Math.PI / 2, 0]
            const cell = cells[3 * i + j]
            const color = Color.GetCssName(cell.color)
            renderedCells.push(
                (<Cell3D position={position} color={color} rotation={rotation}/>)
            )
        }

    return (
        <group>
            {renderedCells}
        </group>
    )
}

export default Side3D