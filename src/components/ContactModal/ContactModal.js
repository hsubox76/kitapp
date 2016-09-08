import React, { Component, PropTypes } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactMethods from './ContactMethods';
import ContactRotations from './ContactRotations';
import { MenuContext } from 'react-native-menu';

function getContactById(contacts, contactId) {
  return contacts.find((contact) => contact.id === contactId);
}

function mapStateToProps(state) {
  const selectedContact = getContactById(state.contacts, state.ui.selectedContactId);
  const rotations = state.rotations.filter((rotation) => rotation.contactId === selectedContact.id);
  return {
    events: state.events,
    selectedContact,
    rotations
  };
}

function getDaysUntilNextBirthday(birthdate) {
  const birthdateMoment = moment(birthdate, 'MM-DD-YYYY');
  const today = moment();
  const nextBirthday = moment().month(birthdateMoment.month()).date(birthdateMoment.date());
  if (nextBirthday.isBefore(today)) {
    nextBirthday.year(today.year() + 1);
  } else {
    nextBirthday.year(today.year());
  }
  return nextBirthday.diff(today, 'days');
}

class ContactModal extends Component {
  render() {
    let contents = null;
    const contact = this.props.selectedContact;

    if (contact) {
      const daysUntilNextBirthday
        = getDaysUntilNextBirthday(contact.birthdate);



      contents = (
        <View style={styles.container}>
          <View style={styles.titleBar}>
            <TouchableOpacity onPress={this.props.onCloseModal}>
              <View style={styles.navButton}>
                <Icon name="chevron-left" size={20} />
              </View>
            </TouchableOpacity>
            <View style={styles.contactName}>
              <Text style={styles.nameText}>{contact.name}</Text>
            </View>
            <View style={styles.navButton} />
          </View>
          <View style={styles.birthdayBar}>
            <Text style={styles.birthdayBarText}>
              {daysUntilNextBirthday} days until next birthday
            </Text>
          </View>
          <ContactRotations contact={contact} rotations={this.props.rotations} />
          <ContactMethods contact={contact} />
        </View>
      );
    }

    return (
      <Modal
        visible={this.props.visible && !!contact}
        animationType="fade"
        onRequestClose={this.props.onCloseModal}
      >
        <MenuContext>
          {contents}
        </MenuContext>
      </Modal>
    );
  }
}

ContactModal.propTypes = {
  onCloseModal: PropTypes.func,
  visible: PropTypes.bool,
  selectedContact: PropTypes.object,
  events: PropTypes.array,
  rotations: PropTypes.array
};

const styles = {
  container: {
    flex: 1
  },
  titleBar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#FF5E3A'
  },
  navButton: {
    width: 20,
    alignItems: 'center'
  },
  contactName: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameText: {
    fontSize: 24,
    color: '#FF5E3A'
  },
  birthdayBar: {
    height: 30,
    alignItems: 'center',
    padding: 5,
    marginTop: 5,
    marginBottom: 2,
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: '#999'
  },
  birthdayBarText: {
    fontSize: 14,
    color: 'white'
  }
};

export default connect(mapStateToProps)(ContactModal);
