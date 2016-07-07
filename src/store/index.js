import { createStore } from 'redux';
import { reducer } from '../reducers';
import { contacts } from '../data/contacts';

const initialStore = {
  events: [
    {
      id: 1001,
      name: 'lunch with Mom',
      time: 1467590156054,
      type: 'meet'
    },
    {
      id: 1002,
      name: 'call Kevin',
      time: 1467668604015,
      type: 'call'
    },
    {
      id: 1003,
      name: 'call Ruth to ask how vacation to Mexico went'
        + 'and also talk about some other things too',
      time: 1468981860760,
      type: 'call'
    },
  ],
  contacts,
  ui: {
    contactModalVisible: false
  }
};

export const store = createStore(reducer, initialStore);
