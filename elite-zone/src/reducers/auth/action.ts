import { createAction } from '@reduxjs/toolkit';
import { AuthState } from './model';

enum AuthAction {
  takeLoginData = '@auth/takeLoginData',
  takeAuthorization = '@auth/takeAuthorization',
  setLoginData = '@auth/setLoginData',
  setIsAuth = '@auth/setIsAuth',
  setQuestionBankAuthorization = '@auth/setQuestionBankAuthorization',
  setUserAuthorization = '@auth/setUserAuthorization',
  setUserGroupAuthorization = '@auth/setUserGroupAuthorization',
  setSurveyAuthorization = '@auth/setSurveyAuthorization',
  setIsLoading = '@auth/setIsLoading',
}

const takeLoginData = createAction<AuthState['loginData']>(AuthAction.takeLoginData);
const takeAuthorization = createAction(AuthAction.takeAuthorization);
const setLoginData = createAction<AuthState['loginData']>(AuthAction.setLoginData);
const setIsAuth = createAction<AuthState['isAuth']>(AuthAction.setIsAuth);
const setQuestionBankAuthorization = createAction<AuthState['questionBankAuthorization']>(
  AuthAction.setQuestionBankAuthorization
);
const setUserAuthorization = createAction<AuthState['userAuthorization']>(
  AuthAction.setUserAuthorization
);
const setUserGroupAuthorization = createAction<AuthState['userGroupAuthorization']>(
  AuthAction.setUserGroupAuthorization
);
const setSurveyAuthorization = createAction<AuthState['surveyAuthorization']>(
  AuthAction.setSurveyAuthorization
);

const setIsLoading = createAction<AuthState['isLoading']>(AuthAction.setIsLoading);

export const authAction = {
  takeLoginData,
  takeAuthorization,
  setIsAuth,
  setLoginData,
  setQuestionBankAuthorization,
  setUserAuthorization,
  setUserGroupAuthorization,
  setSurveyAuthorization,
  setIsLoading,
};
