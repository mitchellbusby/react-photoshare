import { FAVE_IMAGE } from '../constants';

export function fave(id) {
  return {
    type: FAVE_IMAGE,
    imageId: id,
  };
}
export function unfave(id) {
  return {
    type: FAVE_IMAGE,
    payload: {imageId: id},
  };
}
