import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import EventList from '../components/EventList';

function mapStateToProps(state) {
  return {
    events: state.events
  };
}

const UpcomingComponent = (props) => (
  <LinearGradient colors={['#F7F7F7', '#D7D7D7']} style={styles.container}>
    <EventList events={props.events} />
  </LinearGradient>
);

UpcomingComponent.propTypes = {
  events: PropTypes.array.isRequired
};

const styles = {
  container: {
    flex: 1
  }
};

export default connect(mapStateToProps)(UpcomingComponent);
