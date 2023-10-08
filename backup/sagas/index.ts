import { takeEvery, put, delay } from 'redux-saga/effects';

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'INCREMENT' });
}

function* rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export default rootSaga;