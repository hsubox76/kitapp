import React, { Component, PropTypes } from 'react';
import { View, Text, Dimensions, TouchableOpacity, DatePickerAndroid } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { COLORS } from '../../data/constants';
import NavHeader from '../SharedComponents/NavHeader';
import { setEventTried, setEventTimestamp } from '../../actions';

const { width } = Dimensions.get('window');

function mapStateToProps(state, ownProps) {
  return {
    event: _.extend({},
      state.rotations[ownProps.rotationId].events[ownProps.eventIndex],
      { index: ownProps.eventIndex })
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setEventTried: (rotationId, eventIndex, tries) =>
      dispatch(setEventTried(rotationId, eventIndex, tries)),
    setEventTimestamp: (event, timestamp) =>
      dispatch(setEventTimestamp(event, timestamp))
  };
}

class SingleEventView extends Component {
  openDatePicker() {
    DatePickerAndroid.open({
      date: new Date(this.props.event.timestamp)
    })
    .then(({ action, year, month, day }) => {
      if (action !== DatePickerAndroid.dismissedAction) {
        const newTimestamp = moment().year(year)
          .month(month)
          .date(day)
          .valueOf();
        this.props.setEventTimestamp(this.props.event, newTimestamp);
      }
    });
  }
  render() {
    const event = this.props.event;
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
            <Text style={styles.contentText}>
              {moment(this.props.event.timestamp).format('LLL')}
            </Text>
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
        <View style={styles.row}>
          <View style={styles.label}>
            <Text style={styles.labelText}>Attempts:</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>{this.props.event.tries ? this.props.event.tries.length : 0}</Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => this.props.setEventTried(event.rotationId, event.index, event.tries || [])}
            style={[styles.button, styles.triedButton]}
          >
            <Text style={styles.buttonText}>Tried</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.postponeButton]}
            onPress={() => this.openDatePicker()}
          >
            <Text style={styles.buttonText}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.actionButton]}
          >
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.doneButton]}
          >
            <Text style={styles.doneButtonText}>Done!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

SingleEventView.propTypes = {
  eventIndex: PropTypes.number.isRequired,
  rotationId: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  setEventTried: PropTypes.func.isRequired,
  setEventTimestamp: PropTypes.func.isRequired,
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
  buttonRow: {
    flexDirection: 'row',
    width: width - 30,
    marginLeft: 15,
    marginTop: 15
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 0
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  },
  actionButton: {
    marginRight: 10,
    backgroundColor: COLORS.EVENTS.PRIMARY
  },
  cancelButton: {
    backgroundColor: '#999'
  },
  triedButton: {
    marginRight: 10,
    backgroundColor: COLORS.EVENTS.SECONDARY
  },
  postponeButton: {
    marginRight: 10,
    backgroundColor: COLORS.ROTATIONS.PRIMARY
  },
  doneButton: {
    backgroundColor: COLORS.ROTATIONS.SECONDARY
  },
  doneButtonText: {
    fontSize: 18,
    color: '#fff'
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleEventView);
