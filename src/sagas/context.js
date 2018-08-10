import fetch from 'isomorphic-fetch';
import {CONTEXT} from '../action-types';
import {receiveContext} from '../actions/map';
import {takeEvery, put} from 'redux-saga/effects';

export function getContext(url) {
  return fetch(url)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error getting context from url: ${url}`);
      }
    });
}

export function* fetchContext(action) {
  const options = action.options;
  if (options.url) {
    const context = yield getContext(options.url);
    yield put(receiveContext(context));
  } else if (options.json) {
    yield put(receiveContext(options.json));
  }
}

export function* handleContext() {
  yield takeEvery(CONTEXT.FETCH, fetchContext);
}
