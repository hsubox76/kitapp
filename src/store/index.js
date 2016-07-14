import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from '../reducers';
import { contacts } from '../data/contacts';
import { rotations } from '../data/rotations';

const initialState = {
  contacts: [],
  rotations: [],
  ui: {
    contactModalVisible: false
  }
};

export const store = createStore(reducer, initialState, applyMiddleware(thunk));
