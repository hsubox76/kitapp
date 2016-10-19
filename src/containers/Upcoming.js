import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, ActivityIndicator } from 'react-native';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import EventList from '../components/EventList';
import Button from 'apsl-react-native-button';
import * as Actions from '../actions';

function mapStateToProps(state) {
  return {
    rotations: state.rotations,
    contacts: state.contacts,
    events: state.events,
    initialStoreLoaded: state.ui.isDataLoaded
      && _.every(state.ui.isDataLoaded, storeIsLoaded => storeIsLoaded),
    user: state.user
  };
}

function mapDispatchToActions(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

class UpcomingComponent extends Component {
  componentWillMount() {
    this.props.actions.updateEvents();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.rotations !== this.props.rotations) {
      this.props.actions.updateEvents();
    }
  }
  render() {
    if (!this.props.initialStoreLoaded) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <LinearGradient colors={['#F7F7F7', '#D7D7D7']} style={styles.container}>
        <Button onPress={this.props.actions.resetToTestData}>
          reset to test data
        </Button>
        <Button onPress={this.props.actions.schedulePushNotification}>
          send push notification
        </Button>
        {this.props.initialStoreLoaded &&
          <EventList events={this.props.events} />
        }
      </LinearGradient>
    );
  }
}

UpcomingComponent.propTypes = {
  rotations: PropTypes.object.isRequired,
  contacts: PropTypes.object.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  events: PropTypes.array.isRequired,
  initialStoreLoaded: PropTypes.bool,
  user: PropTypes.object
};

const styles = {
  container: {
    flex: 1
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default connect(mapStateToProps, mapDispatchToActions)(UpcomingComponent);
