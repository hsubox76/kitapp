import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { METHOD_TYPE } from '../data/constants';

const typeIcons = {
  [METHOD_TYPE.CALL]: 'phone',
  [METHOD_TYPE.TEXT]: 'comments',
  [METHOD_TYPE.EMAIL]: 'envelope',
  [METHOD_TYPE.POSTAL]: 'home',
};

const ContactEvents = (props) => {
  const contact = props.contact;
  const events = props.events.filter((event) => event.contactId === contact.id);
  const eventViews = events.map((event, index) => (
    <LinearGradient style={styles.eventRow} colors={['#74DF5F', '#09B014']} key={index}>
      <View style={styles.contactTypeIcon}>
        <Icon name={typeIcons[event.method]} size={20} style={styles.eventRowText} />
      </View>
      <View>
        <Text style={[styles.eventRowText, styles.eventRowNameText]}>{event.name}</Text>
        <Text style={[styles.eventRowText, styles.eventRowDateText]}>
          {moment(event.time).format('LLL')}
        </Text>
      </View>
    </LinearGradient>
  ));
  return (
    <View>
      {eventViews}
    </View>
  );
};

ContactEvents.propTypes = {
  contact: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired
};

const styles = {
  eventRow: {
    height: 50,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 2
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
  eventRowData: {
    flex: 1
  },
  eventRowText: {
    color: 'white'
  },
  eventRowNameText: {
    fontSize: 14
  },
  eventRowDateText: {
    fontSize: 10
  }
};

export default ContactEvents;
