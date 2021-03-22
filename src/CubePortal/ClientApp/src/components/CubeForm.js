import React, { Component } from 'react'
// import * as THREE from 'three'
import Cube from './Cube'
import Move from './Cube/Model/Move'

export default class CubeForm extends Component {
    constructor(props) {
        super(props);

        // const scene = new THREE.Scene();
        // const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        // const renderer = new THREE.WebGLRenderer();
        // const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        // const cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);
        // camera.position.z = 5;
        //
        // this.state = {
        //     scene, 
        //     camera,
        //     renderer,
        //     cube,
        //     rootRef: React.createRef()
        // }
        
        this.state = {
            cubeRef: React.createRef()
        }
        
        this.rotate = this.rotate.bind(this)
    }
    
    // animate(){
    //     const {
    //         cube,
    //         renderer,
    //         scene,
    //         camera,
    //     } = this.state
    //    
    //     const tempState = {
    //         cube,
    //         renderer,
    //         scene,
    //         camera,
    //     }
    //
    //     requestAnimationFrame(((tempState) => {
    //         const {
    //             cube,
    //             renderer,
    //             scene,
    //             camera,
    //         } = tempState
    //        
    //         // cube.rotation.x += 0.01;
    //         // cube.rotation.y += 0.01;
    //         renderer.render(scene, camera);            
    //     }).bind(null, tempState));
    // }
    //
    // componentDidMount() {
    //     const {
    //         renderer,
    //         rootRef : {
    //             current: root
    //         }
    //     } = this.state
    //
    //     renderer.setSize(500, 500);
    //     root.appendChild(renderer.domElement)
    //    
    //     setInterval(this.animate.bind(this), 10);
    // }
    
    rotate(move) {
        const {
            cubeRef : {
                current : cube
            }
        } = this.state

        cube.rotate(move)
    }

    render() {
        const {
            cubeRef
        } = this.state
        
        return (
            // <div id="three" ref={rootRef}/>
            <div>
                <Cube ref={cubeRef} />
                <button onClick={() => this.rotate(Move.R)}>R</button>
                <button onClick={() => this.rotate(Move.R_)}>R'</button>
                <button onClick={() => this.rotate(Move.L)}>L</button>
                <button onClick={() => this.rotate(Move.L_)}>L'</button>
                <button onClick={() => this.rotate(Move.F)}>F</button>
                <button onClick={() => this.rotate(Move.F_)}>F'</button>
                <button onClick={() => this.rotate(Move.U)}>U</button>
                <button onClick={() => this.rotate(Move.U_)}>U'</button>
                <button onClick={() => this.rotate(Move.B)}>B</button>
                <button onClick={() => this.rotate(Move.B_)}>B'</button>
                <button onClick={() => this.rotate(Move.D)}>D</button>
                <button onClick={() => this.rotate(Move.D_)}>D'</button>
            </div>
        )
    }
}