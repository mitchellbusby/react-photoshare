import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { reducer as formReducer } from 'redux-form';
import counter from './counter';
import user from './user';
import images from './images';

const rootReducer = combineReducers({
  user,
  counter,
  router: routerStateReducer,
  images,
  form: formReducer,
});

export default rootReducer;
