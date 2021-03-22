import { Enum } from '../../Utils'

export default Enum({
    "Red": 0,
    "Green": 1,
    "Orange": 2,
    "Blue": 3,
    "White": 4,
    "Yellow": 5,
    "Empty": 6,
    GetCssName: (value) => {
        switch (value) {
            case 0: return "red"
            case 1: return "green"
            case 2: return "orange"
            case 3: return "blue"
            case 4: return "white"
            case 5: return "yellow"
            default:  return "grey"
        }
    }
})
