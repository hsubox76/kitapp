import React, { Component, PropTypes } from 'react';
import { View, ListView, Dimensions } from 'react-native';
import EventBox from './EventBox';

const { width } = Dimensions.get('window');

class EventList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(props.events)
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.events)
    });
  }
  render() {
    return (
      <ListView
        style={styles.listContainer}
        dataSource={this.state.dataSource}
        renderRow={(event) => <EventBox key={event.id} event={event} />}
        renderSeparator={(sectionID, rowID) => <View key={rowID} style={styles.separator} />}
      />
    );
  }
}

EventList.propTypes = {
  events: PropTypes.array.isRequired
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

export default EventList;
