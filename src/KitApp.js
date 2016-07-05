import React, {Component, PropTypes} from 'react';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';
import TabView from 'react-native-scrollable-tab-view';
import { store } from './store';
import Upcoming from './containers/Upcoming';
import Contacts from './containers/Contacts';
import TabBar from './containers/TabBar';

class KitApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <TabView renderTabBar={() => <TabBar />}>
                    <Upcoming tabLabel="calendar" />
                    <Contacts tabLabel="book" />
                    <View tabLabel="cog" />
                </TabView>
            </Provider>
        );
    }
}

KitApp.propTypes = {

};

export default KitApp;
