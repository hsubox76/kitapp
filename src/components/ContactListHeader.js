import React from 'react';
import { View, Text } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const ContactListHeader = () => (
  <View colors={['#DBDDDE', '#898C90']} style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Contacts</Text>
    </View>
    <View style={styles.iconContainer}>
      <Icon name="md-add-circle" size={25} color={mainColor} />
    </View>
  </View>
);

const mainColor = '#FF5E3A';

const styles = {
  container: {
    height: 40,
    flexDirection: 'row',
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: mainColor
  },
  titleContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    color: mainColor
  },
  iconContainer: {
    flex: 0.3,
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
};

export default ContactListHeader;
