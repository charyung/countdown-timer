import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TIME_IN_SECS, TIME_LIMIT } from '../constants';

// Components
import Button from './ControllerButton';

// FontAwesome
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
    faClock,
    faPlus,
    faMinus,
    faUndoAlt,
    faArrowRight,
    faHourglassEnd
} from '@fortawesome/free-solid-svg-icons';

// CSS
import classnames from 'classnames';
import classes from './TimeController.module.css';

const addTimeDefault = {
    day: '',
    hour: '',
    minute: '',
    second: ''
};

const formatTime = time => time.toString().padStart(2, '0');
const setTimeDefault = date => ({
    date: `${date.getFullYear()}-${formatTime(date.getMonth() + 1)}-${formatTime(date.getDate())}`,
    time: `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}:${formatTime(date.getSeconds())}`
});

const TimeController = ({ modifyTime, setTime, resetToPresent, ...props }) => {
    const date = new Date(props.time);
    const [customAddTime, setCustomAddTime] = useState(addTimeDefault);
    const [customSetTime, setCustomSetTime] = useState(setTimeDefault(date));

    const [outOfBounds, setOutOfBounds] = useState(false);
    const moddedModifyTime = modifier => {
        const finalAmount =
            Object.keys(customAddTime).reduce(
                (acc, curr) => acc + (customAddTime[curr] || 0) * TIME_IN_SECS[curr], 0
            ) * modifier;

        if (Math.abs(props.time / 1000 + finalAmount) <= TIME_LIMIT) {
            setOutOfBounds(false);
            modifyTime(finalAmount);
        } else {
            setOutOfBounds(true);
        }
    };

    const modifyField = (value, field) => {
        setCustomAddTime({
            ...customAddTime,
            [field]: value
        });
    };

    return (
        <div className={classes.TimeControl}>
            <div className="text-lg">
                <Icon icon={faClock} /> Time Control
            </div>

            <div className="flex items-center justify-center">
                <span
                    className={classnames(
                        'flex items-center flex-1',
                        classes.InfoBlock
                    )}
                >
                    <Icon icon={faHourglassEnd} className="mx-1" />
                    <span className="flex-1">
                        {outOfBounds ? (
                            <span className="text-red-700">
                                Date must be between April 20th 271821 BCE and September 12, 275760 CE.
                            </span>
                        ) : (
                            <>
                                {date.toLocaleDateString()}{' '}
                                {date.toLocaleTimeString()}
                            </>
                        )}
                    </span>
                </span>
                <Button
                    onClick={() => {
                        resetToPresent();
                        setOutOfBounds(false);
                    }}
                    className={classes.Red}
                    title="Reset to present"
                >
                    <Icon icon={faUndoAlt} />
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row">
                <div className={classes.InfoBlock}>
                    Modify Time
                    <div className="flex flex-col">
                        <input
                            placeholder="Days"
                            type="number"
                            min="0"
                            value={customAddTime['day']}
                            onChange={e => {
                                modifyField(parseInt(e.target.value), 'day');
                            }}
                        />
                        <input
                            placeholder="Hours"
                            type="number"
                            min="0"
                            value={customAddTime['hour']}
                            onChange={e => {
                                modifyField(parseInt(e.target.value), 'hour');
                            }}
                        />
                        <input
                            placeholder="Minutes"
                            type="number"
                            min="0"
                            value={customAddTime['minute']}
                            onChange={e => {
                                modifyField(parseInt(e.target.value), 'minute');
                            }}
                        />
                        <input
                            placeholder="Seconds"
                            type="number"
                            min="0"
                            value={customAddTime['second']}
                            onChange={e => {
                                modifyField(parseInt(e.target.value), 'second');
                            }}
                        />
                        <div className="flex justify-center">
                            <Button
                                onClick={() => {
                                    moddedModifyTime(1);
                                }}
                                title="Add to current time"
                            >
                                <Icon icon={faPlus} />
                            </Button>

                            <Button
                                onClick={() => {
                                    moddedModifyTime(-1);
                                }}
                                title="Subtract from current time"
                            >
                                <Icon icon={faMinus} />
                            </Button>
                            <Button
                                onClick={() => {
                                    setCustomAddTime(addTimeDefault);
                                }}
                                className={classes.Red}
                                title="Reset to default value"
                            >
                                <Icon icon={faUndoAlt} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={classes.InfoBlock}>
                    Set Time
                    <div className="flex flex-col">
                        <input
                            type="date"
                            pattern="\d{4}-\d{2}-\d{2}"
                            value={customSetTime['date']}
                            required
                            onChange={e => {
                                setCustomSetTime({
                                    date: e.target.value,
                                    time: customSetTime['time']
                                });
                            }}
                        />
                        <input
                            type="time"
                            step="1"
                            pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                            value={customSetTime['time']}
                            required
                            onChange={e => {
                                setCustomSetTime({
                                    date: customSetTime['date'],
                                    time: e.target.value
                                });
                            }}
                        />
                        <div className="flex justify-center">
                            <Button
                                onClick={() => {
                                    // For some reason, months are implemented such that the internal value is 1 less
                                    // than the value that humans are used to, but only months
                                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Examples
                                    const [year, month, day] = customSetTime['date'].split("-").map(v => parseInt(v));
                                    const time = customSetTime['time'].split(":").map(v => parseInt(v));
                                    // Uglier but Date string parsing is REALLY bad
                                    // https://stackoverflow.com/questions/2587345/why-does-date-parse-give-incorrect-results
                                    setTime(
                                        new Date(
                                            year,
                                            month - 1,
                                            day,
                                            ...time
                                        ).getTime()
                                    );
                                }}
                            >
                                <Icon icon={faArrowRight} />
                            </Button>
                            <Button
                                onClick={() => {
                                    setCustomSetTime(setTimeDefault(date));
                                }}
                                className={classes.Red}
                                title="Reset to default value"
                            >
                                <Icon icon={faUndoAlt} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

TimeController.propTypes = {
    time: PropTypes.number
};

export default TimeController;
