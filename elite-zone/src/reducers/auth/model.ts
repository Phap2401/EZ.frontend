import { LoginDataType } from 'types/authType';

export interface IRoleUserGroup {
  functionGroupID: number;
  functionIndex: number;
  functionID: number;
  functionName: string;
  isPermission: boolean;
}
export interface IRoleDetail {
  functionGroupName: string;
  userGroupFunctions: IRoleUserGroup[];
}
export interface IRoleState {
  userGroupID: string;
  userGroupName: string;
  status: boolean;
  functions: IRoleDetail[];
}

export interface AuthState {
  loginData: LoginDataType | null;
  isAuth: boolean;
  questionBankAuthorization: IRoleUserGroup[];
  userAuthorization: IRoleUserGroup[];
  userGroupAuthorization: IRoleUserGroup[];
  surveyAuthorization: IRoleUserGroup[];
  isLoading: boolean;
}
