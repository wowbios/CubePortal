import React, {Component} from 'react';
import Rotator from "./Cube/Model/Rotator"
import CubeVisualizer2D from "./Cube/Visualize/2D/CubeVisualizer2D";
import CubeState from "./Cube/Model/CubeState";

export default class Cube extends Component
{    
    constructor(props) {
        super(props)
        
        const cube = new CubeState()
        this.state = {
            cube,
            rotator: new Rotator(cube)
        }
    }
    
    rotate(move) {        
        const {
            cube,
            rotator
        } = this.state
        
        rotator.rotate(move)
        this.setState({ cube })
    }

    render() {        
        const {
            cube
        } = this.state
        
        return (
            <CubeVisualizer2D cube={cube} />
        )
    }
}