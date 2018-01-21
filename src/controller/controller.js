import React, { Component } from 'react'
import { connect } from 'react-redux'
import Board from '../components/board/board'
import {
    setChecker, markLight, markDark,
    WHITE, BLACK, CHECKER, QUEEN
} from '../actions/actions'
import { GameController } from 'checkers/checkers'

class Controller extends Component {  
    componentDidMount() {
        const whiteCheckers = [40, 42, 44, 46, 49, 51, 53, 55, 56, 58, 60, 62]
        const blackCheckers = [1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23]
        whiteCheckers.forEach(pos => this.props.setChecker(pos, WHITE, CHECKER))
        blackCheckers.forEach(pos => this.props.setChecker(pos, BLACK, CHECKER))  
        
        this.game = new GameController()
        this.game.currentColor = 0
        this.nextMoves.bind(this)()
    }

    stringPositionToNumber(sPos) {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        const col = letters.indexOf(sPos[0])
        const row = parseInt(8 - sPos[1], 10)
        return row * 8 + col
    }

    numberPositionToString(pos) {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        const r = Math.floor(pos / 8)
        const row = 8 - r
        const col = pos - r * 8
        return letters[col] + row
    }

    nextMoves() {
        this.moves = this.game.nextMoves()
        const activeFields = this.game.extractActiveFields(this.moves)
        const activeFieldsPositions = activeFields.map(it => this.stringPositionToNumber(it))
        this.props.markLight(activeFieldsPositions)
    }

    componentWillReceiveProps(props) {
        const { selectedField, markedLight, markedDark } = props
        if ((!markedDark || markedDark.indexOf(selectedField) === -1) && markedLight.indexOf(selectedField) > -1) {    
            this.from = selectedField        
            const next = this.game.getCheckerMoveFields(this.moves, this.numberPositionToString(selectedField))
            this.props.markDark([selectedField, ...next.map(it => this.stringPositionToNumber(it))])
        } else if (markedDark && markedLight.indexOf(selectedField) === -1 && markedDark.indexOf(selectedField) > -1) {
            console.log("move from ", this.numberPositionToString(this.from), "to", this.numberPositionToString(selectedField));            
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
        selectedField: state.selectField
    }
}

const mapDispatchToProps = dispatch => {
    return {
        markLight: positions => {
            dispatch(markLight(positions))
        },
        markDark: positions => {
            dispatch(markDark(positions))
        },
        setChecker: (position, color, type) => {
            dispatch(setChecker(position, color, type))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Controller)