import React, { Component } from 'react';
import CountdownTimer from './CountdownTimer/CountdownTimer'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CountdownTimer time={new Date().setDate(new Date().getDate() + 9999)}></CountdownTimer>
      </div>
    );
  }
}

export default App;
