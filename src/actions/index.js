import { ACTIONS } from './types';
import * as Storage from '../data/storage';

export function setModalVisibility(isVisible) {
  return { type: ACTIONS.SET_MODAL_VISIBILITY, payload: { isVisible } };
}

export function setSelectedContact(contactId) {
  return { type: ACTIONS.SET_SELECTED_CONTACT, payload: { contactId } };
}

export function fetchFromStorage() {
  return (dispatch) => {
    Storage.getStoreFromStorage()
    .then(result => {
      dispatch({ type: ACTIONS.SET_STORE, payload: result });
    })
    .catch((error) => console.warn(error));
  };
}
