import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { METHOD_TYPE_ICONS } from '../../data/constants';

class ContactMethodBoxEdit extends Component {
  constructor(props) {
    super(props);
    this.onTextInputChange = this.onTextInputChange.bind(this);
    this.onOkButtonClick = this.onOkButtonClick.bind(this);
    const contactData = typeof props.contactMethod.data === 'string'
        ? props.contactMethod.data : props.contactMethod.data.street;
    this.state = {
      contactData,
      textInputValue: contactData
    };
  }
  onTextInputChange(text) {
    this.setState({ textInputValue: text });
  }
  onOkButtonClick() {
    this.props.updateContactMethod(this.props.contactId,
      Object.assign({}, this.props.contactMethod, {
        data: this.state.textInputValue
      })
    );
    this.props.closeForm();
  }
  render() {
    const props = this.props;
    return (
      <View style={styles.contactRow}>
        <View style={styles.contactTypeIcon}>
          <Icon
            name={METHOD_TYPE_ICONS[props.contactMethod.type]}
            size={20}
            style={styles.contactRowText}
          />
        </View>
        <View style={styles.contactRowData}>
          <TextInput
            numberOfLines={1}
            underlineColorAndroid="black"
            onChangeText={this.onTextInputChange}
            value={this.state.textInputValue}
            style={[styles.contactRowText, styles.contactRowDataText, styles.contactRowTextInput]}
          />
        </View>
        <View style={styles.editIcon}>
          <TouchableOpacity onPress={this.onOkButtonClick}>
            <Text>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ContactMethodBoxEdit.propTypes = {
  contactMethod: PropTypes.object,
  closeForm: PropTypes.func,
  updateContactMethod: PropTypes.func,
  contactId: PropTypes.number.isRequired,
};

const styles = {
  contactRow: {
    height: 60,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 2,
    borderWidth: 2,
    borderColor: '#FF5E3A'
  },
  contactTypeIcon: {
    width: 40,
    paddingLeft: 10
  },
  editIcon: {
    width: 40,
    paddingRight: 10,
    alignItems: 'flex-end'
  },
  contactRowData: {
    flex: 1,
    justifyContent: 'center'
  },
  contactRowText: {
    color: '#FF5E3A'
  },
  contactRowDataText: {
    fontSize: 16
  },
  contactRowTextInput: {
    paddingTop: 0,
    margin: 0,
    fontSize: 16,
    color: '#999'
  }
};

export default ContactMethodBoxEdit;
