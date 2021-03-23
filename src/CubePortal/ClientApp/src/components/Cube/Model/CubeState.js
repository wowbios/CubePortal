import Side from "./Side";
import Color from "./Color";
import Rotator from "./Rotator";

export default class CubeState {
    top
    bot
    left
    right
    front
    back
    
    constructor() {
        this.top = Side.create("Top", Color.Yellow)
        this.bot = Side.create("Bot", Color.White)
        this.left = Side.create("Left", Color.Blue)
        this.right = Side.create("Right", Color.Green)
        this.front = Side.create("Front", Color.Red)
        this.back = Side.create("Back", Color.Orange)
        this.rotator = new Rotator(this)
    }
    
    rotate = (move) => this.rotator.rotate(move)
}