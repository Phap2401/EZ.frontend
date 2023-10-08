/* eslint-disable import/named */
import { PayloadAction } from '@reduxjs/toolkit';
import { getAuthorization } from 'api/AuthApi';
import { ERROR_SERVER } from 'constant/textNotification';
import { ACCESS_TOKEN } from 'constant/token';
import { appAction } from 'reducers/app/action';
import { call, put, takeLatest } from 'redux-saga/effects';
import { LoginDataType } from 'types/authType';
import { setLocalStorage } from 'utils/browserStorageUtil';
import { decodeJwt, FunctionGroupName } from 'utils/helperFunctions';
import { authAction } from './action';
import { IRoleDetail, IRoleUserGroup } from './model';

function* implementSetUserAuthorization() {
  try {
    let questionBankRoles: IRoleUserGroup[] = [];
    let userRoles: IRoleUserGroup[] = [];
    let userGroupsRoles: IRoleUserGroup[] = [];
    let surveyRoles: IRoleUserGroup[] = [];

    const userId = decodeJwt(localStorage.getItem(ACCESS_TOKEN) as string)?.UserID;
    if (!userId) {
      yield put(authAction.setIsLoading(false));
      return;
    }

    yield put(authAction.setIsLoading(true));

    const userAuthorization: IRoleDetail[] = yield call(getAuthorization, userId);

    const response = [...userAuthorization];

    response.forEach((f) => {
      switch (f.functionGroupName) {
        case FunctionGroupName.MANAGE_USERS:
          userRoles = f.userGroupFunctions;
          break;
        case FunctionGroupName.MANAGE_USER_GROUPS:
          userGroupsRoles = f.userGroupFunctions;
          break;
        case FunctionGroupName.QUESTION_BANK:
          questionBankRoles = f.userGroupFunctions;
          break;
        case FunctionGroupName.SURVEYS:
          surveyRoles = f.userGroupFunctions;
          break;
        default:
          break;
        // Do nothing
      }
    });
    yield put(authAction.setQuestionBankAuthorization(questionBankRoles));
    yield put(authAction.setUserAuthorization(userRoles));
    yield put(authAction.setUserGroupAuthorization(userGroupsRoles));
    yield put(authAction.setSurveyAuthorization(surveyRoles));
    yield put(authAction.setIsLoading(false));
  } catch (error) {
    console.log(error instanceof Error ? error.message : ERROR_SERVER);
  } finally {
    yield put(appAction.setAppLoading(false));
  }
}

function* implementSetUserInfo(action: PayloadAction<LoginDataType>) {
  const data = action.payload;
  setLocalStorage(ACCESS_TOKEN, data?.accessToken ?? '');
  yield put(appAction.setAppLoading(true));
  yield put(authAction.setLoginData(data));
  yield put(authAction.setIsAuth(true));
}

function* authSaga() {
  yield takeLatest(authAction.takeLoginData.type, implementSetUserInfo);
  yield takeLatest(authAction.takeAuthorization.type, implementSetUserAuthorization);
}

export default authSaga;
