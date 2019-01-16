export const WORK = 'work';
export const SHORT = 'shortBreak';
export const LONG = 'longBreak';

export const TIMERS = {
  [WORK]: {
    display: 'work', 
    message: "Time for a break",
    color: 'green',
  },
  [SHORT]: {
    display: 'short break', 
    message: "Let's get to work!",
    color: 'orange',
  },
  [LONG]: {
    display: 'long break', 
    message: "Let's get to work!",
    color: 'red'
  },
};

// Properties for configuring each of the user settings
export const SETTINGS = {
  'sessionCount': {
    title: 'Total number of sessions',
    min: 1,
    max: 20,
    step: 1,
  },
  'batchSize': {
    title: 'Number of sessions between long breaks',
    min: 1,
    max: 10,
    step: 1,
  },
  'volume': {
    title: 'Volume of notification sound',
    min: 0,
    max: 10,
    step: 1,
  },
  [WORK]: {
    title: 'Work session in minutes',
    min: 1,
    max: 60,
    step: 1,
  },
  [SHORT]: {
    title: 'Short break in minutes',
    min: 1,
    max: 15,
    step: 1,
  },
  [LONG]: {
    title: 'Long break in minutes',
    min: 1,
    max: 45,
    step: 1,
  },
}