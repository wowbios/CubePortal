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
            back: Side.create("Back", Color.Orange)
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
        
        const makeMove = (side, clockwise, neighbors, indexes) => {
            return {
                side,
                clockwise,
                neighbors,
                indexes
            }
        }
        
        const inverseMove = ({clockwise, neighbors, indexes, ...rest}) => {
            return {
                clockwise: !clockwise,
                neighbors: neighbors.slice().reverse(),
                indexes: indexes.map(x => x.slice().reverse()),
                ...rest
            }
        }
        
        const rotationMap = {}
        
        rotationMap[Move.R] = makeMove(
            right,
            true,
            [bot, back, top, front],
            [
                [2, 6, 2, 2],
                [5, 3, 5, 5],
                [8, 0, 8, 8]
            ])
        rotationMap[Move.R_] = inverseMove(rotationMap[Move.R])
        console.log(rotationMap)

        rotationMap[Move.L] = makeMove(
            left,
            true,
            [front, top, back, bot],
            [
                [0, 0, 8, 0],
                [3, 3, 5, 3],
                [6, 6, 2, 6]
            ]
        )
        rotationMap[Move.L_] = inverseMove(rotationMap[Move.L])

        rotationMap[Move.F] = makeMove(
            front,
            true,
            [left, bot, right, top],
            [
                [2, 0, 6, 8],
                [5, 1, 3, 7],
                [8, 2, 0, 6]
            ]
        )
        rotationMap[Move.F_] = inverseMove(rotationMap[Move.F])

        rotationMap[Move.B] = makeMove(
            back,
            true,
            [top, right, bot, left],
            [
                [2, 8, 6, 0],
                [1, 5, 7, 3],
                [0, 2, 8, 6]
            ]
        )
        rotationMap[Move.B_] = inverseMove(rotationMap[Move.B])

        rotationMap[Move.U] = makeMove(
            top,
            true,
            [right, back, left, front],
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [2, 2, 2, 2]
            ]
        )
        rotationMap[Move.U_] = inverseMove(rotationMap[Move.U])

        rotationMap[Move.D] = makeMove(
            bot,
            true,
            [front, left, back, right],
            [
                [6, 6, 6, 6],
                [7, 7, 7, 7],
                [8, 8, 8, 8]
            ]
        )
        rotationMap[Move.D_] = inverseMove(rotationMap[Move.D])
        
        if (!rotationMap.hasOwnProperty(move))
            throw new Error("Unknown move: " + move)
        
        Cube.rotateCube(rotationMap[move])

        this.setState({
            top,
            bot,
            left,
            right,
            front,
            back
        })
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
        
        const renderRow = (row, index) => (
                <div className={"split"} key={"Row" + index.toString()}>
                    {
                        row.map((side, i) => {
                            const key = "Side" + i.toString()
                            return side == null
                                ? <Side2D isEmpty key={key} />
                                : <Side2D {...side} key={key} />
                        })                            
                    }
                </div>
            )
        
        return (
            <div>
                { rows.map(renderRow) }
            </div>
        )
    }

    static rotateCube({side, clockwise, neighbors, indexes}) {
        Cube.rotateSide(side, clockwise)
        indexes.forEach(
            neighborIndex => Cube.swap(neighbors, neighborIndex))
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
        const sides = ArrayRepeat(side, 4)
        const edges = [3, 7, 5, 1]
        const corners = [6, 8, 2, 0]
        Cube.swap(
            sides,
            clockwise ? edges : edges.reverse()
        )
        Cube.swap(
            sides,
            clockwise ? corners : corners.reverse()
        )
    }
}