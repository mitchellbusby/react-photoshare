import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const imagesReducer = handleActions({
  }, fromJS({
    images: [{
      imageUrl: "",
      imageId: 0,
    }],
)});

export default imagesReducer;