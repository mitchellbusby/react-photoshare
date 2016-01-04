import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
const guestReducer = handleActions({}, fromJS({
	'token': 'hello',
}));