import { SAVE_GUEST_TOKEN } from '../constants';

export function saveToken(tokenToSave) {
  localStorage.setItem('guest_token', tokenToSave);
  return {
    type: SAVE_GUEST_TOKEN,
    token: tokenToSave,
  };
}
