import React, {Component} from 'react';
import Color from './Cube/Model/Color';
import Side2D from "./Cube/Visualize/2D/Side2D";
import Side from "./Cube/Model/Side";
import Rotator from "./Cube/Model/Rotator"

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
        
        const sides = {
            top,
            bot,
            left,
            right,
            front,
            back
        }
        
        const rotator = new Rotator(sides)
        rotator.rotate(move)

        this.setState(sides)
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
            <div className={"map2d"}>
                { rows.map(renderRow) }
            </div>
        )
    }
}