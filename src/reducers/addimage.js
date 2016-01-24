import { handleActions } from 'redux-actions';
import { SUBMIT_IMAGE_PENDING, SUBMIT_IMAGE_FINISH, SUBMIT_IMAGE_DISMISS } from '../constants';

const addImageReducer = handleActions({
  [SUBMIT_IMAGE_PENDING]: (state) => (
    Object.assign({}, state, {isSubmitting: true, submitted: false})
   ),
  [SUBMIT_IMAGE_FINISH]: (state, action) => {
    return Object.assign({}, state, {
      isSubmitting: false,
      submitted: true,
      wasSuccessful: action.status,
    });
  },
  [SUBMIT_IMAGE_DISMISS]: (state) => (
    Object.assign({}, state, {submitted: false, wasSuccessful: false})
  ),
}, {
  isSubmitting: false,
  submitted: false,
  wasSuccessful: false,
});

export default addImageReducer;
