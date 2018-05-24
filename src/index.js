import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import reducer from './reducers';
import { selectGesture } from './actions';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { WSAEREMOTE } from 'constants';

const store = createStore(reducer);

store.subscribe(() => console.log('store.subscribe: ', store.getState()));

store.dispatch(selectGesture('rock'));

// console.log('store: ', store.getState());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
