import React, { Component } from 'react'
import { connect } from 'react-redux'
import './board.css'
import { WHITE, QUEEN, selectField } from '../../actions/actions'

class Field extends Component {
    render() {
        const { selected, checkerInfo } = this.props
        if (checkerInfo.type) {
            if (checkerInfo.color === WHITE) {
                this.checker = "white checker"     
                if (checkerInfo.type === QUEEN) {
                    this.checker += " whiteQueen"
                }           
            }
            else {
                this.checker = "black checker"
                if (checkerInfo.type === QUEEN) {
                    this.checker += " blackQueen"
                }
            }            
        } else {
            this.checker = ""
        }
        return <div className={`box ${selected}`} onClick={() => this.props.select(this.props.position)}><div className={this.checker}/></div>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        select: position => {
            dispatch(selectField(position))
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Field)
