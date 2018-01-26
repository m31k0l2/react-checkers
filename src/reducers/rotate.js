import { ROTATE } from '../actions/actions.js'

export default (state = false, action) => {
    switch (action.type) {
        case ROTATE:
            return action.payload
        default:
            return state
    }
}