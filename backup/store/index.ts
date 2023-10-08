import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from '~/store/rootReducer';
import rootSaga from '~/sagas';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with middleware
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;