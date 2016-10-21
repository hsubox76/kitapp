import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TabView from 'react-native-scrollable-tab-view';

import Upcoming from './Upcoming';
import Contacts from './Contacts';
import Settings from './Settings';
import TabBar from './TabBar';
import * as Actions from '../actions';

function mapStateToProps(state) {
  return {
    hasUnsavedChanges: state.ui.hasUnsavedChanges
  };
}

function mapDispatchToActions(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

class MainApp extends Component {
  componentWillMount() {
    this.props.actions.fetchStoreFromStorage();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.hasUnsavedChanges) {
      this.props.actions.writeStoreToStorage();
    }
  }
  render() {
    return (
      <TabView initialPage={0} renderTabBar={() => <TabBar />}>
        <Upcoming tabLabel="clock" />
        <Contacts tabLabel="torsos" />
        <Settings tabLabel="widget" />
      </TabView>
    );
  }
}

MainApp.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  hasUnsavedChanges: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToActions)(MainApp);
