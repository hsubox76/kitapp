import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { METHOD_TYPE_ICONS, DATE_FORMAT } from '../../data/constants';

const ContactRotations = (props) => {
  const contact = props.contact;
  const rotationViews = props.rotations.map((rotation, index) => {
    const contactMethod = _.find(contact.contactMethods,
      currentContactMethod => currentContactMethod.id === rotation.contactMethodId);
    const everyMillis = moment.duration(...rotation.every).valueOf();
    const todayMillis = moment().valueOf();
    const startingMillis = moment(rotation.starting, DATE_FORMAT).valueOf();
    const millisSinceStart = todayMillis - startingMillis;
    const remainderMillis = millisSinceStart % everyMillis;
    const millisTillNext = everyMillis - remainderMillis;
    return (
      <LinearGradient style={styles.rotationRow} colors={['#FF9500', '#FF5E3A']} key={index}>
        <View style={styles.contactTypeIcon}>
          <Icon
            name={METHOD_TYPE_ICONS[contactMethod.type]}
            size={20}
            style={styles.rotationRowText}
          />
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
  contact: PropTypes.object.isRequired,
  rotations: PropTypes.array.isRequired
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
