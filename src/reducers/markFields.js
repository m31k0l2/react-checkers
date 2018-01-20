import { MARK_LIGHT, MARK_DARK } from '../actions/actions.js'

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case MARK_LIGHT:
            return Object.assign({}, state, {
                markedLight: action.payload
            })
        case MARK_DARK:
            return Object.assign({}, state, {
                markedDark: action.payload
            })
        default:
            return state
    }
}