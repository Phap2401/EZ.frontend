import { createReducer } from '@reduxjs/toolkit';
import { authAction } from './action';
import { AuthState } from './model';

const initialState: AuthState = {
  loginData: null,
  isAuth: false,
  questionBankAuthorization: [],
  surveyAuthorization: [],
  userAuthorization: [],
  userGroupAuthorization: [],
  isLoading: true,
};

const authReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(authAction.setLoginData, (state, action) => {
      state.loginData = action.payload;
    })
    .addCase(authAction.setIsAuth, (state, action) => {
      state.isAuth = action.payload;
    })
    .addCase(authAction.setQuestionBankAuthorization, (state, action) => {
      state.questionBankAuthorization = action.payload;
    })
    .addCase(authAction.setSurveyAuthorization, (state, action) => {
      state.surveyAuthorization = action.payload;
    })
    .addCase(authAction.setUserAuthorization, (state, action) => {
      state.userAuthorization = action.payload;
    })
    .addCase(authAction.setUserGroupAuthorization, (state, action) => {
      state.userGroupAuthorization = action.payload;
    })
    .addCase(authAction.setIsLoading, (state, action) => {
      state.isLoading = action.payload;
    })
);

export default authReducer;
