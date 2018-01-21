import { BOT_STEP } from '../actions/actions.js'

export default (state = null, action) => {
    switch (action.type) {
        case BOT_STEP:
            return action.payload
        default:
            return state
    }
}