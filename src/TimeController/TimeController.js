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

const Button = props => (
    <button
        className="px-4 py-1 my-1 rounded-full bg-gray-500 active:bg-gray-600"
        type="button"
    >
        {props.children}
    </button>
)

const TimeController = props => {
    const [addTime, setAddTime] = useState(true);

    return (
        <div className="inline-block p-4 m-4 rounded-lg bg-gray-400 text-gray-800">
            <div className="text-lg">
                <Icon icon={faClock} /> Time Control {addTime}
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
                        <Button>1 second</Button>
                        <Button>1 minute</Button>
                        <Button>1 hour</Button>
                        <Button>1 day</Button>
                    </div>
                </div>
                <div className="p-2 m-2 rounded-lg bg-gray-300">
                    Custom
                </div>
            </div>
        </div>
    );
};

TimeController.propTypes = {
    time: PropTypes.number
};

export default TimeController;
