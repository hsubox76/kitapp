import { ACTIONS } from './types';

export function setModalVisibility(isVisible) {
  return { type: ACTIONS.SET_MODAL_VISIBILITY, payload: { isVisible } };
}

export function setSelectedContact(contactId) {
  return { type: ACTIONS.SET_SELECTED_CONTACT, payload: { contactId } };
}
