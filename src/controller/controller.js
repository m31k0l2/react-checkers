import React, { Component } from 'react'
import { connect } from 'react-redux'
import Board from '../components/board/board'
import {
    updateBoard, markLight, markDark, setBotStep, selectField, animate, stringPositionToNumber, numberPositionToString,
    WHITE, BLACK, CHECKER, QUEEN
} from '../actions/actions'
import { GameController } from 'checkers/checkers'
import delay from 'delay'

class Controller extends Component {  
    constructor() {
        super()
        this.go = this.go.bind(this)
        this.nextMoves = this.nextMoves.bind(this)
        this.updateBoard = this.updateBoard.bind(this)
        this.playerColor = 0
        this.goBot = this.goBot.bind(this)
    }

    componentDidMount() {        
        this.game = new GameController()
        this.game.currentColor = 0
        this.updateBoard()
        this.nextMoves()
    }

    updateBoard(points=null) {
        if (points) {
            this.props.animate(points.map(it => stringPositionToNumber(it)))
        } else {
            this.props.animate(null)
        }
        this.props.updateBoard(this.placeCheckers(this.game.getWhiteCheckers(), this.game.getBlackCheckers(), this.game.getQueens()))
    }    

    nextMoves() {
        this.moves = this.game.nextMoves()
        const activeFields = this.game.extractActiveFields(this.moves)
        const activeFieldsPositions = activeFields.map(it => stringPositionToNumber(it))
        this.props.markLight(activeFieldsPositions)
    }

    componentWillReceiveProps(props) {
        const { selectedField, markedLight, markedDark, botStep } = props
        if ((!markedDark || markedDark.indexOf(selectedField) === -1) && markedLight.indexOf(selectedField) > -1) {    
            this.from = selectedField        
            const next = this.game.getCheckerMoveFields(this.moves, numberPositionToString(selectedField))
            this.props.markDark([selectedField, ...next.map(it => stringPositionToNumber(it))])
        } else if (markedDark && markedLight.indexOf(selectedField) === -1 && markedDark.indexOf(selectedField) > -1) {
            this.go(numberPositionToString(this.from), numberPositionToString(selectedField));            
        } else if (botStep) {
            const points = this.game.getStepPoints(botStep)
            this.game.go(botStep)
            this.props.setBotStep(null)
            this.game.currentColor = 1 - this.game.currentColor  
            this.updateBoard()   
            this.nextMoves()
        }
    }

    placeCheckers(whiteCheckers, blackCheckers, queens) {
        const fields = []
        for (let pos = 0; pos < 64; pos++) {
            let color = null
            let type = null
            const sPos = numberPositionToString(pos)
            if (whiteCheckers.indexOf(sPos) > -1) {
                color = WHITE
                if (queens.indexOf(sPos) > -1) {
                    type = QUEEN
                } else {
                    type = CHECKER
                }
            } else if (blackCheckers.indexOf(sPos) > -1) {
                color = BLACK
                if (queens.indexOf(sPos) > -1) {
                    type = QUEEN
                } else {
                    type = CHECKER
                }
            }
            fields.push({ color: color, type: type })
        }
        return fields
    }
    

    go(from, to) {
        const command = this.game.getCommand(this.moves, from, to)
        const points = this.game.getStepPoints(command)
        this.updateBoard(points)
        // this.game.go(command)
        this.from = null
        this.props.markDark([])
        this.props.markLight([])
        this.props.clearSelection()
        delay(1000).then(() => {
            this.game.go(command)
            this.updateBoard()
            this.game.currentColor = 1 - this.game.currentColor   
            if (this.game.currentColor === this.playerColor) {
                this.nextMoves()
            } else {
                this.goBot()
            }
        });
    }

    goBot() {
        const worker = new Worker("worker.js")
        worker.postMessage({
            white: this.game.getWhiteCheckers(),
            black: this.game.getBlackCheckers(),
            queens: this.game.getQueens(),
            color: this.game.currentColor
        });
        worker.onmessage = (e) => {
            this.props.setBotStep(e.data)
            worker.terminate()
        }
    }

    render() {
        return <Board />
    }
}

const mapStateToProps = state => {
    return {
        fields: state.board,
        markedDark: state.markFields.markedDark,
        markedLight: state.markFields.markedLight,
        selectedField: state.selectField,
        botStep: state.botStep
    }
}

const mapDispatchToProps = dispatch => {
    return {
        markLight: positions => dispatch(markLight(positions)),
        markDark: positions => dispatch(markDark(positions)),
        updateBoard: fields => dispatch(updateBoard(fields)),
        setBotStep: step => dispatch(setBotStep(step)),
        clearSelection: () => dispatch(selectField(null)),
        animate: points => dispatch(animate(points))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Controller)