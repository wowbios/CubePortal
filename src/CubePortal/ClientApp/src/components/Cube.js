import React, {Component} from 'react';
import Color from './Cube/Model/Color'
import Move from './Cube/Model/Move'
import Side2D from "./Cube/Visualize/2D/Side2D";
import Side from "./Cube/Model/Side";
import {ArrayRepeat} from "./Utils";

export default class Cube extends Component
{    
    constructor(props) {
        super(props)
        
        this.state = {
            top: Side.create("Top", Color.Yellow),
            bot: Side.create("Bot", Color.White),
            left: Side.create("Left", Color.Blue),
            right: Side.create("Right", Color.Green),
            front: Side.create("Front", Color.Red),
            back: Side.create("Back", Color.Orange),
        }
    }
    
    rotate(move) {
        const {
            top,
            bot,
            left,
            right,
            front,
            back
        } = this.state
        
        const rotationMap = {}
        rotationMap[Move.R] = [right, true, [bot,back,top,front], [[2,2,2,2], [5,5,5,5], [8,8,8,8]]]
        rotationMap[Move.R_] = [right, false, [bot,back,top,front].reverse(), [[2,2,2,2], [5,5,5,5], [8,8,8,8]]]
        rotationMap[Move.L] = [left, true, [bot,back,top,front], [[0,0,0,0], [3,3,3,3], [6,6,6,6]]]
        rotationMap[Move.L_] = [left, false, [bot,back,top,front].reverse(), [[0,0,0,0], [3,3,3,3], [6,6,6,6]]]
        rotationMap[Move.F] = [front, true, [top, right, bot, left], [[6,0,8,8], [7,3,7,5], [8,6,6,2]]]
        rotationMap[Move.F_] = [front, false, [top, right, bot, left].reverse(), [[6,0,8,8], [7,3,7,5], [8,6,6,2]]]
        
        // 012
        // 3 5
        // 678
        
        if (!rotationMap.hasOwnProperty(move))
            throw new Error("Unknown move: " + move)
        
        this.rotateCube(...rotationMap[move])

        this.setState({
            top,
            bot,
            left,
            right,
            front,
            back
        })
    }

    rotateCube(side, clockwise, neighbors, neighborIndexes) {
        Cube.rotateSide(side, clockwise)
        neighborIndexes.forEach(
            neighborIndex => Cube.swap(neighbors, neighborIndex))
    }
        
    render() {
        const {
            top,
            bot,
            left,
            right,
            front,
            back
        } = this.state

        const rows = [
            [null, top, null, null],
            [left, front, right, back],
            [null, bot, null, null]
        ]
        
        const renderRow = (row) => (
                <div className={"split"}>
                    {row.map(r => 
                    r == null
                    ? <Side2D isEmpty />
                    : <Side2D {...r} />)}
                </div>
            )
        
        return (
            <div>
                {
                    rows.map(renderRow)
                }
            </div>
        )
    }

    static swap = (sides, indexes) => {
        let temp;
        for (let i = 0; i < sides.length; i++) {
            const side = sides[i]
            const cellIndex = indexes[i]
            
            switch (i) {
                case 0:
                    temp = side.cells[cellIndex]
                    break;
                case sides.length - 1:
                    const prevSide1 = sides[i - 1]
                    const prevSideCell1 = indexes[i - 1]
                    prevSide1.cells[prevSideCell1] = side.cells[cellIndex]
                    side.cells[cellIndex] = temp
                    break;
                default:
                    const prevSide = sides[i - 1]
                    const prevSideCell = indexes[i - 1]
                    prevSide.cells[prevSideCell] = side.cells[cellIndex]
                    break;
            }
        }
    }

    static oneSideSwap = (side, i1, i2) => Cube.swap([side, side], [i1, i2])
    
    static rotateSide = (side, clockwise) => {
        console.log("rotating side ", side)
        const sides = ArrayRepeat(side, 4)
        const rebra = [0,2,8,6]
        const corners = [1,5,7,3]
        Cube.swap(
            sides,
            clockwise ? rebra : rebra.reverse()
        )
        Cube.swap(
            sides,
            clockwise ? corners : corners.reverse()
        )
    }
}