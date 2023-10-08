import createSagaMiddleware from 'redux-saga';
import { createInjectorsEnhancer } from 'redux-injectors';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '~/reducers/reducer';
import { rootSaga } from '~/reducers/saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const { run: runSaga } = sagaMiddleware;

const enhancers = [
  createInjectorsEnhancer({
    createReducer: rootReducer,
    runSaga,
  }),
];

const store = configureStore({
  reducer: rootReducer(),
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), ...middlewares],
  devTools: process.env.NODE_ENV !== 'production',
  enhancers,
});
sagaMiddleware.run(rootSaga);

export default store;