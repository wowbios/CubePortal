import Move from "./Move";
import {ArrayRepeat} from "../../Utils";

class Movement {
    side
    clockwise
    neighbors
    indexes

    constructor(side, clockwise, neighbors, indexes) {
        this.side = side
        this.clockwise = clockwise
        this.neighbors = neighbors
        this.indexes = indexes
    }

    inverse = () => new Movement(
        this.side,
        !this.clockwise,
        this.neighbors.slice().reverse(),
        this.indexes.map(i => i.slice().reverse())
    )
}

export default class Rotator {
    constructor(sides) {
        const {
            top,
            left,
            front,
            right,
            back,
            bot
        } = sides
        
        this[Move.R] = new Movement(
            right,
            true,
            [bot, back, top, front],
            [
                [2, 6, 2, 2],
                [5, 3, 5, 5],
                [8, 0, 8, 8]
            ])
        this[Move.R_] = this[Move.R].inverse()
        
        this[Move.L] = new Movement(
            left,
            true,
            [front, top, back, bot],
            [
                [0, 0, 8, 0],
                [3, 3, 5, 3],
                [6, 6, 2, 6]
            ]
        )
        this[Move.L_] = this[Move.L].inverse()
        
        this[Move.F] = new Movement(
            front,
            true,
            [left, bot, right, top],
            [
                [2, 0, 6, 8],
                [5, 1, 3, 7],
                [8, 2, 0, 6]
            ]
        )
        this[Move.F_] = this[Move.F].inverse()
        
        this[Move.B] = new Movement(
            back,
            true,
            [top, right, bot, left],
            [
                [2, 8, 6, 0],
                [1, 5, 7, 3],
                [0, 2, 8, 6]
            ]
        )
        this[Move.B_] = this[Move.B].inverse()
        
        this[Move.U] = new Movement(
            top,
            true,
            [right, back, left, front],
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [2, 2, 2, 2]
            ]
        )
        this[Move.U_] = this[Move.U].inverse()
        
        this[Move.D] = new Movement(
            bot,
            true,
            [front, left, back, right],
            [
                [6, 6, 6, 6],
                [7, 7, 7, 7],
                [8, 8, 8, 8]
            ]
        )
        this[Move.D_] = this[Move.D].inverse()
    }
    
    rotate(move) {
        if (!this.hasOwnProperty(move))
            throw new Error("Unknown move: " + move)

        Rotator.rotateCube(this[move])
    }

    static rotateCube({side, clockwise, neighbors, indexes}) {
        Rotator.rotateSide(side, clockwise)
        indexes.forEach(neighborIndex => Rotator.swap(neighbors, neighborIndex))
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

    static rotateSide = (side, clockwise) => {
        const sides = ArrayRepeat(side, 4)
        const edges = [3, 7, 5, 1]
        const corners = [6, 8, 2, 0]
        Rotator.swap(
            sides,
            clockwise ? edges : edges.reverse()
        )
        Rotator.swap(
            sides,
            clockwise ? corners : corners.reverse()
        )
    }
}