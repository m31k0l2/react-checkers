importScripts('kotlin.js', 'checkers.js')

onmessage = function(e) {
  const {white, black, queens, color} = e.data
  //const controller = new output.GameController(game.board)
  // const currentColor = game.currentColor
  // controller.print()
  const game = new checkers.GameController()
  game.init(white, black, queens)
  game.currentColor = color
  const step = game.getBotStep()
  postMessage(step);
}
