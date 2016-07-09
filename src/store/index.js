import { createStore } from 'redux';
import { reducer } from '../reducers';
import { contacts } from '../data/contacts';
import { events } from '../data/events';

const initialStore = {
  events,
  contacts,
  ui: {
    contactModalVisible: false
  }
};

export const store = createStore(reducer, initialStore);
