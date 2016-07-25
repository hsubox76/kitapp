import { ACTIONS } from './types';
import * as Storage from '../data/storage';
import firebaseApp from '../api/firebase';
import moment from 'moment';
import { DATE_FORMAT } from '../data/constants';
import { contacts as testContacts } from '../data/contacts';
import { rotations as testRotations } from '../data/rotations';

// Helper functions

export function getTimestampOfNextEvent(rotation) {
  const startMoment = moment(rotation.starting, DATE_FORMAT);
  if (startMoment.isAfter(moment())) {
    return startMoment;
  }
  const everyMillis = moment.duration(...rotation.every).valueOf();
  const todayMillis = moment().valueOf();
  const startingMillis = startMoment.valueOf();
  const millisSinceStart = todayMillis - startingMillis;
  const remainderMillis = millisSinceStart % everyMillis;
  const millisTillNext = everyMillis - remainderMillis;
  const nextEventMoment = moment(todayMillis + millisTillNext);
  return nextEventMoment;
}

// Action creators

export function setModalVisibility(isVisible) {
  return { type: ACTIONS.SET_MODAL_VISIBILITY, payload: { isVisible } };
}

export function setSelectedContact(contactId) {
  return { type: ACTIONS.SET_SELECTED_CONTACT, payload: { contactId } };
}

export function updateContactMethod(contactId, contactMethod) {
  return { type: ACTIONS.UPDATE_CONTACT_METHOD, payload: { contactId, contactMethod } };
}

export function fetchStoreFromStorage() {
  return (dispatch) => {
    // Storage.getStoreFromStorage()
    // .then(result => {
    //   dispatch({ type: ACTIONS.SET_STORE, payload: result });
    // })
    // .catch((error) => console.warn(`fetchStoreFromStorage error: ${error}`));

    firebaseApp.database().ref('users/testuser').on('value', (snapshot) => {
      const results = snapshot.val();
      dispatch({
        type: ACTIONS.SET_STORE,
        payload: {
          contacts: results.contacts,
          rotations: results.rotations
        }
      });
    });
  };
}

export function resetToTestData() {
  return (dispatch, getStore) => {
    const newStore = Object.assign({}, getStore(), {
      contacts: testContacts,
      rotations: testRotations
    });
    dispatch({
      type: ACTIONS.SET_STORE,
      payload: newStore
    });
    dispatch(writeStoreToStorage(newStore));
  };
}

export function writeStoreToStorage(customStore) {
  return (dispatch, getStore) => {
    const store = customStore || getStore();

    Storage.writeStoreToStorage(store)
    .then(() => {
      // probably set some state to indicate write succeeded
    })
    .catch((error) => console.warn(error));

    firebaseApp.database().ref('users/testuser').update({
      contacts: store.contacts,
      rotations: store.rotations
    });
  };
}

export function updateEvents() {
  return (dispatch, getStore) => {
    const { rotations, contacts } = getStore();
    const events = rotations
      .map((rotation) => {
        const contact = contacts.find(
          (con) => con.id === rotation.contactId);
        const contactMethod = contact.contactMethods
            .find(cMethod => cMethod.id === rotation.contactMethodId);
        return {
          contactId: rotation.contactId,
          contactName: contact.name,
          contactMethod,
          name: rotation.name,
          timestamp: getTimestampOfNextEvent(rotation)
        };
      })
      // Filter out "lapping" events that are a year or more from now that would
      // be confusing since we don't show year in this UI
      // Maybe it's better to show them but format them differently (add the year)
      .filter(event => event.timestamp.isBefore(moment().add(11, 'months')))
      .sort((event1, event2) => {
        if (event1.timestamp < event2.timestamp) {
          return -1;
        }
        if (event1.timestamp > event2.timestamp) {
          return 1;
        }
        return 0;
      });
    dispatch({ type: ACTIONS.UPDATE_EVENTS, events });
  };
}
