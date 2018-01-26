import React, { Component } from 'react'
import { connect } from 'react-redux'
import { rotateBoard, setPlayer, startGame } from '../../actions/actions'

class PlayForButton extends Component {
    constructor() {
        super()
        this.state = { color: 1 }
    }

    render() {        
        return (
            <button onClick={() => {
                this.props.rotateBoard(this.state.color === 1)
                this.props.setPlayer(this.state.color)
                this.setState({
                    color: 1 - this.state.color
                })
                this.props.startGame()
            }}>{ `Играть за ${this.state.color === 0 ? "белых" : "чёрных" }`}</button>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        rotateBoard: rotate => dispatch(rotateBoard(rotate)),
        setPlayer: color => dispatch(setPlayer(color)),
        startGame: () => dispatch(startGame(true))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(PlayForButton)