import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from '../reducers';
import { contacts } from '../data/contacts';
import { events } from '../data/events';
import { rotations } from '../data/rotations';

const initialState = {
  events,
  contacts,
  rotations,
  ui: {
    contactModalVisible: false
  }
};

export const store = createStore(reducer, initialState, applyMiddleware(thunk));
