import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
const Guid = require('guid');

const guestReducer = handleActions({}, fromJS({
  'token': Guid.raw(),
}));

export default guestReducer;
