import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

const phoneIcon = (<Icon name="phone" size={30} color="white" />);

const EventBox = (props) => (
  <LinearGradient colors={colorMap.call} style={styles.container}>
    <View style={styles.date}>
      <View style={styles.month}>
        <Text style={styles.monthText}>
          {moment(props.event.time).format('MMM').toUpperCase()}
        </Text>
      </View>
      <View style={styles.day}>
        <Text style={styles.dayText}>{moment(props.event.time).format('D')}</Text>
      </View>
    </View>
    <View style={styles.eventName}>
      <Text style={styles.eventNameText} numberOfLines={2}>
        {props.event.name}
      </Text>
    </View>
    <View style={styles.icon}>
      {phoneIcon}
    </View>
  </LinearGradient>
);

EventBox.propTypes = {
  event: PropTypes.object,
};

const colorMap = {
  meet: ['#FF5E3A', '#FF2A68'],
  call: ['#74DF5F', '#09B014']
};

const styles = {
  container: {
    height: 50,
    flexDirection: 'row'
  },
  date: {
    width: 50,
    alignItems: 'center'
  },
  month: {
    marginTop: 3
  },
  day: {
    borderWidth: 1,
    borderColor: 'white',
    height: 26,
    width: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center'
  },
  monthText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold'
  },
  dayText: {
    color: 'white'
  },
  eventName: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
  },
  eventNameText: {
    color: 'white'
  },
  icon: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default EventBox;
