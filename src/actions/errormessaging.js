import { RESET_ERROR_MESSAGE } from '../constants';

export function ClearError() {
  return {
    type: RESET_ERROR_MESSAGE,
  };
}
