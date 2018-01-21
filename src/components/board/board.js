import React, {Component} from 'react'
import './board.css'
import Field from './field'
import { connect } from 'react-redux'

class Board extends Component {
  render() {    
    this.fields = []
    const { markedLight, markedDark, animate } = this.props    
    for (let i = 0; i < 64; i++) {
      let selected = ""  
      if (markedLight && markedLight.includes(i)) {
        selected = "light"
      }     
      if (markedDark && markedDark.includes(i)) {
        selected = "dark"
      }
      if (animate && animate[0] === i) {
        this.points = animate
        console.log("animate", i, this.points);
        
      } else {
        this.points = null
      }
      this.fields.push(<Field position={i} key={i} selected={selected} checkerInfo={this.props.fields[i]} animate={this.points}/>)
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
    animate: state.animate,
    markedDark: state.markFields.markedDark,
    markedLight: state.markFields.markedLight
  }
}

export default connect(
  mapStateToProps
)(Board)
