import { ACTIONS } from '../actions/types';

export function isDataLoaded(state, action) {
  switch (action.type) {
    case ACTIONS.SET_CONTACTS:
      return Object.assign({}, state, { contacts: true });
    case ACTIONS.SET_ROTATIONS:
      return Object.assign({}, state, { rotations: true });
    case ACTIONS.SET_EVENTS:
      return Object.assign({}, state, { events: true });
    default:
      return state;
  }
}

export default function ui(state, action) {
  switch (action.type) {
    case ACTIONS.SET_CONTACTS:
    case ACTIONS.SET_ROTATIONS:
    case ACTIONS.SET_EVENTS:
      return Object.assign({}, state, {
        hasUnsavedChanges: false,
        isDataLoaded: isDataLoaded(state.isDataLoaded, action)
      });
    case ACTIONS.UPDATE_CONTACT_METHOD:
      return Object.assign({}, state, { hasUnsavedChanges: true });
    case ACTIONS.SET_MODAL_VISIBILITY:
      return Object.assign({}, state, { contactModalVisible: action.payload.isVisible });
    case ACTIONS.SET_SELECTED_CONTACT:
      return Object.assign({}, state, { selectedContactId: action.payload.contactId });
    default:
      return state;
  }
}
