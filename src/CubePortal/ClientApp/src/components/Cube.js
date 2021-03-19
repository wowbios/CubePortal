import React, {Component} from 'react';
import Color from './Color'
import Move from './Move'
import {Clock} from "three";

const ArrayRepeat = (value, count) => {
    const array = []
    for (let i = 0; i < count; i++)
        array.push(value)
    return array
}

class Cell {
    color
    
    constructor(color) {
        this.color = color
    }
}

class Side {
    cells
    name
    
    constructor(name, cells) {
        this.cells = cells
        this.name = name
    }
    
    static create(name, color){
        const cells = []
        for (let i = 0; i < 9; i++){
            cells.push(new Cell(color))
        }
        return new Side(name, cells)
    }
}

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

    renderCell(key, { color }) {
        return (
            <div className={"cell " + Color.GetCssName(color)} key={key}>{key}</div>
        )
    }
    
    renderCells(side, ind) {
        return ind.map(i => this.renderCell(side.name + "-" + i, side.cells[i]))
    }
    
    renderEmpty(num) {
        const keyPart = "Empty" + num
        return ArrayRepeat(Color.Empty, 3)
            .map((c, i) => this.renderCell(keyPart + i, new Cell(c)))
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
                
        return (
            <div>
                <div className={"split"}>
                {this.renderEmpty(0)}
                {this.renderCells(top, [0,1,2])}
                {this.renderEmpty(1)}
                {this.renderEmpty(2)}
                </div>
                <div className={"split"}>
                {this.renderEmpty(3)}
                {this.renderCells(top, [3,4,5])}
                {this.renderEmpty(4)}
                {this.renderEmpty(5)}
                </div>
                <div className={"split"}>
                {this.renderEmpty(6)}
                {this.renderCells(top, [6,7,8])}
                {this.renderEmpty(7)}
                {this.renderEmpty(8)}
                </div>

                <div className={"split"}>
                {this.renderCells(left, [0,1,2])}
                {this.renderCells(front, [0,1,2])}
                {this.renderCells(right, [0,1,2])}
                {this.renderCells(back, [0,1,2])}
                </div>
                <div className={"split"}>
                {this.renderCells(left, [3,4,5])}
                {this.renderCells(front, [3,4,5])}
                {this.renderCells(right, [3,4,5])}
                {this.renderCells(back, [3,4,5])}
                </div>
                <div className={"split"}>
                {this.renderCells(left, [6,7,8])}
                {this.renderCells(front, [6,7,8])}
                {this.renderCells(right, [6,7,8])}
                {this.renderCells(back, [6,7,8])}
                </div>

                <div className={"split"}>
                    {this.renderEmpty(15)}
                    {this.renderCells(bot,[6,7,8])}
                    {this.renderEmpty(16)}
                    {this.renderEmpty(17)}
                </div>
                <div className={"split"}>
                    {this.renderEmpty(12)}
                    {this.renderCells(bot, [3,4,5])}
                    {this.renderEmpty(13)}
                    {this.renderEmpty(14)}
                </div>
                <div className={"split"}>
                {this.renderEmpty(9)}
                {this.renderCells(bot, [0,1,2])}
                {this.renderEmpty(10)}
                {this.renderEmpty(11)}
                </div>
                
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