import { combineReducers } from 'redux'
import markFields from './markFields'
import board from './board'
import selectField from './selectField'

export default combineReducers({
    markFields,
    board,
    selectField
})