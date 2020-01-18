import React from 'react';

// CSS
import classnames from 'classnames';
import classes from './TimeController.module.css';

const Button = ({ children, className, ...props }) => (
    <button
        className={classnames(classes.Button, className)}
        type="button"
        {...props}
    >
        {children}
    </button>
);

export default Button;
