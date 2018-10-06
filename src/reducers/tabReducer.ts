interface IActionTypes {
    type: string
    payload: any
}

export default function (state: any= {}, action: IActionTypes) {
    switch(action.type) {
        case `CHANGE_TAB`:
            return action.payload
        default: 
            return state
    }
}