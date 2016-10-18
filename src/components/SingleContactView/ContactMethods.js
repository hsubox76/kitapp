import React, { PropTypes, Component } from 'react';
import { TouchableOpacity, View, Dimensions, Text } from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactMethodBox from './ContactMethodBox';

const { width } = Dimensions.get('window');

class ContactMethods extends Component {
  constructor() {
    super();
    this.onMethodAdded = this.onMethodAdded.bind(this);
    this.state = {
      addingNewMethod: false
    };
  }
  onAddNewMethod() {
    this.setState({
      addingNewMethod: true
    });
  }
  onMethodAdded() {
    this.setState({
      addingNewMethod: false
    });
  }
  render() {
    const props = this.props;
    const contact = props.contact;
    const contactMethods = _.map(contact.contactMethods,
        (contactMethod, index) => (
          <View key={index} >
            <ContactMethodBox
              contactId={contact.id}
              contactMethod={contactMethod}
              onContactMethodUpdate={this.props.onContactMethodUpdate}
            />
          </View>
          )
        );
    return (
      <View>
        {contactMethods}
        {this.state.addingNewMethod
          ?
          <ContactMethodBox
            isEditing
            contactId={contact.id}
            onCloseEdit={this.onMethodAdded}
            onContactMethodUpdate={this.props.onContactMethodUpdate}
            contactMethod={{ id: contactMethods.length }}
          />
          :
          <TouchableOpacity style={styles.addMethodButton} onPress={() => this.onAddNewMethod()}>
            <Icon name="plus" size={20} style={styles.addMethodButtonText} />
            <Text>add contact method</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

ContactMethods.propTypes = {
  contact: PropTypes.object.isRequired,
  onContactMethodUpdate: PropTypes.func.isRequired,
};

const styles = {
  addMethodButton: {
    padding: 7,
    width: width - 10,
    marginTop: 10,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addMethodButtonText: {
    color: '#999'
  }
};

export default ContactMethods;
