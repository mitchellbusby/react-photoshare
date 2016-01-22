import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
const Guid = require('guid');
import { SAVE_GUEST_TOKEN } from '../constants';

const guestReducer = handleActions({
  [SAVE_GUEST_TOKEN]: (state, action) => (
    state.update('token', () =>
      action.token
      )
    .update('isSaved', () =>
      true
      )
    ),
},
localStorage.getItem('guest_token') ?
fromJS({
  'token': localStorage.getItem('guest_token'),
  'isSaved': true,
}) :
fromJS({
  'token': Guid.raw(),
  'isSaved': false,
}));

export default guestReducer;
