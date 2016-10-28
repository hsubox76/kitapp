import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, View, Text, Picker, TextInput, Dimensions,
  TouchableHighlight, TouchableOpacity, DatePickerAndroid } from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, CONTACT_TYPE } from '../../data/constants';

const { width } = Dimensions.get('window');

function mapStateToProps(state) {
  return { contacts: state.contacts };
}

class FamilyEditModal extends Component {
  constructor(props) {
    super(props);
    if (props.person) {
      this.state = {
        selectedId: props.person.id,
        isPrimary: props.person.connection === CONTACT_TYPE.PRIMARY,
        name: props.person.name,
        title: props.person.title,
        birthdate: moment(props.person.birthdate, 'MM-DD-YYYY')
      };
    } else {
      this.state = {
        name: '',
        title: '',
        selectedId: null
      };
    }
  }
  onOkClick() {
    const props = this.props;
    if (props.person) {
      // if editing
      props.editFamilyMember({
        index: props.person.index,
        name: this.state.name,
        birthdate: this.state.birthdate.format('MM-DD-YYYY'),
        title: this.state.title,
        connection: this.state.isPrimary ? CONTACT_TYPE.PRIMARY : CONTACT_TYPE.SECONDARY
      });
      props.onRequestClose();
    } else {
      // if new
    }
  }
  openDatePicker() {
    DatePickerAndroid.open({
      date: this.state.birthdate ? this.state.birthdate.valueOf() : new Date()
    })
    .then(({ action, year, month, day }) => {
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({
          birthdate: moment().year(year)
                          .month(month)
                          .date(day)
        });
      }
    });
  }
  render() {
    const picker = (
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={this.state.selectedId}
          onValueChange={(val) => this.setState({ selectedId: val })}
        >
          {_(this.props.contacts)
            .filter(contact => contact.id !== this.props.contactId)
            .map(contact =>
              <Picker.Item key={contact.id} value={contact.id} label={contact.name} />)
            .value()
          }
        </Picker>
      </View>
    );
    const manualForm = (
      <View style={styles.form}>
        <View style={styles.formRow}>
          <View style={styles.label}>
            <Text style={styles.labelText}>name</Text>
          </View>
          <TextInput
            style={styles.nameInput}
            value={this.state.name}
            placeholder="name"
            onChangeText={(val) => this.setState({ name: val })}
          />
        </View>
        <View style={styles.formRow}>
          <View style={styles.label}>
            <Text style={styles.labelText}>relationship</Text>
          </View>
          <TextInput
            style={styles.nameInput}
            value={this.state.title}
            placeholder={'title ("son", "wife")'}
            onChangeText={(val) => this.setState({ title: val })}
          />
        </View>
        <View style={[styles.formRow, styles.nonTextRow]}>
          <View style={styles.label}>
            <Text style={styles.labelText}>birthdate</Text>
          </View>
          <TouchableOpacity style={styles.birthdateButton} onPress={() => this.openDatePicker()}>
            <Text style={styles.birthdateText}>
              {this.state.birthdate ? this.state.birthdate.format('LL') : 'choose birthdate'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    const selector = (
      <View style={styles.modeSelectContainer}>
        <TouchableHighlight
          style={[styles.modeSelectButton,
            this.state.isPrimary ? styles.modeSelectButtonSelected : []]}
          onPress={() => this.setState({ isPrimary: true })}
        >
          <Text
            style={!this.state.isPrimary
            ? styles.modeSelectText : styles.modeSelectTextSelected}
          >
            select existing
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.modeSelectButton,
            this.state.isPrimary ? [] : styles.modeSelectButtonSelected]}
          onPress={() => this.setState({ isPrimary: false })}
        >
          <Text
            style={this.state.isPrimary
            ? styles.modeSelectText : styles.modeSelectTextSelected}
          >
            manual entry
          </Text>
        </TouchableHighlight>
      </View>
    );
    return (
      <Modal
        transparent
        onRequestClose={this.props.onRequestClose}
        visible={this.props.visible}
      >
        <View style={styles.container}>
          <View style={styles.box}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {`${this.props.person ? 'Edit' : 'Add'} Family Member`}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={this.props.onRequestClose}
              >
                <Icon name="times" size={20} />
              </TouchableOpacity>
            </View>
            {!this.props.person && selector}
            {this.state.isPrimary ? picker : manualForm}
            <TouchableOpacity
              style={styles.goButton}
              onPress={() => this.onOkClick()}
            >
              <Text style={styles.goButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

FamilyEditModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  person: PropTypes.object,
  contacts: PropTypes.object,
  contactId: PropTypes.string.isRequired,
  editFamilyMember: PropTypes.func.isRequired,
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.7)'
  },
  box: {
    width: width - 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: COLORS.CONTACTS.PRIMARY,
    paddingVertical: 10
  },
  header: {
    flexDirection: 'row',
    width: width - 50,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: 20,
    marginLeft: 10,
    color: COLORS.CONTACTS.PRIMARY
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modeSelectContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modeSelectButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.CONTACTS.SECONDARY
  },
  modeSelectButtonSelected: {
    backgroundColor: COLORS.CONTACTS.SECONDARY
  },
  modeSelectText: {
    color: COLORS.CONTACTS.SECONDARY
  },
  modeSelectTextSelected: {
    color: 'white'
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5
  },
  picker: {
    width: 200,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nonTextRow: {
    marginVertical: 10
  },
  label: {
    width: 80
  },
  labelText: {
    fontSize: 14,
    color: COLORS.CONTACTS.PRIMARY
  },
  nameInput: {
    width: width * 0.75 - 80,
    fontSize: 16
  },
  birthdateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    padding: 5
  },
  birthdateText: {
    fontSize: 16
  },
  goButton: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    padding: 5,
    backgroundColor: COLORS.EVENTS.SECONDARY
  },
  goButtonText: {
    color: 'white',
    fontSize: 18
  }
};

export default connect(mapStateToProps)(FamilyEditModal);
