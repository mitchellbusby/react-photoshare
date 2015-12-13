import { PREVIEW_IMAGE_RECEIVED } from '../constants';
import { handleActions } from 'redux-actions';

const previewImageReducer = handleActions({
  [PREVIEW_IMAGE_RECEIVED]: (state, action) => (
    Object.assign({}, state, { imageData: action.imageData })
  )}, {
  });

export default previewImageReducer;
