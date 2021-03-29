import { Enum } from '../../Utils'

export default Enum({
    "Top": 0,
    "Bot": 1,
    "Front": 2,
    "Back": 3,
    "Left": 4,
    "Right": 5,
    GetName: (side) => {
        switch(side){
            case 0: return "Top";
            case 1: return "Bot";
            case 2: return "Front";
            case 3: return "Back";
            case 4: return "Left";
            case 5: return "Right";
            default: throw new Error("Unknown side type " + side);
        }
    }
})
