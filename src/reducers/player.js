import { SET_PLAYER } from '../actions/actions.js'

export default (state = 0, action) => {
    switch (action.type) {
        case SET_PLAYER:
            return action.payload
        default:
            return state
    }
}