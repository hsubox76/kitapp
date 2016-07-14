import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Main from './containers/Main';

const KitApp = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default KitApp;
