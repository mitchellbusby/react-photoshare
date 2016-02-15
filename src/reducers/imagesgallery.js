import { handleActions } from 'redux-actions';
import { RECEIVE_IMAGES, FETCH_IMAGES } from '../constants';

const imagesGalleryReducer = handleActions({
  [RECEIVE_IMAGES]: (state, action) => (
    Object.assign(state, {}, {
      loadedSuccessfully: action.error === undefined,
      loading: false,
    })
  ),
  [FETCH_IMAGES]: (state) => (
    Object.assign(state, {}, {
      loading: false,
      loadedSuccessfully: false,
    })
  ),
}, {
  loadedSuccessfully: false,
  loading: false,
});

export default imagesGalleryReducer;
