import React, { Component, PropTypes } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { COLORS } from '../../data/constants';
import NavHeader from '../SharedComponents/NavHeader';

const { width } = Dimensions.get('window');

function mapStateToProps(state, ownProps) {
  return {};
}

class SingleEventView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavHeader
          title="Event"
          onBack={this.props.onBack}
          color={COLORS.EVENTS.SECONDARY}
        />
        <View style={styles.row}>
          <View style={styles.label}>
            <Text style={styles.labelText}>Name:</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>{this.props.event.name}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.label}>
            <Text style={styles.labelText}>Scheduled for:</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>{moment(this.props.event.timestamp).format('LLL')}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.label}>
            <Text style={styles.labelText}>Status:</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>{this.props.event.status}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.actionButton}
        >
          <Text style={styles.actionButtonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.doneButton}
        >
          <Text style={styles.doneButtonText}>Done!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

SingleEventView.propTypes = {
  event: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'column',
    width: width - 20,
    marginLeft: 10,
    marginVertical: 10
  },
  label: {
    paddingHorizontal: 5,
    marginBottom: 5
  },
  labelText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  subContent: {
    marginRight: 10
  },
  contentText: {
    fontSize: 18
  },
  actionButton: {
    width: width - 30,
    marginLeft: 15,
    marginTop: 10,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.EVENTS.PRIMARY
  },
  actionButtonText: {
    fontSize: 18,
    color: '#fff'
  },
  doneButton: {
    width: width - 30,
    marginLeft: 15,
    marginTop: 10,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.ROTATIONS.SECONDARY
  },
  doneButtonText: {
    fontSize: 18,
    color: '#fff'
  }
};

export default connect(mapStateToProps)(SingleEventView);
