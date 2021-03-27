import Cell from "./Cell";

export default class Side {
    cells
    type

    constructor(type, cells) {
        this.cells = cells
        this.type = type
    }

    static create(type, color){
        const cells = []
        for (let i = 0; i < 9; i++){
            cells.push(new Cell(color))
        }
        return new Side(type, cells)
    }
}