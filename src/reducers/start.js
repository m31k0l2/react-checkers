import { START } from '../actions/actions.js'

export default (state = false, action) => {
    switch (action.type) {
        case START:
            return action.payload
        default:
            return state
    }
}