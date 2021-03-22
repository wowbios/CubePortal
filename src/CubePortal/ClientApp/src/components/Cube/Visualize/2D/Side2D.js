import React from 'react';
import Cell2D from "./Cell2D";

const Side2D = ({name, cells, isEmpty}) => {
    const emptyCell = (i) => {
        const key = i.toString()
        return (
            <Cell2D key value={key}/>
        )
    }
    
    const renderedCell = []
    if (isEmpty) {
        for (let i=0;i<9;i++)
            renderedCell.push(emptyCell(i))
    }
    else {
        for (let i=0;i<9;i++)
        {
            const cell = cells[i]
            renderedCell.push(
                (
                    <Cell2D key={name + " " + i} color={cell.color} value={i}/>
                )
            )
        }
    }

    return (
        <div className={"side"}>
            {renderedCell}
        </div>
    )
}

export default Side2D