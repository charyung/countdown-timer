import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TIME_IN_SECS, TIME_LIMIT } from '../constants.js';

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
const inputStyle = 'px-4 py-1 m-1 w-48 rounded-full';

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

const TimeController = ({ modifyTime, setTime, resetToPresent, ...props }) => {
    const date = new Date(props.time);

    const addTimeDefault = {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
    };
    const [customAddTime, setCustomAddTime] = useState(addTimeDefault);

    const formatTime = time => time.toString().padStart(2, '0');
    const setTimeDefault = {
        date: `${date.getFullYear()}-${formatTime(date.getMonth() + 1)}-${formatTime(date.getDate())}`,
        time: `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}:${formatTime(date.getSeconds())}`
    };
    const [customSetTime, setCustomSetTime] = useState(setTimeDefault);

    const moddedModifyTime = modifier => {
        const finalAmount = Object.keys(customAddTime).reduce(
            (acc, curr) => acc + customAddTime[curr] * TIME_IN_SECS[curr],
            0
        );

        if (Math.abs(props.time / 1000 + finalAmount) <= TIME_LIMIT) {
            modifyTime(finalAmount);
        }
    };

    const modifyField = (value, field) => {
        setCustomAddTime({
            ...customAddTime,
            [field]: value
        });
    };

    return (
        <div className="inline-block p-4 m-4 rounded-lg bg-gray-400 text-gray-800">
            <div className="text-lg">
                <Icon icon={faClock} /> Time Control
            </div>

            <div className="flex items-center justify-center">
                <span className="flex-1 p-2 m-2 rounded-lg bg-gray-300">
                    <Icon icon={faHourglassEnd} /> {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </span>
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

            <div className="flex flex-col sm:flex-row">
                <div className="p-2 m-2 rounded-lg bg-gray-300">
                    Add Time
                    <div className="flex flex-col">
                        <input
                            className={inputStyle}
                            placeholder="Days"
                            type="number"
                            min="0"
                            value={customAddTime['day']}
                            onChange={e => {
                                modifyField(parseInt(e.target.value), 'day');
                            }}
                        />
                        <input
                            className={inputStyle}
                            placeholder="Hours"
                            type="number"
                            min="0"
                            value={customAddTime['hour']}
                            onChange={e => {
                                modifyField(parseInt(e.target.value), 'hour');
                            }}
                        />
                        <input
                            className={inputStyle}
                            placeholder="Minutes"
                            type="number"
                            min="0"
                            value={customAddTime['minute']}
                            onChange={e => {
                                modifyField(parseInt(e.target.value), 'minute');
                            }}
                        />
                        <input
                            className={inputStyle}
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
                                    setCustomAddTime(addTimeDefault);
                                }}
                                colour="red"
                                title="Reset to default value"
                            >
                                <Icon icon={faUndoAlt} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="p-2 m-2 rounded-lg bg-gray-300">
                    Set Time
                    <div className="flex flex-col">
                        <input
                            className={inputStyle}
                            type="date"
                            pattern="\d{4}-\d{2}-\d{2}"
                            value={customSetTime['date']}
                            onChange={e => {
                                setCustomSetTime({
                                    date: e.target.value,
                                    time: customSetTime['time']
                                });
                            }}
                        />
                        <input
                            className={inputStyle}
                            type="time"
                            step="1"
                            pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                            value={customSetTime['time']}
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
                                    const [year, month, day] = customSetTime['date'].split("-");
                                    const [hours, minute, second] = customSetTime['time'].split(":");
                                    console.log(minute);
                                    setTime(
                                        new Date(
                                            parseInt(year),
                                            parseInt(month) - 1,
                                            parseInt(day),
                                            parseInt(hours),
                                            parseInt(minute),
                                            parseInt(second)
                                        ).getTime()
                                    );
                                }}
                            >
                                <Icon icon={faArrowRight} />
                            </Button>
                            <Button
                                onClick={() => {
                                    setCustomSetTime(setTimeDefault);
                                }}
                                colour="red"
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
