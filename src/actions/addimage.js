import fetch from 'isomorphic-fetch';
import { SUBMIT_IMAGE_PENDING } from '../constants';

export function submitImage() {
  return {
    type: SUBMIT_IMAGE_PENDING,
  };
}

export function submitImageAsync(values, dispatch) {
  console.log(values);
  /* return new Promise(function deferrable(resolve, reject) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageUrl);
      fileReader.onload = (ev) => {
        resolve(ev.target.result);
      };
      fileReader.onerror = () => {
        reject();
      };
    })
    .then(imageData=>
      dispatch(previewImageReceived(imageData))
    );*/
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
