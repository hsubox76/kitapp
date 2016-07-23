import React from 'react';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import { store } from './store';
import Main from './containers/Main';

const firebaseConfig = {
  apiKey: 'AIzaSyAsPc_9zYQSrEh9gDifE5ICRsHDloFGwU8',
  authDomain: 'kitapp-8d90a.firebaseapp.com',
  databaseURL: 'https://kitapp-8d90a.firebaseio.com',
  storageBucket: 'kitapp-8d90a.appspot.com',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const KitApp = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default KitApp;
