import { handleActions } from 'redux-actions';
import { FAVE_IMAGE, UNFAVE_IMAGE, RECEIVE_IMAGES } from '../constants';
const Guid = require('guid');

const imagesReducer = handleActions({
  [FAVE_IMAGE]: (state, action) => (
      state.map(image =>
          image.id === action.imageId ?
            Object.assign({}, image, {
              likelog: image.likelog.concat([{token: action.token, time: action.time}]),
            }) :
            image
      )
  ),
  [UNFAVE_IMAGE]: (state, action) => (
      state.map(image =>
          image.id === action.imageId ?
          Object.assign({}, image, {
            likelog: image.likelog.filter(logitem =>
              logitem.token !== action.token
            ),
          }) :
          image
        )
  ),
  [RECEIVE_IMAGES]: (state, action) => (
    action.images
  ),
}, [{
  url: 'https://s3-us-west-2.amazonaws.com/busby-traveller/photo.jpg',
  id: Guid.raw(),
  location: 'Paris, France',
  likelog: [],
}]);

export default imagesReducer;
