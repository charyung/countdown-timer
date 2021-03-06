import React, { useState, useEffect } from 'react';
import { useInterval } from './CountdownUtils';
import PropTypes from 'prop-types';
import { TIME_IN_SECS } from '../constants';

// Components
import Digit from './Digit';

// CSS
import classnames from 'classnames';
import classes from './CountdownTimer.module.css';

const calculateDiff = time => Math.floor(Math.max(time - Date.now(), 0) / 1000);

const CdTimer = props => {
    const [duration, setDuration] = useState(calculateDiff(props.time));
    useEffect(() => {
        setDuration(calculateDiff(props.time));
    }, [props.time]);
    let diff = duration;
    const timeData = {};

    const days = Math.floor(diff / TIME_IN_SECS.day);
    diff -= days * TIME_IN_SECS.day;
    // Since days doesn't have an upper bound on its number of digits, we have to generate those
    const daysData = [];
    const daysString = days.toString();
    for (let i = 0; i < daysString.length; i++) {
        daysData.push({ max: 9, flip: TIME_IN_SECS.day * i });
    }
    timeData['days'] = {
        cssClass: 'Days',
        formatted: days,
        digits: daysData
    };

    const hours = Math.floor(diff / TIME_IN_SECS.hour);
    diff -= hours * TIME_IN_SECS.hour;
    timeData['hours'] = {
        cssClass: 'Hours',
        formatted: hours,
        digits: [
            { max: 2, flip: TIME_IN_SECS.hour * 10 },
            { max: 9, flip: TIME_IN_SECS.hour }
        ]
    };

    const mins = Math.floor(diff / TIME_IN_SECS.minute);
    diff -= mins * TIME_IN_SECS.minute;
    timeData['mins'] = {
        cssClass: 'Mins',
        formatted: mins,
        digits: [
            { max: 5, flip: TIME_IN_SECS.minute * 10 },
            { max: 9, flip: TIME_IN_SECS.minute }
        ]
    };

    const secs = Math.floor(diff);
    timeData['secs'] = {
        cssClass: 'Secs',
        formatted: secs,
        digits: [
            { max: 5, flip: TIME_IN_SECS.second * 10 },
            { max: 9, flip: TIME_IN_SECS.second }
        ]
    };

    useInterval(
        () => {
            setDuration(duration - 1);
            if (Math.floor(duration) === 0 && !!props.callback) {
                props.callback.call();
            }
        },
        Math.floor(duration) <= 0 ? null : 1000
    );

    const renderElements = {};

    Object.keys(timeData).forEach(unit => {
        const time = timeData[unit];
        const timeString = time['formatted']
            .toString()
            .padStart(time['digits'].length, '0');
        renderElements[unit] = (
            <div
                className={classnames(
                    'inline-block',
                    classes.Unit,
                    classes[time['cssClass']]
                )}
            >
                {timeString.split('').map((digit, i) => (
                    <Digit
                        id={`${unit}-${i}`}
                        key={`${unit}-${i}`}
                        unit={unit}
                        start={parseInt(digit)}
                        max={time['digits'][i]['max']}
                        flipIndicator={
                            duration % time['digits'][i]['flip'] === 0 &&
                            duration > 0
                        }
                    />
                ))}
                <div className={classes.UnitText}>{unit}</div>
            </div>
        );
    });

    return (
        <div
            className={classnames('text-center', classes.CountdownTimer, {
                [classes.SecondsLeft]: duration < TIME_IN_SECS.minute
            })}
        >
            {duration >= TIME_IN_SECS.day ? (
                <>
                    {renderElements['days']}
                    <div
                        className={classnames(
                            classes.UnitSeparator,
                            classes.Days
                        )}
                    />
                </>
            ) : (
                <></>
            )}
            {duration >= TIME_IN_SECS.minute ? (
                <>
                    {renderElements['hours']}
                    <div className={classnames(classes.UnitSeparator)}>:</div>
                    {renderElements['mins']}
                    <div className={classnames(classes.UnitSeparator)}>:</div>
                </>
            ) : (
                <></>
            )}
            {renderElements['secs']}
        </div>
    );
};

CdTimer.propTypes = {
    time: PropTypes.number,
    callback: PropTypes.func
};

CdTimer.defaultProps = {
    time: 0
};

export default CdTimer;
