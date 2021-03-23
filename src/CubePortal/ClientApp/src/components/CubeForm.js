import React, { Component } from 'react'
import Cube from './Cube/Cube'
import Move from './Cube/Model/Move'

export default class CubeForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            cubeRef: React.createRef()
        }
        
        this.rotate = this.rotate.bind(this)
    }
        
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