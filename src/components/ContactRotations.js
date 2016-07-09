import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { METHOD_TYPE, DATE_FORMAT } from '../data/constants';

const typeIcons = {
  [METHOD_TYPE.CALL]: 'phone',
  [METHOD_TYPE.TEXT]: 'comments',
  [METHOD_TYPE.EMAIL]: 'envelope',
  [METHOD_TYPE.POSTAL]: 'home',
};

const ContactRotations = (props) => {
  const contact = props.contact;
  const rotationViews = contact.rotations.map((rotation, index) => {
    const contactMethod = contact.contactMethods
      .find(currentContactMethod => currentContactMethod.id === rotation.contactMethodId);
    const everyMillis = moment.duration(...rotation.every).valueOf();
    const todayMillis = moment().valueOf();
    const startingMillis = moment(rotation.starting, DATE_FORMAT).valueOf();
    const millisSinceStart = todayMillis - startingMillis;
    const remainderMillis = millisSinceStart % everyMillis;
    const millisTillNext = everyMillis - remainderMillis;
    return (
      <LinearGradient style={styles.rotationRow} colors={['#C644FC', '#5856D6']} key={index}>
        <View style={styles.contactTypeIcon}>
          <Icon name={typeIcons[contactMethod.type]} size={20} style={styles.rotationRowText} />
        </View>
        <View>
          <Text style={[styles.rotationRowText, styles.rotationRowNameText]}>{rotation.name}</Text>
          <Text style={[styles.rotationRowText, styles.rotationRowDateText]}>
            every {moment.duration(...rotation.every).humanize()} ...
            next in {moment.duration(millisTillNext).humanize()}
          </Text>
        </View>
      </LinearGradient>
    );
  });
  return (
    <View>
      {rotationViews}
    </View>
  );
};

ContactRotations.propTypes = {
  contact: PropTypes.object.isRequired
};

const styles = {
  rotationRow: {
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
  rotationRowData: {
    flex: 1
  },
  rotationRowText: {
    color: 'white'
  },
  rotationRowNameText: {
    fontSize: 14
  },
  rotationRowDateText: {
    fontSize: 10
  }
};

export default ContactRotations;
