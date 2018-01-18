import React from 'react'
import { WhiteField, BlackField } from '../fields/field'
import styled from 'styled-components'
import './board.css'

class Field extends React.Component {
  componentDidMount() {    
    const { position } = this.props
    if (position % 2 === 0 && Math.floor(position / 8) % 2 === 0) this.color = "white"  
    else if (position % 2 === 1 && Math.floor(position / 8) % 2 === 1) this.color = "white"
    else this.color = "black"
  }

  onClick() {
    console.log("check", this.props.position, this.color);
  }
  
  render() {
    return <div className="box" onClick={this.onClick.bind(this)}>{this.props.position}</div>
  }
}

const Board = () => {
  const fields = []
  for (let i = 0; i < 64; i++) {
    fields.push(<Field position={i} key={i}/>)
  }
  return (
    <div className="wrapper">
      {fields}
    </div>
)}

export default Board
