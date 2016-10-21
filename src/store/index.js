import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from '../reducers';
// import { contacts } from '../data/contacts';
// import { rotations } from '../data/rotations';

const contacts = {};
const rotations = {};

const initialState = {
  contacts,
  rotations,
  events: [],
  ui: {
    contactModalVisible: false,
    hasUnsavedChanges: false,
    lastUpdated: {}
  },
  user: null
};

export const store = createStore(reducer, initialState, applyMiddleware(thunk));
