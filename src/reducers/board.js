import {UPDATE_BOARD} from '../actions/actions.js'

const initialState = []
for (let index = 0; index < 64; index++) {
  initialState.push({color: null, type: null})  
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOARD:
      const { position, item } = action.payload  
      console.log(position, item);
      
      let fields = state.map((obj, index) => {
        if (index !== position) return obj
        return item
      })     
      return fields
    default:
      return state
  }
}
