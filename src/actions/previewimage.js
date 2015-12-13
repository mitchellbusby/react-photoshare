import { PREVIEW_IMAGE_RECEIVED } from '../constants';

export function previewImageReceived(imageData) {
  return {
    type: PREVIEW_IMAGE_RECEIVED,
    imageData: imageData,
    status: true,
  };
}

export function selectImageAsync(imageUrl) {
  return function onDispatch(dispatch) {
    return new Promise(function deferrable(resolve, reject) {
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
    );
  };
}

