import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import TabView from 'react-native-scrollable-tab-view';

import Upcoming from './Upcoming';
import Contacts from './Contacts';
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

class Main extends Component {
  componentWillMount() {
    // this.props.actions.writeStoreToStorage();
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
        <View tabLabel="widget" />
      </TabView>
    );
  }
}

Main.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  hasUnsavedChanges: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToActions)(Main);
