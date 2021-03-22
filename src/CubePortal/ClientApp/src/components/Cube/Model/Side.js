import Cell from "./Cell";

export default class Side {
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