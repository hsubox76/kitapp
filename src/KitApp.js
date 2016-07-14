// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import TabView from 'react-native-scrollable-tab-view';
import { store } from './store';
import Upcoming from './containers/Upcoming';
import Contacts from './containers/Contacts';
import TabBar from './containers/TabBar';

const KitApp = () => (
  <Provider store={store}>
    <TabView initialPage={0} renderTabBar={() => <TabBar />}>
      <Upcoming tabLabel="clock" />
      <Contacts tabLabel="torsos" />
      <View tabLabel="widget" />
    </TabView>
  </Provider>
);

export default KitApp;
