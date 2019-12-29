import React, { useState } from 'react';
import PropTypes from 'prop-types';

// FontAwesome
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
    faClock,
    faPlusCircle,
    faMinusCircle
} from '@fortawesome/free-solid-svg-icons';

// CSS
import classnames from 'classnames';
import classes from './TimeController.module.scss';

const Button = ({ children, ...props }) => (
    <button
        className={classnames(
            'px-4 py-1 my-1 rounded-full',
            { 'bg-red-700 active:bg-red-800 text-white': props.colour === 'red' },
            { 'bg-gray-500 active:bg-gray-600': !props.colour }
        )}
        type="button"
        {...props}
    >
        {children}
    </button>
);

const TimeController = ({ modifyTime, resetToPresent, ...props }) => {
    const [addTime, setAddTime] = useState(true);
    const modifier = addTime ? 1 : -1;
    const date = new Date(props.time);

    return (
        <div className="inline-block p-4 m-4 rounded-lg bg-gray-400 text-gray-800">
            <div className="text-lg">
                <Icon icon={faClock} /> Time Control {addTime}
            </div>

            <div className="flex flex-col justify-center p-2 m-2 rounded-lg bg-gray-300">
                {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </div>

            <div className="flex">
                <div
                    className={classnames(
                        classes.OperationToggle,
                        'flex flex-col justify-center p-2 m-2 rounded-lg bg-gray-300'
                    )}
                >
                    <input
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
                    </label>
                </div>
                <div className="p-2 m-2 rounded-lg bg-gray-300">
                    Preset
                    <div className="flex flex-col">
                        <Button
                            onClick={() => {
                                modifyTime(1 * modifier);
                            }}
                        >
                            1 second
                        </Button>
                        <Button
                            onClick={() => {
                                modifyTime(60 * modifier);
                            }}
                        >
                            1 minute
                        </Button>
                        <Button
                            onClick={() => {
                                modifyTime(3600 * modifier);
                            }}
                        >
                            1 hour
                        </Button>
                        <Button
                            onClick={() => {
                                modifyTime(86400 * modifier);
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
                <div className="p-2 m-2 rounded-lg bg-gray-300">Custom</div>
            </div>
        </div>
    );
};

TimeController.propTypes = {
    time: PropTypes.number
};

export default TimeController;
