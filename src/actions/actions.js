export const UPDATE_BOARD = 'UPDATE_BOARD'
export const MARK_LIGHT = 'MARK_LIGHT'
export const MARK_DARK = 'MARK_DARK'
export const SELECT_FIELD = 'SELECT_FIELD'
export const BOT_STEP = 'BOT_STEP'
export const WHITE = 'WHITE'
export const BLACK = 'BLACK'
export const CHECKER = 'CHECKER'
export const QUEEN = 'QUEEN'

export const updateBoard = (fields) => {  
  return {
    type: UPDATE_BOARD,
    payload: fields
  }
}

export function markLight(positions) {
  return {
    type: MARK_LIGHT,
    payload: positions
  }
}

export function markDark(positions) {
  return {
    type: MARK_DARK,
    payload: positions
  }
}

export function selectField(position) {
  return {
    type: SELECT_FIELD,
    payload: position
  }
}

export function setBotStep(step) {
  return {
    type: BOT_STEP,
    payload: step
  }
}