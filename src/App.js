import React, { useState } from 'react';
import './App.css';
import CountdownTimer from './CountdownTimer/CountdownTimer';
import TimeController from './TimeController/TimeController';

const App = () => {
    const [time, setTime] = useState(Date.now());

    const modifyTime = addedTime => {
        setTime(time + addedTime * 1000);
    };

    const setNewTime = newTime => {
        setTime(newTime);
    };

    const resetToPresent = () => {
        setTime(Date.now());
    };

    return (
        <div className="App">
            <CountdownTimer time={time} />
            <TimeController
                time={time}
                modifyTime={modifyTime}
                setTime={setNewTime}
                resetToPresent={resetToPresent}
            />
        </div>
    );
};

export default App;
