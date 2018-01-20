import React, { Component } from 'react'
import './board.css'
import { WHITE, QUEEN } from '../../actions/actions'

class Field extends Component {
    onClick() {
        const { position } = this.props
        console.log("check", position, this.props.checkerInfo);
    }

    render() {
        const { selected, checkerInfo } = this.props
        if (checkerInfo.type) {
            if (checkerInfo.color === WHITE) {
                this.checker = "white checker"
                if (checkerInfo.type === QUEEN) {
                    this.queen = <img src="whiteQueen.svg" alt="W" />
                }
            }
            else {
                this.checker = "black checker"
                if (checkerInfo.type === QUEEN) {
                    this.queen = <img src="blackQueen.svg" alt="W" />
                }
            }
        } else {
            this.checker = ""
        }
        return <div className={`box ${selected}`} onClick={this.onClick.bind(this)}><div className={this.checker}>{this.queen}</div></div>
    }
}

export default Field
