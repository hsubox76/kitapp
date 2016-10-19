import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, Navigator, ActivityIndicator, BackAndroid } from 'react-native';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import ContactList from '../components/ContactList';
import AddContactButton from '../components/AddContactButton';
import ImportContactView from '../components/ImportContactView/ImportContactView';
import SingleContactEdit from '../components/SingleContactView/SingleContactEdit';
import SingleContactView from '../components/SingleContactView/SingleContactView';
import SingleRotationView from '../components/SingleRotationView/SingleRotationView';
import SingleRotationEdit from '../components/SingleRotationView/SingleRotationEdit';
import { CONTACT_TYPE } from '../data/constants';

import * as Actions from '../actions';

function filterPrimaryContactsOnly(contacts) {
  return _.filter(contacts, (contact) => contact.connection === CONTACT_TYPE.PRIMARY);
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts,
    initialStoreLoaded: state.ui.isDataLoaded
      && _.every(state.ui.isDataLoaded, storeIsLoaded => storeIsLoaded),
  };
}

function mapDispatchToActions(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

class ContactsComponent extends Component {
  constructor() {
    super();
    this._navigator = null;
  }
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this._navigator && this._navigator.getCurrentRoutes().length > 1) {
        this._navigator.pop();
        return true;
      }
      return false;
    });
  }
  render() {
    const props = this.props;
    const routes = [
      { title: 'Contacts', index: 0 }
    ];
    if (!props.initialStoreLoaded) {
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
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={(route, navigator) => {
            if (route.index === 0) {
              return (
                <View>
                  <AddContactButton
                    onPress={() =>
                      navigator.push({ title: 'Add Contact', index: 2 })}
                  />
                  <ContactList
                    contacts={filterPrimaryContactsOnly(props.contacts)}
                    onAddContactPress={() => navigator.push({ title: 'Add New Contact', index: 3 })}
                    onNavigatePress={(title, contactId) =>
                      navigator.push({ title, contactId, index: 1 })}
                  />
                </View>
              );
            } else if (route.index === 1) {
              return (
                <SingleContactView
                  contactId={route.contactId}
                  onBack={() => navigator.pop()}
                  onEdit={(contactId) =>
                    navigator.push({ title: 'Edit Contact', index: 6, contactId })}
                  onRotationPress={(rotation) =>
                    navigator.push({ title: rotation.name, index: 4, rotationId: rotation.id })}
                />);
            } else if (route.index === 2) {
              return (
                <ImportContactView
                  addContact={props.actions.addContact}
                  onBack={() => navigator.pop()}
                />);
            } else if (route.index === 3) {
              return (
                <SingleContactEdit
                  onSaveContact={props.actions.addContact}
                  onBack={() => navigator.pop()}
                />
              );
            } else if (route.index === 4) {
              return (
                <SingleRotationView
                  onBack={() => navigator.pop()}
                  onEdit={(rotationId) =>
                    navigator.push({ title: 'edit schedule', index: 5, rotationId })}
                  rotationId={route.rotationId}
                />
              );
            } else if (route.index === 5) {
              return (
                <SingleRotationEdit
                  onBack={() => navigator.pop()}
                  rotationId={route.rotationId}
                />
              );
            } else if (route.index === 6) {
              return (
                <SingleContactEdit
                  onSaveContact={(contactData) =>
                    props.actions.updateContact(route.contactId, contactData)}
                  contactId={route.contactId}
                  onBack={() => navigator.pop()}
                  onBackAfterDelete={() => navigator.popN(2)}
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
  };
}

ContactsComponent.propTypes = {
  contacts: PropTypes.object.isRequired,
  actions: PropTypes.objectOf(PropTypes.func),
  initialStoreLoaded: PropTypes.bool,
  modalVisible: PropTypes.bool,
};

const styles = {
  container: {
    flex: 1,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default connect(mapStateToProps, mapDispatchToActions)(ContactsComponent);
