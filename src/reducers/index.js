import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import counter from './counter';
import user from './user';
import images from './images';

const rootReducer = combineReducers({
  user,
  counter,
  router: routerStateReducer,
  images
});

export default rootReducer;
