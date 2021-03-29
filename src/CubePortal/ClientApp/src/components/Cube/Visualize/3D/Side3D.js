import React from "react";
import Color from '../../Model/Color'
import Cell3D from "./Cell3D";
import SideType from '../../Model/SideType'

const getRotation = (type) => {
    const pi = Math.PI
    switch (type) {
        case SideType.Top:
            return [0, 0, pi / 2];
        case SideType.Bot:
            return [-pi, pi, pi / 2];
        case SideType.Left:
            return [0, -pi / 2, pi];
        case SideType.Right:
            return [0, pi / 2, pi];
        case SideType.Front:
            return [0, 0, pi];
        case SideType.Back:
            return [0, pi, pi];
        default: throw new Error("Unknown side type " + type)
    }
}

const getPosition = (type, position) => {
    const modify = ([z,x,y]) => [
        position[0] + z,
        position[1] + x,
        position[2] + y
    ]
    
    switch (type) {
        case SideType.Top: return modify([4, -2, 0]);
        case SideType.Bot: return modify([0, 0, 0]);
        case SideType.Left: return modify([1, -3, -2]);
        case SideType.Right: return modify([3, -3, 0]);
        case SideType.Front: return modify([1, -3, 0]);
        case SideType.Back: return modify([3, -3, -2]);
        default: throw new Error("Unknown side type " + type)
    }
}

const Side3D = ({side: {cells, type}}) => {
    const renderedCells = []
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) {
            const position = getPosition(type, [0, i, j])
            const rotation = [0, Math.PI / 2, 0]
            const cellIndex = 3 * i + j
            const cell = cells[cellIndex]
            const color = Color.GetCssName(cell.color)
            const key = `${SideType.GetName(type)}_${cellIndex}`
            renderedCells.push(
                (<Cell3D position={position} color={color} rotation={rotation} name={key} key={key}/>)
            )
        }
    
    const rotation = getRotation(type)

    return (
        <group rotation={rotation}>
            {renderedCells}
        </group>
    )
}

export default Side3D