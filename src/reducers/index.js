import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { reducer as formReducer } from 'redux-form';
import counter from './counter';
import user from './user';
import images from './images';
import previewImage from './previewImage';
import guest from './guest';

const rootReducer = combineReducers({
  user,
  counter,
  router: routerStateReducer,
  images,
  form: formReducer,
  previewImage: previewImage,
  guest: guest,
});

export default rootReducer;
