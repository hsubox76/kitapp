import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import _ from 'lodash';
import { ContactsAndroid } from '../CustomModules/CustomModules';

class AddContactButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      length: '--',
      names: []
    };
  }
  onInputChange(value) {
    this.setState({
      searchInput: value
    });
    if (value !== '') {
      ContactsAndroid.getMatching(value, (err, contacts) => this.showContacts(contacts));
    }
  }
  showContacts(contacts) {
    this.setState({
      length: contacts.length,
      names: _.map(contacts, contact => contact.givenName)
    });
  }
  render() {
    return (
      <View>
        <TextInput onChangeText={value => this.onInputChange(value)} />
        <View
          style={styles.addContactButton}
        >
          <Text style={styles.addContactButtonText}>+ Add A Contact</Text>
          <Text style={styles.addContactButtonText}>contacts length: {this.state.length}</Text>
          {_.map(this.state.names, name => <Text style={styles.addContactButtonText}>{name}</Text>)}
        </View>
      </View>
    );
  }
}

AddContactButton.propTypes = {

};

const styles = {
  addContactButton: {
    backgroundColor: '#555',
    margin: 5,
    padding: 10
  },
  addContactButtonText: {
    color: '#fff'
  }
};

export default AddContactButton;
