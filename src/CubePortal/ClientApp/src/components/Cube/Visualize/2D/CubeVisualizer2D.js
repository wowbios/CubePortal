import React from 'react';
import Side2D from "./Side2D";

const CubeVisualizer2D = ({cube}) => {
    const renderRow = (row, index) => {
        return (
            <div className={"split"} key={"Row" + index.toString()}>
                {
                    row.map((side, i) => {
                        const key = "Side" + i.toString()
                        return side == null
                            ? <Side2D isEmpty key={key}/>
                            : <Side2D {...side} key={key}/>
                    })
                }
            </div>
        )
    }
    
    const {
        top,
        bot,
        left,
        right,
        front,
        back
    } = cube

    const rows = [
        [null, top, null, null],
        [left, front, right, back],
        [null, bot, null, null]
    ]

    return (
        <div className={"map2d"}>
            {rows.map(renderRow)}
        </div>
    )
}

export default CubeVisualizer2D