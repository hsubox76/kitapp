import React, { PropTypes } from 'react';
import { View } from 'react-native';
import ContactMethodBox from './ContactMethodBox';

const ContactMethods = (props) => {
  const contact = props.contact;
  const contactMethods = contact.contactMethods
      .map((contactMethod, index) => {
        const contactData = contact.contactData
          .find(contactDataItem =>
            contactDataItem.id === contactMethod.useContactDataId)
          .data;
        return (
          <View key={index} >
            <ContactMethodBox contactMethod={contactMethod} contactData={contactData} />
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

export default ContactMethods;
