import { login } from '../api/login';

import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from '../constants';

export function loginUser(username, password, token) {
  return {
    types: [
      LOGIN_USER_PENDING,
      LOGIN_USER_SUCCESS,
      LOGIN_USER_ERROR,
    ],
    payload: {
      promise: login(username, password, token),
    },
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
