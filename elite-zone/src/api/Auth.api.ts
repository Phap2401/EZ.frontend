import ApiClient from './ApiClient';

import { IResponseRefreshToken } from '~/types/api/authAPI.type';

export const refreshTokenApi = async (): Promise<{ data: IResponseRefreshToken }> => {
  return ApiClient.get('/refreshToken', {}, {});
};
