import React from 'react';

// CSS
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

export default DigitUnit;
