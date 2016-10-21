import { ACTIONS } from './types';
import * as Storage from '../data/storage';
import firebaseApp from '../api/firebase';
import pushNotification from '../api/notification';
import _ from 'lodash';
import moment from 'moment';
import { contacts as testContacts } from '../data/contacts';
import { rotations as testRotations } from '../data/rotations';
import { getTimestampsUntil } from '../utils/utils';
import { EVENT_STATUS } from '../data/constants';

// Action creators

export function setSelectedContact(contactId) {
  return { type: ACTIONS.SET_SELECTED_CONTACT, payload: { contactId } };
}

export function updateContactMethod(contactId, contactMethod) {
  return (dispatch, getStore) => {
    const { user } = getStore();
    firebaseApp.database()
      .ref(`users/${user.uid}/contacts/${contactId}/contactMethods/${contactMethod.id}`)
      .set(contactMethod);
  };
}

export function setUser(user) {
  return { type: ACTIONS.SET_USER, payload: { user } };
}

export function createAccountWithEmail(email, password) {
  return (dispatch) => {
    firebaseApp.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(setUser(user));
      })
      .catch(error => {
        console.warn(error);
      });
  };
}

export function loginWithEmail(email, password) {
  return (dispatch) => {
    firebaseApp.auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(setUser(user));
      })
      .catch(error => {
        console.warn(error);
      });
  };
}

export function logout() {
  return dispatch => {
    firebaseApp.auth().signOut()
    .then(() => {
      dispatch(setUser(null));
    });
  };
}

export function fetchStoreFromStorage() {
  return (dispatch, getStore) => {
    const { user } = getStore();

    firebaseApp.database().ref(`users/${user.uid}/contacts`).on('value', (snapshot) => {
      const results = snapshot.val();
      if (results) {
        dispatch({
          type: ACTIONS.SET_CONTACTS,
          payload: {
            contacts: results
          }
        });
      }
    });

    firebaseApp.database().ref(`users/${user.uid}/rotations`).on('value', (snapshot) => {
      const results = snapshot.val();
      if (results) {
        dispatch({
          type: ACTIONS.SET_ROTATIONS,
          payload: {
            rotations: results
          }
        });
      }
    });

    firebaseApp.database().ref(`users/${user.uid}/events`).on('value', (snapshot) => {
      const results = snapshot.val();
      if (results) {
        dispatch({
          type: ACTIONS.SET_EVENTS,
          payload: {
            events: results
          }
        });
      }
    });
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

    firebaseApp.database().ref(`users/${store.user.uid}`).update({
      contacts: store.contacts,
      rotations: store.rotations,
      events: store.events
    });
  };
}

export function resetToTestData() {
  return (dispatch, getStore) => {
    const newStore = Object.assign({}, getStore(), {
      contacts: testContacts,
      rotations: testRotations,
      events: {}
    });
    dispatch({
      type: ACTIONS.SET_CONTACTS,
      payload: testContacts
    });
    dispatch({
      type: ACTIONS.SET_ROTATIONS,
      payload: testRotations
    });
    dispatch(writeStoreToStorage(newStore));
  };
}

export function updateContact(contactId, contactData) {
  return (dispatch, getStore) => {
    const { user } = getStore();
    return firebaseApp.database().ref(`users/${user.uid}/contacts/${contactId}`)
      .update(contactData);
  };
}

export function addContact(contactData) {
  return (dispatch, getStore) => {
    const { user } = getStore();
    let contactDataToAdd = {};
    const newContactKey = firebaseApp.database().ref(`users/${user.uid}/contacts`).push().key;
    if (_.isArray(contactData.contactMethods)) {
      contactDataToAdd = _.extend({}, contactData, {
        id: newContactKey
      });
      contactDataToAdd = _.omit(contactDataToAdd, 'contactMethods');
    } else {
      contactDataToAdd = _.extend({}, contactData, {
        id: newContactKey
      });
    }
    const db = firebaseApp.database();
    return db.ref(`users/${user.uid}/contacts/${newContactKey}`)
      .set(_.extend({}, contactData, {
        id: newContactKey
      }))
      .then(() => {
        const newMethods = _(contactData.contactMethods)
          .map((contactMethod) => {
            const newMethodId = db
              .ref(`users/${user.uid}/contacts/${newContactKey}/contactMethods`).push().key;
            return _.extend({}, contactMethod, { id: newMethodId });
          })
          .keyBy('id')
          .value();
        return db.ref(`users/${user.uid}/contacts/${newContactKey}/contactMethods`).set(newMethods);
      });
  };
}

export function addRotation(rotation) {
  return (dispatch, getStore) => {
    const { user } = getStore();
    const newRotationKey = firebaseApp.database().ref(`users/${user.uid}/rotations`).push().key;
    return firebaseApp.database().ref(`users/${user.uid}/rotations/${newRotationKey}`)
      .set(_.extend({}, rotation, {
        id: newRotationKey
      }));
  };
}

export function updateRotation(rotation) {
  return (dispatch, getStore) => {
    const { user } = getStore();
    return firebaseApp.database().ref(`users/${user.uid}/rotations/${rotation.id}`).set(rotation);
  };
}

export function deleteContact(id) {
  return (dispatch, getStore) => {
    const { user } = getStore();
    return firebaseApp.database().ref(`users/${user.uid}/contacts/${id}`).remove();
  };
}

export function deleteContactMethod(contactId, methodId) {
  return (dispatch, getStore) => {
    const { user } = getStore();
    firebaseApp.database()
      .ref(`users/${user.uid}/contacts/${contactId}/contactMethods/${methodId}`).remove();
  };
}

// generate all events from scratch based on rotations?
export function updateAllEvents() {
  return (dispatch, getStore) => {
    const { rotations, user } = getStore();
    const eventSets = _(rotations).map(rotation => {
      const timestamps = getTimestampsUntil(rotation, moment().add(1, 'month'));
      const existingOriginalTimestamps = _.map(rotation.events, event => event.timestampOriginal);
      // console.warn('eot', existingOriginalTimestamps);
      const filteredTimestamps =
        _.filter(timestamps, timestamp => !_.includes(existingOriginalTimestamps, timestamp));
      // console.warn('ft', filteredTimestamps);
      return _.map(filteredTimestamps, timestamp => ({
        rotationId: rotation.id,
        status: EVENT_STATUS.NOT_DONE,
        timestampOriginal: timestamp,
        timestamp
      }));
    })
    .filter(eventSet => eventSet.length > 0)
    .value();
    if (eventSets.length > 0) {
      const updateData = _.keyBy(eventSets, item => `${item[0].rotationId}/events`);
      console.warn('updateData', updateData);
      return firebaseApp.database().ref(`users/${user.uid}/rotations`)
        .update(updateData);
    }
  };
}

export function schedulePushNotification() {
  return (dispatch) => {
    pushNotification.localNotificationSchedule({
      message: 'Notification message!',
      date: new Date(Date.now() + 1000)
    });
    // save state that event has been scheduled
  };
}
