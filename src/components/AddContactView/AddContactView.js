import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { ContactsAndroid } from '../../CustomModules/CustomModules';
import ContactSearchResultsList from './ContactSearchResultsList';

class AddContactView extends Component {
  constructor(props) {
    super(props);
    this.renderResultsContainer = this.renderResultsContainer.bind(this);
    this.renderContact = this.renderContact.bind(this);
    this.state = {
      contact: null,
      searchInput: '',
      searchResults: []
    };
  }
  onInputChange(value) {
    this.setState({
      contact: null,
      searchInput: value
    });
    if (value !== '') {
      ContactsAndroid.getMatching(value, (err, contacts) => this.showContacts(contacts));
    }
  }
  setContact(contact) {
    this.setState({ contact });
  }
  showContacts(contacts) {
    this.setState({
      searchResults: contacts
    });
  }
  renderResultsContainer() {
    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.addContactButtonText}>
          {this.state.searchResults.length} matching contacts
        </Text>
        <ContactSearchResultsList
          results={this.state.searchResults}
          setContact={(contact) => this.setContact(contact)}
        />
      </View>
    );
  }
  renderContact() {
    return (
      <View>
        {_.map(this.state.contact, (val, key) => <Text>{key} : {val && JSON.stringify(val)}</Text>)}
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={this.props.onBack}>
          <Text>back</Text>
        </TouchableOpacity>
        <TextInput onChangeText={value => this.onInputChange(value)} />
        {!this.state.contact && this.renderResultsContainer()}
        {this.state.contact && this.renderContact()}
      </View>
    );
  }
}

AddContactView.propTypes = {
  onBack: PropTypes.func.isRequired,
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  resultsContainer: {
    flex: 1
  },
  back: {
    width: 40,
    height: 40,
    backgroundColor: '#ccc'
  },
  addViewText: {
    fontColor: '#666'
  }
};

export default AddContactView;
