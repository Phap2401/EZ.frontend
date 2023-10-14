import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../reducers/reducer'
import rootSaga from '../reducers/saga'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

const store = configureStore({
  reducer: rootReducer(),
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false
    }),
    ...middlewares
  ]
})
sagaMiddleware.run(rootSaga)

export default store
