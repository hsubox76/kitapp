import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { METHOD_TYPE, METHOD_TYPE_ICONS } from '../../data/constants';

const ContactMethodBoxDisplay = (props) => {
  const contactData = props.contactMethod.data;
  const contactDataDisplay = props.contactMethod.type !== METHOD_TYPE.POSTAL
    ? (
    <Text
      style={[styles.contactRowText, styles.contactRowDataText]}
      numberOfLines={1}
    >
      {contactData}
    </Text>
    )
    : (
    <View>
      <Text>{contactData.street}</Text>
      <Text>{contactData.city}, {contactData.state} {contactData.postal}</Text>
      <Text>{contactData.country}</Text>
    </View>
    );
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
        {contactDataDisplay}
      </View>
      <View style={styles.editIcon}>
        <TouchableOpacity onPress={props.onEditButtonClick}>
          <Icon name="pencil" size={20} style={styles.contactRowText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

ContactMethodBoxDisplay.propTypes = {
  contactMethod: PropTypes.object.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
};

const styles = {
  contactRow: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  contactTypeIcon: {
    width: 40,
    marginLeft: 20
  },
  editIcon: {
    width: 40,
    marginRight: 20,
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
