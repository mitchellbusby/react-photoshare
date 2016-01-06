import { Iterable } from 'immutable';

/**
 * [immutableToJS
 *    converts properties of the provided [state] object from immutable
 *    data structures to regular JavaScript data structures - used with
 *    redux-logger
 *
 * @param  {object} state [state reference]
 * @return {object}       [transformed state]
 */
export function immutableToJS(state) {
  return Object.keys(state).reduce((newState, key) => {
    const val = state[key];
    newState[key] = Iterable.isIterable(val) ? val.toJS() : val;
    return newState;
  }, {});
}

/**
 * Returns whether the provided value is a promise
 *
 * @param {object} value Potential promise
 * @return {Boolean}
 */
export function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value.promise && typeof value.promise.then === 'function';
  }
}
/**
  * Returns a promise object with either the object data (as base 64) or failed
  * @param {File/Blob} the file you want to read from
  * @return {Promise}
  */

export function FileHandler(fileObject) {
  return new Promise(function deferrable(resolve, reject) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(fileObject);
    fileReader.onload = (ev) => {
      resolve(ev.target.result);
    };
    fileReader.onerror = () => {
      reject();
    };
  });
}
