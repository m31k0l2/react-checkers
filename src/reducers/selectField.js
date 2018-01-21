import { SELECT_FIELD } from '../actions/actions.js'

export default (state=-1, action) => {
    switch (action.type) {
        case SELECT_FIELD:
            return action.payload
        default:
            return state
    }
}