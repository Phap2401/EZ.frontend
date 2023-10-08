import { combineReducers } from '@reduxjs/toolkit';
import app from './app/reducer';
import auth from './auth/reducer';
import survey from './survey/reducer';

export const rootReducer = (injectedReducers = {}) => {
  return combineReducers({
    app,
    auth,
    survey,
  });
};
