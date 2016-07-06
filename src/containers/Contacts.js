import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ContactList from '../components/ContactList';

function mapStateToProps(state) {
  return {
    contacts: state.contacts
  };
}

const ContactsComponent = (props) => (
  <LinearGradient colors={['#F7F7F7', '#D7D7D7']} style={styles.container}>
    <ContactList contacts={props.contacts} />
  </LinearGradient>
);

ContactsComponent.propTypes = {
  contacts: PropTypes.array.isRequired
};

const styles = {
  container: {
    flex: 1,
  },
};

export default connect(mapStateToProps)(ContactsComponent);
