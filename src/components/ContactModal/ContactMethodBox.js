import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { METHOD_TYPE_ICONS } from '../../data/constants';
import Button from 'apsl-react-native-button';

class ContactMethodBox extends Component {
  constructor(props) {
    super(props);
    this.setEditingOn = this.setEditingOn.bind(this);
    this.setEditingOff = this.setEditingOff.bind(this);
    this.onTextInputChange = this.onTextInputChange.bind(this);
    this.state = {
      isEditing: false,
      contactData: typeof props.contactData === 'string'
              ? props.contactData : props.contactData.street
    };
  }
  onTextInputChange(text) {
    this.setState({ textInputValue: text });
  }
  setEditingOn() {
    this.setState({
      isEditing: true,
      textInputValue: this.state.contactData
    });
  }
  setEditingOff() {
    this.setState({
      isEditing: false,
      contactData: this.state.textInputValue
    });
  }
  render() {
    const props = this.props;
    if (this.state.isEditing) {
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
              underlineColorAndroid="transparent"
              onChangeText={this.onTextInputChange}
              value={this.state.textInputValue}
              style={[styles.contactRowText, styles.contactRowDataText, styles.contactRowTextInput]}
            />
          </View>
          <View style={styles.editIcon}>
            <Button onPress={this.setEditingOff}>OK</Button>
          </View>
        </View>
      );
    }
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
          <Text
            style={[styles.contactRowText, styles.contactRowDataText]}
            numberOfLines={1}
          >
            {this.state.contactData}
          </Text>
        </View>
        <View style={styles.editIcon}>
          <TouchableOpacity onPress={this.setEditingOn}>
            <Icon name="pencil" size={20} style={styles.contactRowText} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ContactMethodBox.propTypes = {
  contactMethod: PropTypes.object,
  contactData: PropTypes.object,
};

const styles = {
  contactRow: {
    height: 40,
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
    padding: 0,
    margin: 0,
    fontSize: 16,
    color: '#999'
  }
};

export default ContactMethodBox;
