import fetch from 'isomorphic-fetch';
import { SUBMIT_IMAGE_PENDING, SUBMIT_IMAGE_FINISH } from '../constants';
import { FileHandler } from '../utils/utilities';
import { getToken } from '../api/login';
const Guid = require('guid');


export function submitImage() {
  return {
    type: SUBMIT_IMAGE_PENDING,
  };
}
export function submitImageFinish(wasSuccess, errorMessage) {
  return {
    type: SUBMIT_IMAGE_FINISH,
    status: wasSuccess,
    error: errorMessage,
  };
}

export function submitImageAsync(values, dispatch) {
  // function A
  return FileHandler(values.image)
  .then(imageData => {
    const valuesWithImage = Object.assign({}, values, {'imageData': imageData, id: Guid.raw(), token: getToken() });
    return fetch(`/api/submitImage`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(valuesWithImage),
    });
  })
  .then(function(response) {
    if (response.status >= 400) {
      throw new Error('Unauthorised. Check token.');
    }
    return response;
  })
  // Function B
  .then(function(json) {
    dispatch(submitImageFinish(true));
    return json;
  })
  .catch(()=>{
    dispatch(submitImageFinish(false, 'Error encountered when submitting image.'));
    return '';
  });
}
