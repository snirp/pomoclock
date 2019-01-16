export const WORK = 'work';
export const SHORT = 'shortBreak';
export const LONG = 'longBreak';

export const TIMERS = {
  [WORK]: {
    color: '#008000',
  },
  [SHORT]: {
    color: '#ffa500',
  },
  [LONG]: {
    color: '#ff0000',
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
    title: 'Sessions between long breaks',
    min: 2,
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