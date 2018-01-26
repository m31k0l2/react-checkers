import React, { Component } from 'react'
import Controller from './controller/controller'
import PlayForButton from './components/buttons/playForButton'
import './App.css';

class App extends Component {
  render() {
    return (
      <div style={{ margin: "0 auto", width: "60%" }}>
        <div style={{ margin: "0 auto", width: "200px", minHeight: "60px" }}>
          <PlayForButton />
        </div>
        <div>
          <Controller />        
        </div>        
      </div>
    );
  }
}

export default App;
