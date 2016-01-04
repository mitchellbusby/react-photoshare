import { handleActions } from 'redux-actions';
import { FAVE_IMAGE, UNFAVE_IMAGE, RECEIVE_IMAGES } from '../constants';


const imagesReducer = handleActions({
  [FAVE_IMAGE]: (state, action) => (
      state.map(image =>
          image.id === action.imageId ?
            Object.assign({}, image, { likes: image.likes + 1, isLiked: true }) :
            image
      )
  ),
  [UNFAVE_IMAGE]: (state, action) => (
      state.map(image =>
          image.id === action.imageId ?
          Object.assign({}, image, { likes: image.likes - 1, isLiked: false }) :
          image
        )
  ),
  [RECEIVE_IMAGES]: (state, action) => (
    action.images
  ),
}, [{
  url: 'https://s3-us-west-2.amazonaws.com/busby-traveller/photo.jpg',
  id: 0,
  location: 'Paris, France',
  likes: 1,
}]);

export default imagesReducer;
