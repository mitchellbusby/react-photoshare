import { PREVIEW_IMAGE_RECEIVED } from '../constants';
import { FileHandler } from '../utils/utilities';

export function previewImageReceived(imageData) {
  return {
    type: PREVIEW_IMAGE_RECEIVED,
    imageData: imageData,
    status: true,
  };
}

export function selectImageAsync(imageUrl) {
  return function onDispatch(dispatch) {
    return FileHandler(imageUrl)
    .then(imageData=>
      dispatch(previewImageReceived(imageData))
    );
  };
}

