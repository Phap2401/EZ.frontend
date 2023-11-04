import axios, { AxiosError } from 'axios';

type JwtPayloadType = any;
export const decodeJwt = (token: string): JwtPayloadType => {
  if (!token) return null;
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
};

export const Logout = () => {
  localStorage.removeItem('accessToken');
  const hostOrigin = window.location.origin;
  window.location.href = hostOrigin;
};

export const isObject = (obj: any) => {
  return obj != null && obj?.constructor?.name === 'Object';
};

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  return axios.isAxiosError(error);
};
