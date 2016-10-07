import React, { Component, PropTypes } from 'react';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import { View, ListView,
  TouchableOpacity, TouchableWithoutFeedback, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

class ContactSearchResultsList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(props.results)
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.results)
    });
  }
  render() {
    return (
      <TouchableWithoutFeedback style={styles.container} onPress={() => dismissKeyboard()}>
        <ListView
          style={styles.listContainer}
          dataSource={this.state.dataSource}
          enableEmptySections
          renderRow={(result, index) => (
            <TouchableOpacity
              key={index}
              style={styles.result}
              onPress={() => this.props.setContact(result)}
            >
              <Text>{result.givenName}</Text>
            </TouchableOpacity>
          )}
          renderSeparator={(sectionID, rowID) => <View key={rowID} style={styles.separator} />}
        />
      </TouchableWithoutFeedback>
    );
  }
}

ContactSearchResultsList.propTypes = {
  results: PropTypes.array,
  setContact: PropTypes.func.isRequired,
};

const styles = {
  container: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    width: width - 10
  },
  result: {
    backgroundColor: '#ccc',
    height: 30,
  },
  separator: {
    height: 1,
    backgroundColor: '#333'
  }
};

export default ContactSearchResultsList;
