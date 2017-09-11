import {combineReducers} from 'redux';

import {mainReducer} from './mainReducer';

// Combining the reducers
export default combineReducers({
  main: mainReducer,
});
