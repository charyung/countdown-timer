import React, { Component } from 'react';
import CountdownTimer from './CountdownTimer/CountdownTimer'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CountdownTimer time={new Date().toString()}></CountdownTimer>
      </div>
    );
  }
}

export default App;
