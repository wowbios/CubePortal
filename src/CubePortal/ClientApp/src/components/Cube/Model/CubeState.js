import Side from "./Side";
import Color from "./Color";
import Rotator from "./Rotator"
import SideType from "./SideType"

export default class CubeState {
    top
    bot
    left
    right
    front
    back
    
    constructor() {
        this.top = Side.create(SideType.Top, Color.Yellow)
        this.bot = Side.create(SideType.Bot, Color.White)
        this.left = Side.create(SideType.Left, Color.Blue)
        this.right = Side.create(SideType.Right, Color.Green)
        this.front = Side.create(SideType.Front, Color.Red)
        this.back = Side.create(SideType.Back, Color.Orange)
        this.rotator = new Rotator(this)
    }
    
    rotate = (move) => this.rotator.rotate(move)
}