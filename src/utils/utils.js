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

// should always return the first one anyway...
export function getTimestampsUntil(rotation, endTimestamp, maxQuantity = 3) {
  const timestamps = [];
  let currentTimestamp = moment(rotation.starting, DATE_FORMAT).valueOf();
  const now = moment().valueOf();
  while (timestamps.length < maxQuantity
    && (currentTimestamp < endTimestamp || timestamps.length === 0)) {
    if (currentTimestamp > now) {
      timestamps.push(currentTimestamp);
    }
    currentTimestamp += moment.duration(...rotation.every).valueOf();
  }
  return timestamps;
}
