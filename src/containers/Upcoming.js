import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import EventList from '../components/EventList';
import moment from 'moment';
import { DATE_FORMAT } from '../data/constants';

function getTimestampOfNextEvent(rotation) {
  const startMoment = moment(rotation.starting, DATE_FORMAT);
  if (startMoment.isAfter(moment())) {
    return startMoment;
  }
  const everyMillis = moment.duration(...rotation.every).valueOf();
  const todayMillis = moment().valueOf();
  const startingMillis = startMoment.valueOf();
  const millisSinceStart = todayMillis - startingMillis;
  const remainderMillis = millisSinceStart % everyMillis;
  const millisTillNext = everyMillis - remainderMillis;
  const nextEventMoment = moment(todayMillis + millisTillNext);
  return nextEventMoment;
}

function mapStateToProps(state) {
  return {
    rotations: state.rotations,
    contacts: state.contacts
  };
}

const UpcomingComponent = (props) => {
  const events = props.rotations
    .map((rotation) => {
      const contact = props.contacts.find(
        (con) => con.id === rotation.contactId);
      const contactMethod = contact.contactMethods
          .find(cMethod => cMethod.id === rotation.contactMethodId);
      return {
        contactId: rotation.contactId,
        contactName: contact.name,
        contactMethod,
        name: rotation.name,
        timestamp: getTimestampOfNextEvent(rotation)
      };
    })
    // Filter out "lapping" events that are a year or more from now that would
    // be confusing since we don't show year in this UI
    // Maybe it's better to show them but format them differently (add the year)
    .filter(event => event.timestamp.isBefore(moment().add(11, 'months')))
    .sort((event1, event2) => {
      if (event1.timestamp < event2.timestamp) {
        return -1;
      }
      if (event1.timestamp > event2.timestamp) {
        return 1;
      }
      return 0;
    });
  return (
    <LinearGradient colors={['#F7F7F7', '#D7D7D7']} style={styles.container}>
      <EventList events={events} />
    </LinearGradient>
  );
};

UpcomingComponent.propTypes = {
  rotations: PropTypes.array.isRequired,
  contacts: PropTypes.array.isRequired
};

const styles = {
  container: {
    flex: 1
  }
};

export default connect(mapStateToProps)(UpcomingComponent);
