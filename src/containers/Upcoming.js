import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import EventList from '../components/EventList';
import Button from 'apsl-react-native-button';
import * as Actions from '../actions';
import firebaseApp from '../api/firebase';

function mapStateToProps(state) {
  return {
    rotations: state.rotations,
    contacts: state.contacts,
    events: state.events,
    initialStoreLoaded: state.ui.initialStoreLoaded,
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
  writeToFirebase() {
    firebaseApp.database().ref('users/testuser').set({
      username: 'test_user',
      email: 'test@user.com'
    })
    .then(() => {
      console.warn('wrote to firebase');
    });
  }
  render() {
    return (
      <LinearGradient colors={['#F7F7F7', '#D7D7D7']} style={styles.container}>
        <Button onPress={this.props.actions.resetToTestData}>
          reset to test data
        </Button>
        <Button onPress={this.writeToFirebase}>
          write to firebase
        </Button>
        {this.props.initialStoreLoaded &&
          <EventList events={this.props.events} />
        }
      </LinearGradient>
    );
  }
}

UpcomingComponent.propTypes = {
  rotations: PropTypes.array.isRequired,
  contacts: PropTypes.array.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  events: PropTypes.array.isRequired,
  initialStoreLoaded: PropTypes.bool,
  user: PropTypes.object
};

const styles = {
  container: {
    flex: 1
  }
};

export default connect(mapStateToProps, mapDispatchToActions)(UpcomingComponent);
