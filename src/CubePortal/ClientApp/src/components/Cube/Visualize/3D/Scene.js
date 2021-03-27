import {useThree} from "react-three-fiber";
import React from "react";
import Floor from "./Floor";
import Cube3D from "./Cube3D";

const Scene = ({cube}) => {
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
                <Cube3D cube={cube}/>
            </group>
            <orbitControls args={[camera, domElement]}/>
        </>
    )
}

export default Scene