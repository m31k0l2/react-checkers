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
export const ROTATE = 'ROTATE'
export const SET_PLAYER = 'SET_PLAYER'
export const START = 'START'

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

export function setPlayer(color) {
  return {
    type: SET_PLAYER,
    payload: color
  }
}

export function stringPositionToNumber(sPos, rotate) {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  let col = letters.indexOf(sPos[0])
  let row = parseInt(sPos[1], 10)
  if (rotate) {
    col = 7 - col
    row = row - 1
  } else {
    row = 8 - row
  }
  return row * 8 + col
}

export function numberPositionToString(pos, rotate) {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  let row = Math.floor(pos / 8)
  let col = pos - row * 8
  if (rotate) {
    col = 7 - col
    row = row + 1
  } else {
    row = 8 - row
  }  
  return letters[col] + row
}

export function rotateBoard(rotate) {
  return {
    type: ROTATE,
    payload: rotate
  }
}

export function startGame(start) {
  return {
    type: START,
    payload: start
  }
}