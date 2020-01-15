import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import scenarios from './scenariosReducer';
import dialog from './dialogReducer';

const rootReducer = combineReducers({
  scenarios,
  dialog,
  routing: routerReducer,
});

export default rootReducer;
