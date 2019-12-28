import React, { useState, Fragment } from 'react';
import { useInterval } from './CountdownUtils';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import classes from './CountdownTimer.module.scss';

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
  flipIndicator: PropTypes.bool // When this prop hits 0, then this digit plays the flip animation.
};

Digit.defaultProps = {
  max: 9,
  start: 0
};

const CdTimer = props => {
  let diff = Math.max(props.time - new Date().getTime(), 0) / 1000;
  const [duration, setDuration] = useState(diff);
  const totalTime = Math.floor(diff);
  const timeData = {};

  const days = Math.floor(diff / 86400); // 60 * 60 * 24
  diff -= days * 86400;
  // Since days doesn't have an upper bound on its number of digits, we have to generate those
  const daysData = [];
  const daysString = days.toString();
  for (let i = 0; i < daysString.length; i++) {
    daysData.push({ max: 9, flip: 84000 * i });
  }
  timeData['days'] = {
    cssClass: 'Days',
    formatted: days,
    digits: daysData
  };

  const hours = Math.floor(diff / 3600); // 60 * 60
  diff -= hours * 3600;
  timeData['hours'] = {
    cssClass: 'Hours',
    formatted: hours,
    digits: [
      { max: 2, flip: 36000 },
      { max: 9, flip: 3600 }
    ]
  };

  const mins = Math.floor(diff / 60);
  diff -= mins * 60;
  timeData['mins'] = {
    cssClass: 'Mins',
    formatted: mins,
    digits: [
      { max: 5, flip: 600 },
      { max: 9, flip: 60 }
    ]
  };

  const secs = Math.floor(diff);
  timeData['secs'] = {
    cssClass: 'Secs',
    formatted: secs,
    digits: [
      { max: 5, flip: 10 },
      { max: 9, flip: 1 }
    ]
  };

  useInterval(
    () => {
      setDuration(totalTime - 1);
      if (Math.floor(duration) === 0 && !!props.callback) {
        props.callback.call();
      }
    },
    Math.floor(duration) < 0 ? null : 1000
  );

  const renderElements = {};

  Object.keys(timeData).forEach(unit => {
    const time = timeData[unit];
    const timeString = time['formatted'].toString().split('');
    renderElements[unit] = (
      <div
        className={classnames(
          'inline-block',
          classes.Unit,
          classes[timeData[unit]['cssClass']]
        )}
      >
        {timeString.map((digit, i) => (
          <Digit
            key={`${unit}-${i}`}
            unit={unit}
            start={parseInt(digit)}
            max={timeData[unit]['digits'][i]['max']}
            flipIndicator={duration % timeData[unit]['digits'][i]['flip'] === 0}
          />
        ))}
        <div className={classes.UnitText}>{unit}</div>
      </div>
    );
  });

  return (
    <div
      className={classnames('text-center', classes.CountdownTimer, {
        [classes.SecondsLeft]: duration < 60
      })}
    >
      {timeData['days']['formatted'] > 0 ? (
        <Fragment>
          {renderElements['days']}
          <div className={classnames(classes.UnitSeparator, classes.Days)} />
        </Fragment>
      ) : (
        <Fragment />
      )}
      {timeData['mins']['formatted'] > 0 ? (
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
  time: PropTypes.number,
  callback: PropTypes.func
};

CdTimer.defaultProps = {
  time: 0
};

export default CdTimer;
