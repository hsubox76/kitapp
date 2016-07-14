import { ACTIONS } from '../actions/types';

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

export default function contacts(state = [], action) {
  switch (action.type) {
    case ACTIONS.SET_STORE:
      return action.payload.contacts;
    case ACTIONS.UPDATE_CONTACT_METHOD:
      const contactIndex = state.findIndex(con => con.id === action.payload.contactId);
      return [
        ...state.slice(0, contactIndex),
        contact(state[contactIndex], action),
        ...state.slice(contactIndex + 1)
      ];
    default:
      return state;
  }
}
