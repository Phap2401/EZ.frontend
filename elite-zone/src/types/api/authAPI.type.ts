import { IResponseData } from './global.type';

export interface IResponseRefreshToken extends IResponseData {
  data: {
    accessToken: string;
  };
}
