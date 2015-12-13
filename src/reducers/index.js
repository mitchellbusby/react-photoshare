import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { reducer as formReducer } from 'redux-form';
import counter from './counter';
import user from './user';
import images from './images';
import previewImage from './previewImage';

const rootReducer = combineReducers({
  user,
  counter,
  router: routerStateReducer,
  images,
  form: formReducer,
  previewImage: previewImage,
});

export default rootReducer;
