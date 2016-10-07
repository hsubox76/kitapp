import React, { PropTypes } from 'react';
import { View } from 'react-native';
import ContactMethodBox from './ContactMethodBox';

const ContactMethods = (props) => {
  const contact = props.contact;
  const contactMethods = contact.contactMethods
      .map((contactMethod, index) => {
        return (
          <View key={index} >
            <ContactMethodBox contactId={contact.id} contactMethod={contactMethod} />
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
