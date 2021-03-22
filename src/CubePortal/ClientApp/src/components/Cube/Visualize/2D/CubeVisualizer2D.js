import React from 'react';
import Side2D from "./Side2D";

const CubeVisualizer2D = ({sides}) => (
    <div>
        { sides.map(side => <Side2D {...side} />) }
    </div>
)

export default CubeVisualizer2D