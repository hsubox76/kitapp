import { ACTIONS } from '../actions/types';

export default function ui(state, action) {
  switch (action.type) {
    case ACTIONS.SET_MODAL_VISIBILITY:
      return Object.assign({}, state, { contactModalVisible: action.payload.isVisible });
    case ACTIONS.SET_SELECTED_CONTACT:
      return Object.assign({}, state, { selectedContactId: action.payload.contactId });
    default:
      return state;
  }
}
