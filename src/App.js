import React, { Component } from 'react';
import CountdownTimer from './CountdownTimer/CountdownTimer';
import logo from './logo.svg';
import './App.css';

import TimeController from './TimeController/TimeController';

class App extends Component {
    constructor() {
        super();
        this.state = { time: new Date().getTime() };
        this.modifyTime = this.modifyTime.bind(this);
        this.resetToPresent = this.resetToPresent.bind(this);
    }

    modifyTime(time) {
        this.setState({ time: this.state.time + (time * 1000) });
    }

    resetToPresent() {
        this.setState({ time: new Date().getTime() });
    }

    render() {
        return (
            <div className="App">
                <CountdownTimer time={this.state.time} now={new Date().getTime()}/>
                <TimeController modifyTime={this.modifyTime} resetToPresent={this.resetToPresent} />
            </div>
        );
    }
}

export default App;
