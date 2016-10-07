import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { METHOD_TYPE_ICONS } from '../../data/constants';

const ContactMethodBoxDisplay = (props) => (
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
        {props.contactMethod.data.toString()}
      </Text>
    </View>
    <View style={styles.editIcon}>
      <TouchableOpacity onPress={props.onEditButtonClick}>
        <Icon name="pencil" size={20} style={styles.contactRowText} />
      </TouchableOpacity>
    </View>
  </View>
);

ContactMethodBoxDisplay.propTypes = {
  contactMethod: PropTypes.object.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
};

const styles = {
  contactRow: {
    height: 40,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
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
    color: '#666'
  },
  contactRowDataText: {
    fontSize: 16
  }
};

export default ContactMethodBoxDisplay;
