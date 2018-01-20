import React, { Component } from 'react'
import { connect } from 'react-redux'
import Board from '../components/board/board'
import {
    setChecker, markLight, markDark,
    WHITE, BLACK, CHECKER, QUEEN
} from '../actions/actions'

class Controller extends Component {  
    componentDidMount() {
        const whiteCheckers = [40, 42, 44, 46, 49, 51, 53, 55, 56, 58, 60, 62]
        const blackCheckers = [1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23]
        whiteCheckers.forEach(pos => this.props.setChecker(pos, WHITE, CHECKER))
        blackCheckers.forEach(pos => this.props.setChecker(pos, BLACK, CHECKER))    
        
        this.props.markLight([44, 46])
        this.props.markDark([42])        
    }

    render() {
        return <Board />
    }
}

const mapStateToProps = state => {
    return {
        fields: state.board,
        markedDark: state.markFields.markedDark,
        markedLight: state.markFields.markedLight
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