import React, { Component, PropTypes } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getTimestampOfNextEvent } from '../../utils/utils';
import { DATE_FORMAT } from '../../data/constants';
import NavHeader from '../SharedComponents/NavHeader';

const { width } = Dimensions.get('window');

function mapStateToProps(state, ownProps) {
  return {
    contact: _.find(state.contacts, { id: ownProps.rotation.contactId })
  };
}

class SingleRotationView extends Component {
  render() {
    const rotation = this.props.rotation;
    const contact = this.props.contact;
    return (
      <View style={styles.container}>
        <NavHeader
          title={`${rotation.name} (${contact.name})`}
          onBack={this.props.onBack}
        />
        <View style={styles.row}>
          <View style={styles.label}>
            <Text style={styles.labelText}>Frequency:</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>{`every ${rotation.every[0]} ${rotation.every[1]}`}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.label}>
            <Text style={styles.labelText}>Next:</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>{getTimestampOfNextEvent(rotation).format(DATE_FORMAT)}</Text>
          </View>
        </View>
      </View>
    );
  }
}

SingleRotationView.propTypes = {
  rotation: PropTypes.object,
  contact: PropTypes.object,
  onBack: PropTypes.func.isRequired,
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'row',
    width: width - 20,
    marginLeft: 10
  },
  label: {
    padding: 5
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  content: {
    padding: 5
  },
  contentText: {
    fontSize: 16
  }
};

export default connect(mapStateToProps)(SingleRotationView);
