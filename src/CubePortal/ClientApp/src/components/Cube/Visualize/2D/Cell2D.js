import React from 'react';
import Color from "../../Model/Color";

const Cell2D = ({color, value}) => {
    return (
        <div className={"cell " + Color.GetCssName(color)}>
            {value}
        </div>
    )
}

export default Cell2D
