import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Text, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { METHOD_TYPE, METHOD_TYPE_ICONS } from '../data/constants';


class EventBox extends Component {
  onPress() {
    switch (this.props.event.contactMethod.type) {
      case METHOD_TYPE.CALL:
        Linking.openURL(`tel:${this.props.event.contactMethod.data}`);
        break;
      case METHOD_TYPE.TEXT:
        Linking.openURL(`sms:${this.props.event.contactMethod.data}`);
        break;
      case METHOD_TYPE.EMAIL:
        Linking.openURL(`mailto:${this.props.event.contactMethod.data}`);
        break;
      default:
        console.warn('unknown contact method type');
    }
  }
  render() {
    const props = this.props;
    return (
      <LinearGradient colors={colorMap.call} style={styles.container}>
        <TouchableOpacity style={styles.container} onPress={() => this.onPress()}>
          <View style={styles.date}>
            <View style={styles.month}>
              <Text style={styles.monthText}>
                {moment(props.event.timestamp).format('MMM').toUpperCase()}
              </Text>
            </View>
            <View style={styles.day}>
              <Text style={styles.dayText}>{moment(props.event.timestamp).format('D')}</Text>
            </View>
          </View>
          <View style={styles.eventName}>
            <Text style={styles.eventNameText} numberOfLines={2}>
              {props.event.name} ({props.event.contactName})
            </Text>
          </View>
          <View style={styles.icon}>
            <Icon name={METHOD_TYPE_ICONS[props.event.contactMethod.type]} size={25} color="white" />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

EventBox.propTypes = {
  event: PropTypes.object,
};

const colorMap = {
  meet: ['#FF5E3A', '#FF2A68'],
  call: ['#74DF5F', '#09B014']
};

const styles = {
  container: {
    flex: 1,
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
};

export default EventBox;
