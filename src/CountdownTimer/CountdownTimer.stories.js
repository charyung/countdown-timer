import React from 'react';
import { storiesOf } from '@storybook/react';
import { themes } from '@storybook/theming';
import CountdownTimer from './CountdownTimer.js';

const now = new Date();
const daysFromNow = new Date().setDate(now.getDate() + 7);
const hoursFromNow = new Date().setHours(now.getHours() + 7);
const secondsFromNow = new Date().setSeconds(now.getSeconds() + 7);

storiesOf('CountdownTimer', module)
  .addParameters({ options: { theme: themes.dark } })
  .add('More than 24 hours left', () => <CountdownTimer time={daysFromNow} />)
  .add('Between 1 minute and 24 hours left', () => <CountdownTimer time={hoursFromNow} />)
  .add('Less than 1 minute left', () => <CountdownTimer time={secondsFromNow} />)
