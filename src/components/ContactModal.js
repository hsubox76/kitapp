import React, { Component, PropTypes } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

function getContactById(contacts, contactId) {
  return contacts.find((contact) => contact.id === contactId);
}

function mapStateToProps(state) {
  return {
    selectedContact: getContactById(state.contacts, state.ui.selectedContactId)
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

    if (this.props.selectedContact) {
      const daysUntilNextBirthday
        = getDaysUntilNextBirthday(this.props.selectedContact.birthdate);
      contents = (
        <View style={styles.container}>
          <View style={styles.titleBar}>
            <TouchableOpacity onPress={this.props.onCloseModal}>
              <View style={styles.navButton}>
                <Icon name="chevron-left" size={20} />
              </View>
            </TouchableOpacity>
            <View style={styles.contactName}>
              <Text style={styles.nameText}>{this.props.selectedContact.name}</Text>
            </View>
            <View style={styles.navButton} />
          </View>
          <Text>{daysUntilNextBirthday} days until next birthday</Text>
        </View>
      );
    }

    return (
      <Modal
        visible={this.props.visible && !!this.props.selectedContact}
        animationType="fade"
        onRequestClose={this.props.onCloseModal}
      >
        {contents}
      </Modal>
    );
  }
}

ContactModal.propTypes = {
  onCloseModal: PropTypes.func,
  visible: PropTypes.bool,
  selectedContact: PropTypes.object
};

const styles = {
  container: {
    flex: 1
  },
  titleBar: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
    fontSize: 20
  }
};

export default connect(mapStateToProps)(ContactModal);
