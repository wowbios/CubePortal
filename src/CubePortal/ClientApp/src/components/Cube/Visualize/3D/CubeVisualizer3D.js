import React, {Component, Fragment} from 'react'
import {Canvas, extend, useThree} from 'react-three-fiber'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Scene from "./Scene";

extend({OrbitControls})

export default class CubeVisualizer3D extends Component {
    render() {
        const { cube } = this.props
        
        return (
                <Canvas
                    colorManagement
                    camera={{position: [-5, 5, 5], fov: 60}}
                    shadowMap
                className={"map3d"}>
                    <color attach='background' args={["black"]} />
                    <Scene cube={cube}/>
                </Canvas>
        )
    }
}