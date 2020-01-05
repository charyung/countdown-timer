import React, { Component } from 'react';
import CountdownTimer from './CountdownTimer/CountdownTimer';
import TimeController from './TimeController/TimeController';

// CSS
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = { time: Date.now() };
        this.modifyTime = this.modifyTime.bind(this);
        this.setTime = this.setTime.bind(this);
        this.resetToPresent = this.resetToPresent.bind(this);
    }

    modifyTime(time) {
        this.setState({ time: this.state.time + time * 1000 });
    }

    setTime(time) {
        this.setState({ time });
    }

    resetToPresent() {
        this.setState({ time: Date.now() });
    }

    render() {
        return (
            <div className="App">
                <CountdownTimer time={this.state.time} />
                <TimeController
                    time={this.state.time}
                    modifyTime={this.modifyTime}
                    setTime={this.setTime}
                    resetToPresent={this.resetToPresent}
                />
            </div>
        );
    }
}

export default App;
