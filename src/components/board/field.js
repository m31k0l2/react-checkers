import React, { Component } from 'react'
import { connect } from 'react-redux'
import './board.css'
import { selectField, numberPositionToString } from '../../actions/actions'
import Checker from './checker'

class Field extends Component {
    render() {
        const { selected, checkerInfo, position, select, animate } = this.props        
        if (animate) { 
            this.points = animate.map(it => numberPositionToString(it))
        } else {
            this.points = null
        }
        let checker = <Checker checkerInfo={checkerInfo} animate={this.points} />
        return <div className={`box ${selected}`} onClick={() => select(position)}>{checker}</div>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        select: position => dispatch(selectField(position))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Field)
