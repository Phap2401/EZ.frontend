import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';
import moment from 'moment';
import { decodeJwt, Logout } from '~/utils/helperFunctions';

// Create an Axios instance with a default base URL
const api = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_HOST}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = ApiClient.getToken();
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      Logout();
    }
    return Promise.reject(error);
  }
);

export type QueryObject =
  | string
  | null
  | undefined
  | { [key: string]: string | number | boolean | null };

const ApiClient = {
  getToken: function () {
    const timeNow = moment();
    //get Token from localStorage
    // const accessToken = localStorage.getItem('token');
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIwMDAxIiwidXNlck5hbWUiOiJBbmggVHXhuqVuIDEiLCJwaG9uZSI6IjA4MjYxNjgxNzgiLCJlbWFpbCI6InR1YW5wNjkwNUBnbWFpbC5jb20iLCJyb2xlIjp7fSwiaWF0IjoxNjk3OTY0Mjg5LCJleHAiOjE2OTc5Njc4ODl9.fgCH7hPapBubH78Wwff7hb2pA5S-d2Jwx5OfrDNXPuY'
    if (!accessToken) {
      Logout(); // function to log out the user
      return '';
    }
    //access token get from API login
    const expiredTokenAPI = decodeJwt(accessToken)?.exp;
    const isTokenExpired = moment.unix(expiredTokenAPI ?? 0).isBefore(timeNow);
    if (!isTokenExpired) {
      return `Bearer ${accessToken}`;
    } else {
      Logout(); // function to log out the user
      return '';
    }
  },
  convertQuery: function (url: string, query: QueryObject) {
    if (!query) return url;
    if (typeof query === 'string') return `${url}?${query}`;
    if (typeof query === 'object' && Object.keys(query).length === 0)
      return `${url}?${stringify(query)}`;
    return url;
  },
  getNoHeader: async function (
    url: string,
    params: object,
    query?: QueryObject
  ): Promise<AxiosResponse> {
    const requestUrl = this.convertQuery(url, query);
    const response = await api.get(requestUrl, {
      params,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {},
    });
    return response;
  },
  getHeaders: async function (contentType = 'application/x-www-form-urlencoded') {
    return {
      'Content-Type': contentType,
      authorization: await this.getToken(),
    };
  },
  convertToPostData: function (obj: any, form: any, namespace: any) {
    const fd = form || new URLSearchParams();
    let formKey;

    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        if (namespace) {
          if (!isNaN(Number(property))) {
            formKey = `${namespace}[${property}]`;
          } else {
            formKey = `${namespace}.${property}`;
          }
        } else {
          formKey = property;
        }

        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        } else if (
          Array.isArray(obj[property]) &&
          obj[property].every((item: any) => item instanceof File)
        ) {
          for (const i of Object.keys(obj[property])) {
            fd.append(formKey, obj[property][i]);
          }
        } else if (
          typeof obj[property] === 'object' &&
          !(obj[property] instanceof File) &&
          !(obj[property] instanceof Blob)
        ) {
          this.convertToPostData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }
      }
    }

    return fd;
  },
  get: async function (url: string, params: object, query?: QueryObject): Promise<AxiosResponse> {
    const requestUrl = this.convertQuery(url, query);
    const response = await api.get(requestUrl, {
      params,
      headers: await this.getHeaders(),
      data: {},
    });
    return response;
  },
  getJsonData: async function (
    url: string,
    params: object,
    query?: QueryObject
  ): Promise<AxiosResponse> {
    const requestUrl = this.convertQuery(url, query);
    const response = await api.get(requestUrl, {
      params,
      headers: await this.getHeaders('application/json'),
      data: {},
    });
    return response;
  },
  post: async function (
    url: string,
    query: QueryObject,
    params: any,
    appendUrl?: string
  ): Promise<AxiosResponse> {
    let requestUrl = `${url}?${stringify(query)}${appendUrl || ''}`;
    const config: AxiosRequestConfig = {
      headers: await this.getHeaders(),
    };
    const param = this.convertToPostData(params, undefined, undefined);
    const response = await api.post(requestUrl, param, config);
    return response;
  },
  postJsonData: async function (
    url: string,
    query: QueryObject,
    params: any,
    extraConfig?: Partial<AxiosRequestConfig>
  ): Promise<AxiosResponse> {
    const requestUrl = this.convertQuery(url, query);
    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
      ...extraConfig,
    };
    const response = await api.post(requestUrl, params, config);
    return response;
  },
  postJsonDataNoHeader: async function (
    url: string,
    query: QueryObject,
    params: any,
    extraConfig?: Partial<AxiosRequestConfig>
  ): Promise<AxiosResponse> {
    const requestUrl = this.convertQuery(url, query);
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...extraConfig,
    };
    const response = await api.post(requestUrl, params, config);
    return response;
  },
  putJsonData: async function (
    url: string,
    query: QueryObject,
    params: any
  ): Promise<AxiosResponse> {
    const requestUrl = this.convertQuery(url, query);
    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
    };
    const response = await api.put(requestUrl, params, config);
    return response;
  },
  delete: async function (url: string, params: any): Promise<AxiosResponse> {
    let requestUrl = `${url}?${stringify(params)}`;
    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
    };
    const response = await api.delete(requestUrl, config);
    return response;
  },
};

export default ApiClient;
