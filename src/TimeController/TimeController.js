import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TIME_IN_SECS, TIME_LIMIT } from '../constants.js';

// FontAwesome
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
    faClock,
    faPlus,
    faMinus,
    faUndoAlt
} from '@fortawesome/free-solid-svg-icons';

// CSS
import classnames from 'classnames';
import classes from './TimeController.module.scss';
const inputStyle = 'px-4 py-1 m-1 rounded-full';

/*const Button = ({ children, ...props }) => (
    <button
        className={classnames(
            inputStyle,
            {
                'bg-red-700 active:bg-red-800 text-white':
                    props.colour === 'red'
            },
            { 'bg-gray-500 active:bg-gray-600': !props.colour }
        )}
        type="button"
        {...props}
    >
        {children}
    </button>
);*/

const Button = ({ children, ...props }) => (
    <button
        className={classnames(
            'flex justify-center items-center h-8 w-8 m-1 rounded-full text-white',
            {
                'bg-red-700 active:bg-red-800': props.colour === 'red'
            },
            { 'bg-gray-700 active:bg-gray-900': !props.colour }
        )}
        type="button"
        {...props}
    >
        {children}
    </button>
);

const TimeController = ({ modifyTime, resetToPresent, ...props }) => {
    //const [addTime, setAddTime] = useState(true);
    const date = new Date(props.time);

    //const [customTime, setCustomTime] = useState(0);
    //const [customUnit, setCustomUnit] = useState(1);

    const [customTime, setCustomTime] = useState({
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
    });

    const moddedModifyTime = modifier => {
        const finalAmount = Object.keys(customTime).reduce(
            (acc, curr) => acc + customTime[curr] * TIME_IN_SECS[curr],
            0
        );

        if (Math.abs(props.time / 1000 + finalAmount) <= TIME_LIMIT) {
            modifyTime(finalAmount);
        }
    };

    const modifyField = (value, field) => {
        setCustomTime({
            ...customTime,
            [field]: value
        });
    };

    return (
        <div className="inline-block p-4 m-4 rounded-lg bg-gray-400 text-gray-800">
            <div className="text-lg">
                <Icon icon={faClock} /> Time Control
            </div>

            <div className="flex flex-col justify-center p-2 m-2 rounded-lg bg-gray-300">
                {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </div>

            <div className="flex">
                <div className="p-2 m-2 rounded-lg bg-gray-300">
                    Add Time
                    <div className="flex flex-col">
                        <input
                            className={inputStyle}
                            placeholder="Days"
                            type="number"
                            min="0"
                            value={customTime['day']}
                            onChange={e => {
                                modifyField(parseInt(e.target.value), 'day');
                            }}
                        />
                        <input
                            className={inputStyle}
                            placeholder="Hours"
                            type="number"
                            min="0"
                            value={customTime['hour']}
                            onChange={e => {
                                modifyField(parseInt(e.target.value), 'hour');
                            }}
                        />
                        <input
                            className={inputStyle}
                            placeholder="Minutes"
                            type="number"
                            min="0"
                            value={customTime['minute']}
                            onChange={e => {
                                modifyField(parseInt(e.target.value), 'minute');
                            }}
                        />
                        <input
                            className={inputStyle}
                            placeholder="Seconds"
                            type="number"
                            min="0"
                            value={customTime['second']}
                            onChange={e => {
                                modifyField(parseInt(e.target.value), 'second');
                            }}
                        />
                    </div>
                </div>
                {/*<div className="p-2 m-2 rounded-lg bg-gray-300">
                    Preset
                    <div className="flex flex-col">
                        <Button
                            onClick={() => {
                                moddedModifyTime(TIME_IN_SECS.second);
                            }}
                        >
                            1 second
                        </Button>
                        <Button
                            onClick={() => {
                                moddedModifyTime(TIME_IN_SECS.minute);
                            }}
                        >
                            1 minute
                        </Button>
                        <Button
                            onClick={() => {
                                moddedModifyTime(TIME_IN_SECS.hour);
                            }}
                        >
                            1 hour
                        </Button>
                        <Button
                            onClick={() => {
                                moddedModifyTime(TIME_IN_SECS.day);
                            }}
                        >
                            1 day
                        </Button>
                        <Button
                            onClick={() => {
                                resetToPresent();
                            }}
                            colour="red"
                        >
                            Now
                        </Button>
                    </div>
                </div>
                <div className="p-2 m-2 rounded-lg bg-gray-300">
                    Custom
                    <div className="flex flex-col">
                        <input
                            className={inputStyle}
                            placeholder="Duration"
                            type="number"
                            min="0"
                            required
                            value={customTime}
                            onChange={e => {
                                if (e.target.checkValidity()) {
                                    setCustomTime(parseInt(e.target.value));
                                }
                            }}
                        ></input>
                        <div className={classes.Dropdown}>
                            <select
                                className={classnames(
                                    inputStyle,
                                    'appearance-none',
                                    'w-full'
                                )}
                                value={customUnit}
                                onChange={e => {
                                    if (e.target.checkValidity()) {
                                        setCustomUnit(parseInt(e.target.value));
                                    }
                                }}
                            >
                                <option value={TIME_IN_SECS.second}>seconds</option>
                                <option value={TIME_IN_SECS.minute}>minutes</option>
                                <option value={TIME_IN_SECS.hour}>hours</option>
                                <option value={TIME_IN_SECS.day}>days</option>
                            </select>
                        </div>
                        <Button
                            onClick={() => {
                                moddedModifyTime(customTime * customUnit);
                            }}
                        >
                            Modify
                        </Button>
                    </div>
                </div>*/}
                <div
                    className={classnames(
                        classes.OperationToggle,
                        'flex flex-col justify-center p-2 m-2 rounded-lg bg-gray-300'
                    )}
                >
                    {/*<input
                        id={classes.opToggle}
                        type="checkbox"
                        checked={addTime}
                        onChange={() => {
                            setAddTime(!addTime);
                        }}
                    />
                    <label htmlFor={classes.opToggle} className={classes.Add}>
                        <Icon icon={faPlusCircle} className="cursor-pointer" />
                    </label>
                    <label
                        htmlFor={classes.opToggle}
                        className={classes.Subtract}
                    >
                        <Icon icon={faMinusCircle} className="cursor-pointer" />
                    </label>*/}

                    <Button
                        onClick={() => {
                            moddedModifyTime(1);
                        }}
                    >
                        <Icon icon={faPlus} />
                    </Button>

                    <Button
                        onClick={() => {
                            moddedModifyTime(-1);
                        }}
                    >
                        <Icon icon={faMinus} />
                    </Button>

                    <Button
                        onClick={() => {
                            resetToPresent();
                        }}
                        colour="red"
                        title="Reset to present"
                    >
                        <Icon icon={faUndoAlt} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

TimeController.propTypes = {
    time: PropTypes.number
};

export default TimeController;
