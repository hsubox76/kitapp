import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import TypePicker from './TypePicker';

class ContactMethodBoxEdit extends Component {
  constructor(props) {
    super(props);
    this.onTextInputChange = this.onTextInputChange.bind(this);
    this.onOkButtonClick = this.onOkButtonClick.bind(this);
    this.onPickerValueChange = this.onPickerValueChange.bind(this);
    const contactData = typeof props.contactMethod.data === 'string'
        ? props.contactMethod.data : props.contactMethod.data.street;
    this.state = {
      contactData,
      textInputValue: contactData,
      pickerValue: props.contactMethod.type
    };
  }
  onTextInputChange(text) {
    // should probably do type checking to see if methodType matches method format
    this.setState({ textInputValue: text });
  }
  onOkButtonClick() {
    this.props.updateContactMethod(this.props.contactId,
      Object.assign({}, this.props.contactMethod, {
        data: this.state.textInputValue,
        type: this.state.pickerValue
      })
    );
    this.props.closeForm();
  }
  onPickerValueChange(itemValue) {
    // should probably do type checking to see if methodType matches method format
    this.setState({ pickerValue: itemValue });
  }
  render() {
    return (
      <View style={styles.contactRow}>
        <View style={styles.contactTypePickerContainer}>
          <TypePicker
            onValueChange={this.onPickerValueChange}
            selectedValue={this.state.pickerValue}
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

const highlightColor = '#FF5E3A';

const styles = {
  contactRow: {
    height: 60,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 2,
    borderWidth: 2,
    borderColor: highlightColor
  },
  contactTypePickerContainer: {
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
    color: highlightColor
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
