import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions } from 'react-native';
import _ from 'lodash';
import moment from 'moment';

const { width } = Dimensions.get('window');

function mapStateToProps(state, ownProps) {
  const family = _.map(ownProps.familyIds,
    person => _.extend({}, person, state.contacts[person.id]));
  return {
    family
  };
}

class FamilyView extends Component {
  getAgeText(birthdate) {
    if (!birthdate) {
      return '';
    }
    const birthMoment = moment(birthdate, 'MM-DD-YYYY');
    const years = Math.floor((moment() - birthMoment) / moment.duration(1, 'year'));
    return `age ${years}, birthday ${birthMoment.format('MMM DD')}`;
  }
  render() {
    const familyDisplay = this.props.family.length > 0
      ? _.map(this.props.family, person =>
        <View key={person.id} style={styles.familyRow}>
          <Text style={styles.familyText}>
            {person.name} ({person.title}) {this.getAgeText(person.birthdate)}
          </Text>
        </View>
        )
      :
      (
      <View style={styles.familyRow}>
        <Text style={styles.familyText}>no family members linked</Text>
      </View>
      );
    return (
      <View style={styles.container}>
        <View style={[styles.row, styles.header]}>
          <Text style={styles.headerText}>Family</Text>
        </View>
        <View style={[styles.row, styles.familyContainer]}>
          {familyDisplay}
        </View>
      </View>
    );
  }
}

FamilyView.propTypes = {
  family: PropTypes.array,
  familyIds: PropTypes.array.isRequired,
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
  header: {
    paddingHorizontal: 5,
    marginBottom: 8
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  familyContainer: {
    flexDirection: 'column'
  },
  familyRow: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginBottom: 5
  },
  familyText: {
    fontSize: 16
  },
};

export default connect(mapStateToProps)(FamilyView);
