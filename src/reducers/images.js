import { handleActions } from 'redux-actions';
import { FAVE_IMAGE } from '../constants';

const imagesReducer = handleActions({
  [FAVE_IMAGE]: (state, action) => (
      state.map(image =>
          image.id === action.imageId ?
            Object.assign({}, image, { likes: image.likes + 1 }) :
            image
      )
  ),
}, [{
  url: 'https://s3-us-west-2.amazonaws.com/busby-traveller/photo.jpg',
  id: 0,
  location: 'Paris, France',
  likes: 1,
}]);

export default imagesReducer;
