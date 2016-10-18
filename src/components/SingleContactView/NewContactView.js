import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, TouchableOpacity,
  Dimensions, DatePickerAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import _ from 'lodash';
import ContactMethods from './ContactMethods';
import { CONTACT_TYPE } from '../../data/constants';

const { width } = Dimensions.get('window');

class NewContactView extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      birthdate: null,
      contactMethods: []
    };
  }
  onNameValueChange(text) {
    this.setState({ name: text });
  }
  openDatePicker() {
    DatePickerAndroid.open({ date: new Date() })
      .then(({ action, year, month, day }) => {
        if (action !== DatePickerAndroid.dismissedAction) {
          this.setState({
            birthdate: moment().year(year)
                            .month(month)
                            .date(day)
          });
        }
      });
  }
  updateContactMethod(contactMethod) {
    if (_.find(this.state.contactMethods, { id: contactMethod.id })) {
      // TODO: update existing contact method (rare case in a new contact)
    } else {
      // add
      this.setState({
        contactMethods: this.state.contactMethods
          .concat(_.extend({}, contactMethod, { id: this.state.contactMethods.length }))
      });
    }
  }
  formatAndAddContact() {
    if (!this.state.name) {
      // need a warning message
      return;
    }
    const newContact = {
      name: this.state.name,
      connection: CONTACT_TYPE.PRIMARY
    };
    if (this.state.birthdate) {
      newContact.birthdate = this.state.birthdate.format('MM-DD-YYYY');
    }
    if (this.state.contactMethods.length > 0) {
      newContact.contactMethods = this.state.contactMethods;
    }
    this.props.addContact(newContact)
      .then(() => {
        this.props.onNavigatePress();
      })
      .catch(error => console.warn(error));
  }
  render() {
    const newContact = { contactMethods: this.state.contactMethods };
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <TouchableOpacity onPress={this.props.onNavigatePress}>
            <View style={styles.navButton}>
              <Icon name="chevron-left" size={20} />
            </View>
          </TouchableOpacity>
          <View style={styles.contactName}>
            <Text style={styles.nameText}>Add New Contact</Text>
          </View>
          <View style={styles.navButton} />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formRow}>
            <View style={styles.formLabel}><Text style={styles.formLabelText}>name</Text></View>
            <TextInput
              style={styles.formField}
              value={this.state.name}
              placeholder="enter contact name"
              onChangeText={text => this.onNameValueChange(text)}
            />
          </View>
          <View style={styles.formRow}>
            <View style={styles.formLabel}><Text style={styles.formLabelText}>birthdate</Text></View>
            <TouchableOpacity onPress={() => this.openDatePicker()}>
              <Text>{this.state.birthdate ? this.state.birthdate.format('LL') : 'choose birthdate'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ContactMethods contact={newContact} onContactMethodUpdate={(contactMethod) => this.updateContactMethod(contactMethod)} />
        <TouchableOpacity style={styles.saveContactButton} onPress={() => this.formatAndAddContact()}>
          <Text style={styles.buttonText}>Save New Contact</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

NewContactView.propTypes = {
  onNavigatePress: PropTypes.func,
  addContact: PropTypes.func,
  events: PropTypes.array,
  rotations: PropTypes.object,
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
  formContainer: {
    width: width - 20,
    marginLeft: 10
  },
  formRow: {
    flexDirection: 'row',
    width: width - 20,
    alignItems: 'center'
  },
  formLabel: {
    width: 70,
  },
  formLabelText: {
    color: '#FF5E3A'
  },
  formField: {
    flex: 1
  },
  saveContactButton: {
    width: width - 20,
    marginTop: 10,
    marginLeft: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FF5E3A'
  },
  buttonText: {
    color: '#fff'
  }
};

export default NewContactView;
