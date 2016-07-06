
import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const editIcon = (<Icon name="edit" size={30} color="white" />);

const ContactBox = (props) => {
  const colors = colorMap['meet'];
  return (
    <LinearGradient colors={colors} style={styles.container}>
      <View style={styles.contactName}>
        <Text style={styles.contactNameText} numberOfLines={1}>
            {props.contact.name}
        </Text>
      </View>
      <View style={styles.icon}>
          {editIcon}
      </View>
    </LinearGradient>
  );
};

ContactBox.propTypes = {
  contact: PropTypes.object,
};

const colorMap = {
  'meet': ['#FF5E3A', '#FF2A68'],
  'call': ['#74DF5F', '#09B014']
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
  contactName: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
  },
  contactNameText: {
    color: 'white'
  },
  icon: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default ContactBox;
