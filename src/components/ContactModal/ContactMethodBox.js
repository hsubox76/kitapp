import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContactMethodBoxDisplay from './ContactMethodBoxDisplay';
import ContactMethodBoxEdit from './ContactMethodBoxEdit';
import * as Actions from '../../actions';

function mapDispatchToActions(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

class ContactMethodBox extends Component {
  constructor(props) {
    super(props);
    this.setEditingOn = this.setEditingOn.bind(this);
    this.setEditingOff = this.setEditingOff.bind(this);
    this.state = {
      isEditing: false
    };
  }
  setEditingOn() {
    this.setState({
      isEditing: true
    });
  }
  setEditingOff() {
    this.setState({
      isEditing: false
    });
  }
  render() {
    const props = this.props;
    if (this.state.isEditing) {
      return (
        <ContactMethodBoxEdit
          contactId={props.contactId}
          contactMethod={props.contactMethod}
          closeForm={this.setEditingOff}
          updateContactMethod={this.props.actions.updateContactMethod}
        />);
    }
    return (
      <ContactMethodBoxDisplay
        contactMethod={props.contactMethod}
        onEditButtonClick={this.setEditingOn}
      />);
  }
}

ContactMethodBox.propTypes = {
  contactMethod: PropTypes.object,
  actions: PropTypes.objectOf(PropTypes.func),
  contactId: PropTypes.number.isRequired
};

export default connect(null, mapDispatchToActions)(ContactMethodBox);
