import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, ActivityIndicator, Navigator, BackAndroid } from 'react-native';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import EventList from '../components/EventList/EventList';
import SingleEventView from '../components/SingleEventView/SingleEventView';
import * as Actions from '../actions';

function populateEventDetails(rotations, contacts) {
  return _(rotations)
  .map(rotation => {
    const contact = _.find(contacts,
      (con) => con.id === rotation.contactId);
    const contactMethod = _.find(contact.contactMethods,
        cMethod => cMethod.id === rotation.contactMethodId);
    return _.map(rotation.events, (event, index) => _.extend({}, event, {
      index,
      contactId: rotation.contactId,
      contactName: contact.name,
      contactMethod,
      name: rotation.name,
      // flag events more than a year from now to format differently
    }));
  })
  .flatten()
  .sortBy('timestamp')
  .value();
}

function mapStateToProps(state) {
  return {
    rotations: state.rotations,
    contacts: state.contacts,
    events: populateEventDetails(state.rotations, state.contacts),
    lastUpdated: state.ui.lastUpdated,
    user: state.user,
    pageIndex: state.ui.pageIndex,
  };
}

function mapDispatchToActions(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

class UpcomingComponent extends Component {
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this._navigator && this._navigator.getCurrentRoutes().length > 1) {
        this._navigator.pop();
        return true;
      }
      return false;
    });
  }
  componentWillReceiveProps(nextProps) {
    if (_.isEmpty(this.props.rotations) && !_.isEmpty(nextProps.rotations)) {
      this.props.actions.generateAllEvents('update');
    }
    if (nextProps.pageIndex !== this.props.pageIndex && nextProps.pageIndex !== 0) {
      this._navigator.popToTop();
    }
  }
  render() {
    if (!this.props.lastUpdated.contacts && !this.props.lastUpdated.rotations) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <LinearGradient colors={['#F7F7F7', '#D7D7D7']} style={styles.container}>
        <Navigator
          ref={(nav) => { this._navigator = nav; }}
          initialRoute={{ title: 'Upcoming', index: 0 }}
          renderScene={(route, navigator) => {
            if (route.index === 0) {
              return (
                <EventList
                  events={this.props.events}
                  onEventPress={(event) => navigator.push({ title: 'event', index: 1, event })}
                />
              );
            } else if (route.index === 1) {
              return (
                <SingleEventView
                  eventIndex={route.event.index}
                  rotationId={route.event.rotationId}
                  onBack={() => navigator.pop()}
                />
              );
            }
            return <View><Text>oops unexpected route</Text></View>;
          }}
          configureScene={() =>
            Navigator.SceneConfigs.PushFromRight}
        />
      </LinearGradient>
    );
  }
}

UpcomingComponent.propTypes = {
  rotations: PropTypes.object.isRequired,
  contacts: PropTypes.object.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  events: PropTypes.array.isRequired,
  lastUpdated: PropTypes.object,
  user: PropTypes.object,
  pageIndex: PropTypes.number,
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
