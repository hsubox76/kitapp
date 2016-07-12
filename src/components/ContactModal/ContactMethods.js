import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { METHOD_TYPE } from '../../data/constants';

const typeIcons = {
  [METHOD_TYPE.CALL]: 'phone',
  [METHOD_TYPE.TEXT]: 'comments',
  [METHOD_TYPE.EMAIL]: 'envelope',
  [METHOD_TYPE.POSTAL]: 'home',
};

const ContactMethods = (props) => {
  const contact = props.contact;
  const contactMethods = contact.contactMethods
      .map((contactMethod, index) => {
        const contactData = contact.contactData
          .find(contactDataItem =>
            contactDataItem.id === contactMethod.useContactDataId)
          .data;
        return (
          <View
            key={index}
            style={styles.contactRow}
          >
            <View style={styles.contactTypeIcon}>
              <Icon
                name={typeIcons[contactMethod.type]}
                size={20}
                style={styles.contactRowText}
              />
            </View>
            <View style={styles.contactRowData}>
              <Text
                style={[styles.contactRowText, styles.contactRowDataText]}
                numberOfLines={1}
              >
                {typeof contactData === 'string'
                  ? contactData : contactData.street}
              </Text>
            </View>
            <View style={styles.editIcon}>
              <Icon name="pencil" size={20} style={styles.contactRowText} />
            </View>
          </View>
        );
      });
  return (
    <View>
      {contactMethods}
    </View>
  );
};

ContactMethods.propTypes = {
  contact: PropTypes.object.isRequired
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
    flex: 1
  },
  contactRowText: {
    color: '#FF5E3A'
  },
  contactRowDataText: {
    fontSize: 16
  }
};

export default ContactMethods;
