import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navigator, Text, TouchableOpacity, TouchableHighlight } from 'react-native'; 
import LinearGradient from 'react-native-linear-gradient';
import ContactList from '../components/ContactList';
import { CONTACT_TYPE } from '../data/constants';

import * as Actions from '../actions';
import ContactModal from '../components/ContactModal/ContactModal';

function filterPrimaryContactsOnly(contacts) {
  return contacts.filter((contact) => contact.connection === CONTACT_TYPE.PRIMARY);
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts,
    modalVisible: state.ui.contactModalVisible,
    initialStoreLoaded: state.ui.initialStoreLoaded
  };
}

function mapDispatchToActions(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

const ContactsComponent = (props) => {
  const routes = [
    { title: 'Contacts', index: 0 }
  ];
  return (
    <LinearGradient colors={['#F7F7F7', '#D7D7D7']} style={styles.container}>
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => {
          if (route.index === 0) {
            return (
              <ContactList
                contacts={filterPrimaryContactsOnly(props.contacts)}
                onNavigatePress={(title, contact) => navigator.push({ title, contact, index: 1 })}
              />
            );
          }
          return (
            <ContactModal
              selectedContact={route.contact}
              onNavigatePress={() => navigator.pop()}
            />);
        }}
        configureScene={() =>
          Navigator.SceneConfigs.PushFromRight}
      />
      {/* props.modalVisible
        ? (
        <ContactModal
          visible={props.modalVisible}
          onCloseModal={() => { props.actions.setModalVisibility(false); }}
        />
        )
        : null}
      {true &&
        <ContactList
          contacts={filterPrimaryContactsOnly(props.contacts)}
        />
      */}
    </LinearGradient>
  );
}

ContactsComponent.propTypes = {
  contacts: PropTypes.array.isRequired,
  actions: PropTypes.objectOf(PropTypes.func),
  initialStoreLoaded: PropTypes.bool,
  modalVisible: PropTypes.bool,
};

const styles = {
  container: {
    flex: 1,
  },
};

export default connect(mapStateToProps, mapDispatchToActions)(ContactsComponent);
