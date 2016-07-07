import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import ContactList from '../components/ContactList';
import { CONTACT_TYPE } from '../data/contacts';

import * as Actions from '../actions';
import ContactModal from '../components/ContactModal';

function filterPrimaryContactsOnly(contacts) {
  return contacts.filter((contact) => contact.connection === CONTACT_TYPE.PRIMARY);
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts,
    modalVisible: state.ui.contactModalVisible
  };
}

function mapDispatchToActions(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

const ContactsComponent = (props) => (
  <LinearGradient colors={['#F7F7F7', '#D7D7D7']} style={styles.container}>
    {props.modalVisible
      ? (
      <ContactModal
        visible={props.modalVisible}
        onCloseModal={() => { props.actions.setModalVisibility(false); }}
      />
      )
      : null}
    <ContactList
      contacts={filterPrimaryContactsOnly(props.contacts)}
    />
  </LinearGradient>
);

ContactsComponent.propTypes = {
  contacts: PropTypes.array.isRequired,
  actions: PropTypes.objectOf(PropTypes.func)
};

const styles = {
  container: {
    flex: 1,
  },
};

export default connect(mapStateToProps, mapDispatchToActions)(ContactsComponent);
