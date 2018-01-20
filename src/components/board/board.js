import React, {Component} from 'react'
import './board.css'
import Field from './field'
import { connect } from 'react-redux'

class Board extends Component {
  render() {    
    this.fields = []
    const { markedLight, markedDark } = this.props    
    for (let i = 0; i < 64; i++) {
      let selected = ""  
      if (markedLight && markedLight.includes(i)) {
        selected = "light"
      }     
      if (markedDark && markedDark.includes(i)) {
        selected = "dark"
      }
      this.fields.push(<Field position={i} key={i} selected={selected} checkerInfo={this.props.fields[i]}/>)
    }
    return (
      <div className="wrapper">
        {this.fields}
      </div>)
  }
}

const mapStateToProps = state => {
  return {
    fields: state.board,
    markedDark: state.markFields.markedDark,
    markedLight: state.markFields.markedLight
  }
}

export default connect(
  mapStateToProps
)(Board)
