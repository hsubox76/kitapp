import { ACTIONS } from '../actions/types';
import _ from 'lodash';

export function contactMethods(state = [], action) {
  switch (action.type) {
    case ACTIONS.UPDATE_CONTACT_METHOD:
      const methodIndex = state.findIndex(method => method.id === action.payload.contactMethod.id);
      return [
        ...state.slice(0, methodIndex),
        action.payload.contactMethod,
        ...state.slice(methodIndex + 1)
      ];
    default:
      return state;
  }
}

export function contact(state = {}, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_CONTACT_METHOD:
      return Object.assign({}, state, {
        contactMethods: contactMethods(state.contactMethods, action)
      });
    default:
      return state;
  }
}

export default function contacts(state = {}, action) {
  switch (action.type) {
    case ACTIONS.SET_CONTACTS:
      return action.payload.contacts;
    case ACTIONS.UPDATE_CONTACT_METHOD:
      return _.extend({}, state, { [action.payload.contactId]: contact(state[action.payload.contactId], action) });
    default:
      return state;
  }
}
