export const UPDATE_BOARD = 'UPDATE_BOARD'
export const MARK_LIGHT = 'MARK_LIGHT'
export const MARK_DARK = 'MARK_DARK'
export const SELECT_FIELD = 'SELECT_FIELD'
export const ANIMATE = 'ANIMATE'
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

export function animate(positions) {
  return {
    type: ANIMATE,
    payload: positions
  }
}

export function stringPositionToNumber(sPos) {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const col = letters.indexOf(sPos[0])
  const row = parseInt(8 - sPos[1], 10)
  return row * 8 + col
}

export function numberPositionToString(pos) {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const r = Math.floor(pos / 8)
  const row = 8 - r
  const col = pos - r * 8
  return letters[col] + row
}