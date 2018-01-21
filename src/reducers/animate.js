import { ANIMATE } from '../actions/actions.js'

export default (state = null, action) => {
    switch (action.type) {
        case ANIMATE:
            return action.payload
        default:
            return state
    }
}