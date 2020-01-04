import React, { Component } from 'react';
import CountdownTimer from './CountdownTimer/CountdownTimer';
import TimeController from './TimeController/TimeController';

// CSS
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = { time: new Date().getTime() };
        this.modifyTime = this.modifyTime.bind(this);
        this.resetToPresent = this.resetToPresent.bind(this);
    }

    modifyTime(time) {
        this.setState({ time: this.state.time + time * 1000 });
    }

    resetToPresent() {
        this.setState({ time: new Date().getTime() });
    }

    render() {
        return (
            <div className="App">
                <CountdownTimer
                    time={this.state.time}
                    now={new Date().getTime()}
                />
                <TimeController
                    time={this.state.time}
                    modifyTime={this.modifyTime}
                    resetToPresent={this.resetToPresent}
                />
            </div>
        );
    }
}

export default App;
