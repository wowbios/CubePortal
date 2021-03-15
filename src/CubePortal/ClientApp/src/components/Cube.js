import React, { Component } from 'react'
import * as THREE from 'three'

export default class Cube extends Component {
    constructor(props) {
        super(props);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        camera.position.z = 5;
        
        this.state = {
            scene, 
            camera,
            renderer,
            cube,
            rootRef: React.createRef()
        }
    }
    
    componentDidMount() {
        const {
            cube,
            renderer,
            scene, 
            camera,
            rootRef : {
                current: root
            }
        } = this.state

        renderer.setSize(500, 500);
        root.appendChild(renderer.domElement)
        
        const animate = function () {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();
    }

    render() {
        const { rootRef } = this.state
        
        return (
            <div id="threejs" ref={rootRef}/>
        )
    }
}