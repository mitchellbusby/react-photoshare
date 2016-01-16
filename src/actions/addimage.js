import fetch from 'isomorphic-fetch';
import { SUBMIT_IMAGE_PENDING, SUBMIT_IMAGE_FINISH } from '../constants';
import { FileHandler } from '../utils/utilities';

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
  console.log(values);
  // function A
  return FileHandler(values.image)
  .then(imageData => {
    const valuesWithImage = Object.assign({}, values, {'imageData': imageData});
    return fetch(`/api/submitImage`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(valuesWithImage),
    });
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
