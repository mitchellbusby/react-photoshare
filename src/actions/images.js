import { FAVE_IMAGE, UNFAVE_IMAGE, FETCH_IMAGES, RECEIVE_IMAGES } from '../constants';
import fetch from 'isomorphic-fetch';


export function fave(id, guestToken) {
  return {
    type: FAVE_IMAGE,
    imageId: id,
    guestToken: guestToken,
  };
}
export function unfave(id, guestToken) {
  return {
    type: UNFAVE_IMAGE,
    imageId: id,
    guestToken: guestToken,
  };
}
export function fetchImages() {
  return {
    type: FETCH_IMAGES,
  };
}
export function fetchReceived(json) {
  return {
    type: RECEIVE_IMAGES,
    images: json,
  };
}

export function fetchImagesThunk() {
  return function onDispatch(dispatch) {
    dispatch(fetchImages());

    return fetch(`/api/allimages`)
    .then(response=>response.json())
    .then(json=>
      dispatch(fetchReceived(json))
    );
  };
}

export function faveAsync(id, guestToken) {
  return function onDispatch(dispatch) {
    return fetch(`/api/like`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        guestToken: guestToken,
      }),
    })
    .then(()=>
      dispatch(fave(id, guestToken))
    );
  };
}

export function unfaveAsync(id, guestToken) {
  return function onDispatch(dispatch) {
    return fetch(`/api/unlike`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        guestToken: guestToken,
      }),
    })
    .then(()=>
      dispatch(unfave(id, guestToken))
    );
  };
}


