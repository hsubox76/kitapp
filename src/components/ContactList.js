import React, { Component, PropTypes } from 'react';
import { View, ListView, Dimensions } from 'react-native';
import ContactBox from './ContactBox';
import ContactListHeader from './ContactListHeader';

const { width } = Dimensions.get('window');

class ContactList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(props.contacts)
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.contacts)
    });
  }
  render() {
    return (
      <ListView
        style={styles.listContainer}
        dataSource={this.state.dataSource}
        enableEmptySections
        renderHeader={() => (<ContactListHeader />)}
        renderRow={(contact) => (
          <ContactBox
            key={contact.id}
            contact={contact}
          />
        )}
        renderSeparator={(sectionID, rowID) => <View key={rowID} style={styles.separator} />}
      />
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired
};

const styles = {
  listContainer: {
    width: width - 10,
    margin: 5
  },
  separator: {
    height: 5
  }
};

export default ContactList;
