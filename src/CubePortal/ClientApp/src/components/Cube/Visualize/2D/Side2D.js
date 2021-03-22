import React from 'react';
import Cell2D from "./Cell2D";

const Side2D = ({name, cells, isEmpty}) => {
    const renderedCell = []
    for (let i = 0; i < 9; i++)
        if (isEmpty) {
            renderedCell.push((<Cell2D key={i}/>))
        } else {
            const cell = cells[i]
            renderedCell.push(
                (
                    <Cell2D key={name + " " + i} color={cell.color} value={i}/>
                )
            )
        }

    return (
        <div className={"side"}>
            {renderedCell}
        </div>
    )
}

export default Side2D