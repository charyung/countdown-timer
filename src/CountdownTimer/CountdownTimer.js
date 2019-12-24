import React, { useState, Fragment } from 'react';
import { useInterval } from './CountdownUtils';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import classes from './CountdownTimer.module.css';

const DigitUnit = props => {
  return (
    <div className={classnames(classes.DigitUnit, props.className)}>
      <div className={classes.Up}>
        <div className={classes.Num}>{props.number}</div>
      </div>
      <div className={classes.Center} />
      <div className={classes.Down}>
        <div className={classes.Num}>{props.number}</div>
      </div>
    </div>
  );
};

const Digit = props => {
  const nextNum = props.start === 0 ? props.max : props.start - 1;

  return (
    <div className={classes.Digit}>
      <DigitUnit
        key={`${props.id}-${nextNum}`}
        number={nextNum}
        className={{ [classes.Active]: props.flipIndicator }}
      />
      <DigitUnit
        key={`${props.id}-${props.start}`}
        number={props.start}
        className={{ [classes.Prev]: props.flipIndicator }}
      />
    </div>
  );
};

Digit.propTypes = {
  id: PropTypes.string, // For key purposes
  max: PropTypes.number, // Highest digit. For example, 5 for the tens place of a secs counter because there can only be 60 secs in a minute
  start: PropTypes.number, // The starting digit
  flipIndicator: PropTypes.number // When this prop hits 0, then this digit plays the flip animation.
};

Digit.defaultProps = {
  max: 9,
  start: 0
};

const CdTimer = props => {
  let diff = Math.max(new Date(props.time) - new Date().getTime(), 0) / 1000;
  const [duration, setDuration] = useState(diff);
  const timeData = { total: Math.floor(diff) };

  const days = Math.floor(diff / 86400); // 60 * 60 * 24
  diff -= days * 86400;
  timeData['days'] = {
    cssClass: 'Days',
    formatted: days,
    unformatted: Math.floor(diff)
  };

  const hours = Math.floor(diff / 3600); // 60 * 60
  diff -= hours * 3600;
  timeData['hours'] = {
    cssClass: 'Hours',
    formatted: hours,
    unformatted: Math.floor(diff)
  };

  const mins = Math.floor(diff / 60);
  diff -= mins * 60;
  timeData['mins'] = {
    cssClass: 'Mins',
    formatted: mins,
    unformatted: Math.floor(diff)
  };

  const secs = Math.floor(diff);
  timeData['secs'] = {
    cssClass: 'Secs',
    formatted: secs,
    unformatted: 0
  };

  const convertedTime = { days, hours, mins, secs };

  const digitsData = {
    days: {
      tens: { max: 9, stop: 864000 },
      ones: { max: 9, stop: 86400 }
    },
    hours: {
      tens: { max: 2, stop: 36000 },
      ones: { max: 9, stop: 3600 }
    },
    mins: {
      tens: { max: 5, stop: 600 },
      ones: { max: 9, stop: 60 }
    },
    secs: {
      tens: { max: 5, stop: 10 },
      ones: { max: 9, stop: 1 }
    }
  };

  useInterval(
    () => {
      setDuration(timeData['total'] - 1);
      if (Math.floor(duration) === 0 && !!props.callback) {
        props.callback.call();
      }
    },
    Math.floor(duration) < 0 ? null : 1000
  );

  const renderElements = {};

  Object.keys(convertedTime).forEach(unit => {
    const time = convertedTime[unit];
    renderElements[unit] = (
      <div
        className={classnames(
          'inline-block',
          classes.Unit,
          classes[timeData[unit]['cssClass']]
        )}
      >
        <Digit
          id={`${unit}-tens`}
          unit={unit}
          start={Math.trunc(time / 10)}
          max={digitsData[unit]['tens']['max']}
          flipIndicator={
            duration >= digitsData[unit]['tens']['stop'] &&
            !(
              timeData[unit]['unformatted'] +
              (timeData[unit]['formatted'] % 10)
            )
          }
        />
        <Digit
          id={`${unit}-ones`}
          unit={unit}
          start={time % 10}
          max={digitsData[unit]['ones']['max']}
          flipIndicator={
            duration >= digitsData[unit]['ones']['stop'] &&
            !timeData[unit]['unformatted']
          }
        />
        <div className={classes.UnitText}>{unit}</div>
      </div>
    );
  });

  return (
    <div
      className={classnames(
        'text-center',
        props.className,
        classes.CountdownTimer,
        {
          [classes.SecondsLeft]: duration < 60
        }
      )}
    >
      {duration > digitsData['days']['ones']['stop'] ? (
        <Fragment>
          {renderElements['days']}
          <div className={classnames(classes.UnitSeparator, classes.Days)} />
        </Fragment>
      ) : (
        <Fragment />
      )}
      {duration > digitsData['mins']['ones']['stop'] ? (
        <Fragment>
          {renderElements['hours']}
          <div className={classnames(classes.UnitSeparator)}>:</div>
          {renderElements['mins']}
          <div className={classnames(classes.UnitSeparator)}>:</div>
        </Fragment>
      ) : (
        <Fragment />
      )}
      {renderElements['secs']}
    </div>
  );
};

CdTimer.propTypes = {
  time: PropTypes.string,
  callback: PropTypes.func
};

CdTimer.defaultProps = {
  time: 0
};

export default CdTimer;
