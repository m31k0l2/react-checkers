import { combineReducers } from 'redux'
import markFields from './markFields'
import board from './board'
import selectField from './selectField'
import botStep from './botStep'

export default combineReducers({
    markFields,
    board,
    selectField,
    botStep
})