import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import Button from 'apsl-react-native-button';
import * as Actions from '../actions';
import { testEmail, testPassword } from '../private/private';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToActions(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

class Login extends Component {
  render() {
    return (
      <View>
        <Button onPress={() => this.props.actions.createAccountWithEmail(testEmail, testPassword)}>
          signup firebase
        </Button>
        <Button onPress={() => this.props.actions.loginWithEmail(testEmail, testPassword)}>
          login firebase
        </Button>
        <Button onPress={() => this.props.actions.logout()}>
          logout firebase
        </Button>
      </View>
    );
  }
}

Login.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
};

export default connect(mapStateToProps, mapDispatchToActions)(Login);
