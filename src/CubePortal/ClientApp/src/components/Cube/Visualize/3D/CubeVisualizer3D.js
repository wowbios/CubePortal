import React, {Component, Fragment} from 'react'
import {Canvas, extend, useThree} from 'react-three-fiber'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

extend({OrbitControls})

const Box = ({position, args}) => {
    return (
        <mesh position={position} castShadow>
            <boxBufferGeometry attach='geometry'/>
            <meshStandardMaterial attach='material' color={'lightblue'}/>
        </mesh>
    )
}

const Floor = () => {
    return (
        <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
            receiveShadow>
            <planeBufferGeometry attach='geometry' args={[100, 100]}/>
            <meshStandardMaterial attach='material' color={'#3d3d3d'}/>
        </mesh>
    )
}

const Scene = () => {
    const {
        camera,
        gl : { domElement }
    } = useThree()
    
    return (
        <>
            <directionalLight
                intensity={1.5}
                castShadow
                position={[0, 10, 0]}
                shadow-mapSize-width={100}
                shadow-mapSize-height={100}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            <ambientLight intensity={.7}/>
            <group>
                <Floor/>
                <Box position={[0, 1, 1]}/>
                <Box position={[0, 1, 3]}/>
            </group>
            <orbitControls args={[camera, domElement]}/>
        </>
    )
}

export default class CubeVisualizer3D extends Component {
    render() {
        return (
            <div className={"map3d"}>
                <Canvas
                    colorManagement
                    camera={{position: [-5, 5, 5], fov: 60}}
                    shadowMap>
                    <color attach='background' args={["black"]} />
                    <Scene/>
                </Canvas>
            </div>
        )
    }
}