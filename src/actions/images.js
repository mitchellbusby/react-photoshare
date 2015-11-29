import { FAVE_IMAGE, UNFAVE_IMAGE } from '../constants';

export function fave(id) {
  return {
    type: FAVE_IMAGE,
    imageId: id,
  };
}
export function unfave(id) {
  return {
    type: UNFAVE_IMAGE,
    imageId: id,
  };
}
