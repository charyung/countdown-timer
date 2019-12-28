import React, { Component } from 'react';
import CountdownTimer from './CountdownTimer/CountdownTimer';
import logo from './logo.svg';
import './App.css';

import TimeController from './TimeController/TimeController';

class App extends Component {
    constructor() {
        super();
        this.state = { time: new Date() };
    }

    render() {
        return (
            <div className="App">
                <CountdownTimer time={this.state.time} />
                <TimeController time={this.state.time} />
            </div>
        );
    }
}

export default App;
