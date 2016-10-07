import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactMethods from './ContactMethods';
import ContactRotations from './ContactRotations';

function mapStateToProps(state) {
  return {
    events: state.events,
    rotations: state.rotations,
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
    const rotations = this.props.rotations.filter((rotation) => rotation.contactId === contact.id);

    if (contact) {
      const daysUntilNextBirthday
        = getDaysUntilNextBirthday(contact.birthdate);

      contents = (
        <View>
          <View style={styles.titleBar}>
            <TouchableOpacity onPress={this.props.onNavigatePress}>
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
          <ContactRotations contact={contact} rotations={rotations} />
          <ContactMethods contact={contact} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {contents}
      </View>
    );
  }
}

ContactModal.propTypes = {
  selectedContact: PropTypes.object,
  onNavigatePress: PropTypes.func,
  events: PropTypes.array,
  rotations: PropTypes.array,
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
    marginLeft: 10,
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
