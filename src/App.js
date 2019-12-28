import React, { Component } from 'react';
import CountdownTimer from './CountdownTimer/CountdownTimer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { time: new Date() };
  }

  render() {
    return (
      <div className="App">
        <CountdownTimer time={this.state.time}></CountdownTimer>
      </div>
    );
  }
}

export default App;
