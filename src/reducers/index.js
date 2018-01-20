import { combineReducers } from 'redux'
import markFields from './markFields'
import board from './board'

export default combineReducers({
    markFields,
    board
})