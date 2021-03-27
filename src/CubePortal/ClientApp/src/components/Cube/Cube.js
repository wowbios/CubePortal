import React, {Component} from 'react';
import CubeVisualizer2D from "./Visualize/2D/CubeVisualizer2D";
import CubeVisualizer3D from "./Visualize/3D/CubeVisualizer3D";
import CubeState from "./Model/CubeState";

export default class Cube extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cube: new CubeState()
        }
    }

    rotate(move) {
        const {
            cube
        } = this.state

        cube.rotate(move)
        this.setState({cube})
    }

    render() {
        const {
            cube
        } = this.state

        return (
            <>
                <CubeVisualizer3D cube={cube}/>
                {/*<CubeVisualizer2D cube={cube}/>*/}
            </>
        )
    }
}