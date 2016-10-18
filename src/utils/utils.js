import moment from 'moment';
import { DATE_FORMAT } from '../data/constants';

export function getMillisUntilNextEvent(rotation) {
  const everyMillis = moment.duration(...rotation.every).valueOf();
  const todayMillis = moment().valueOf();
  const startingMillis = moment(rotation.starting, DATE_FORMAT).valueOf();
  const millisSinceStart = todayMillis - startingMillis;
  const remainderMillis = millisSinceStart % everyMillis;
  const millisTillNext = everyMillis - remainderMillis;
  return millisTillNext;
}

export function getTimestampOfNextEvent(rotation) {
  const startMoment = moment(rotation.starting, DATE_FORMAT);
  if (startMoment.isAfter(moment())) {
    return startMoment;
  }
  const millisTillNext = getMillisUntilNextEvent(rotation);
  const nextEventMoment = moment(moment().valueOf() + millisTillNext);
  return nextEventMoment;
}
