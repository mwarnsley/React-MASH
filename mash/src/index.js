import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';

// Importing the create store from redux
import {createStore} from 'redux';

// Import combined reducers
import reducers from './reducers/index';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

// Create the store passing in the reducer
const store = createStore(reducers, undefined);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
