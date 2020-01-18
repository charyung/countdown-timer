import React from 'react';
import PropTypes from 'prop-types';

// Components
import DigitUnit from './DigitUnit';

// CSS
import classes from './CountdownTimer.module.css';

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

export default Digit;
