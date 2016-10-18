import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactMethods from './ContactMethods';
import ContactRotations from './ContactRotations';
import * as Actions from '../../actions';

function mapStateToProps(state, ownProps) {
  const selectedContact = _.find(state.contacts, { id: ownProps.contactId });
  return {
    selectedContact,
    events: state.events,
    rotations: state.rotations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateContactMethod:
      (contactId, contactMethod) => dispatch(Actions.updateContactMethod(contactId, contactMethod)),
    deleteContact: (id) => dispatch(Actions.deleteContact(id))
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

class SingleContactView extends Component {
  onDeletePress() {
    const props = this.props;
    Alert.alert(
      'Delete Contact',
      `Delete contact ${props.selectedContact.name}?`,
      [
        { text: 'Cancel', onPress: () => {} },
        { text: 'OK', onPress: () => this.deleteContact() },
      ]
    );
  }
  deleteContact() {
    this.props.deleteContact(this.props.contactId)
      .then(() => {
        this.props.onNavigatePress();
      });
  }
  render() {
    let contents = null;
    const contact = this.props.selectedContact;

    if (contact) {
      const rotations = _.filter(this.props.rotations, rotation => rotation.contactId === contact.id);
      const daysUntilNextBirthday = getDaysUntilNextBirthday(contact.birthdate);

      contents = (
        <View style={styles.container}>
          <View style={styles.titleBar}>
            <TouchableOpacity onPress={this.props.onNavigatePress}>
              <View style={styles.navButton}>
                <Icon name="chevron-left" size={20} />
              </View>
            </TouchableOpacity>
            <View style={styles.contactName}>
              <Text style={styles.nameText}>{contact.name}</Text>
            </View>
            <TouchableOpacity onPress={() => this.onDeletePress()}>
              <View style={styles.navButton}>
                <Icon name="trash" size={20} />
              </View>
            </TouchableOpacity>
            <View style={styles.navButton} />
          </View>
          <View style={styles.birthdayBar}>
            <Text style={styles.birthdayBarText}>
              {_.has(contact, 'birthdate')
                ? `${daysUntilNextBirthday} days until next birthday`
                : 'you haven\'t entered a birthday for this person'}
            </Text>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <ContactRotations contact={contact} rotations={rotations} />
            <ContactMethods
              contact={contact}
              onContactMethodUpdate={
                // bind contact ID here, lower views need only worry about contactMethod
                (contactMethod) => this.props.updateContactMethod(contact.id, contactMethod)
              }
            />
          </ScrollView>
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

SingleContactView.propTypes = {
  selectedContact: PropTypes.object,
  contactId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onNavigatePress: PropTypes.func,
  events: PropTypes.array,
  rotations: PropTypes.object,
  updateContactMethod: PropTypes.func.isRequired,
  deleteContact: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleContactView);
