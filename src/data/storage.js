import { AsyncStorage } from 'react-native';

const STORAGE_KEYS = {
  CONTACTS: 'CONTACTS',
  ROTATIONS: 'ROTATIONS'
};

export function writeStoreToStorage(store) {
  const { contacts, rotations } = store;
  return new Promise((resolve, reject) => {
    AsyncStorage.multiSet([
      [STORAGE_KEYS.CONTACTS, JSON.stringify(contacts)],
      [STORAGE_KEYS.ROTATIONS, JSON.stringify(rotations)]
    ])
    .then(() => resolve(true))
    .catch(error => reject(error));
  });
}

export function getStoreFromStorage() {
  return new Promise((resolve, reject) => {
    AsyncStorage.multiGet([STORAGE_KEYS.CONTACTS, STORAGE_KEYS.ROTATIONS])
    .then(result => {
      const parsedResult = {
        contacts: JSON.parse(result[0][1]),
        rotations: JSON.parse(result[1][1])
      };
      resolve(parsedResult);
    })
    .catch(error => reject(error));
  });
}
