import { combineReducers } from 'redux'
import markFields from './markFields'
import board from './board'
import selectField from './selectField'
import botStep from './botStep'
import animate from './animate'
import rotate from './rotate'
import player from './player'
import start from './start'

export default combineReducers({
    markFields,
    board,
    selectField,
    botStep,
    animate,
    rotate,
    player,
    start
})