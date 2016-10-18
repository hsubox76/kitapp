import React, { PropTypes } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NavHeader = (props) => (
  <View style={styles.titleBar}>
    <TouchableOpacity onPress={props.onBack}>
      <View style={styles.navButton}>
        <Icon name="chevron-left" size={20} />
      </View>
    </TouchableOpacity>
    <View style={styles.contactName}>
      <Text style={styles.nameText}>{props.title}</Text>
    </View>
    {props.onEdit ?
    (
      <TouchableOpacity onPress={props.onEdit}>
        <View style={styles.navButton}>
          <Icon name="trash" size={20} />
        </View>
      </TouchableOpacity>
    ) :
    (
      <View style={styles.navButton} />
    )}
  </View>
);

NavHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  title: PropTypes.string,
};

const styles = {
  titleBar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#FF5E3A'
  },
  navButton: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contactName: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameText: {
    fontSize: 24,
    color: '#FF5E3A'
  },
};

export default NavHeader;
