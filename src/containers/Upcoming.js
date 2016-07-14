import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EventList from '../components/EventList';
import moment from 'moment';
import { DATE_FORMAT } from '../data/constants';
import Button from 'apsl-react-native-button';
import * as storage from '../data/storage';
import * as Actions from '../actions';

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

function mapDispatchToActions(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

class UpcomingComponent extends Component {
  constructor() {
    super();
    this.writeToStorage = this.writeToStorage.bind(this);
    this.state = {
      storageItem: 'blank!'
    };
  }
  writeToStorage() {
    storage.writeStoreToStorage({ rotations: this.props.rotations, contacts: this.props.contacts });
  }
  render() {
    const props = this.props;
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
        <Button onPress={this.writeToStorage}>
          write to local storage
        </Button>
        <Button onPress={this.props.actions.fetchFromStorage}>
          get from local storage
        </Button>
        <Text>{this.state.storageItem}</Text>
        <EventList events={events} />
      </LinearGradient>
    );
  }
}

UpcomingComponent.propTypes = {
  rotations: PropTypes.array.isRequired,
  contacts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const styles = {
  container: {
    flex: 1
  }
};

export default connect(mapStateToProps, mapDispatchToActions)(UpcomingComponent);
