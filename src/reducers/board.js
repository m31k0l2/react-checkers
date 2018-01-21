import {UPDATE_BOARD} from '../actions/actions.js'

const initialState = []
for (let index = 0; index < 64; index++) {
  initialState.push({color: null, type: null})  
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOARD:
      return action.payload
    default:
      return state
  }
}
