import fetch from 'isomorphic-fetch';
import { SUBMIT_IMAGE_PENDING } from '../constants';

export function submitImage() {
  return {
    type: SUBMIT_IMAGE_PENDING,
  };
}

export function submitImageAsync(values, dispatch) {
  console.log(values);
  return fetch(`/api/submitImage`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
  .then(function(json) {
    dispatch('');
    return json;
  });
}
