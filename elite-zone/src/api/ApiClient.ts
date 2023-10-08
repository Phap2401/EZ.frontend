import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

import { stringify } from 'qs'
import moment from 'moment'
import { decodeJwt } from '~/utils/helperFunctions'

const domainUrl = `${import.meta.env.VITE_REACT_APP_API_HOST}/api`

export type QueryObject = { [key: string]: string | number | boolean | null }

export default class ApiClient {
  /**
   *
   * @param url
   * @param params
   */
  static async get(
    url: string,
    params: object,
    query?: undefined | { [key: string]: string | boolean | null } | string
  ): Promise<AxiosResponse> {
    let requestUrl = query ? `${url}?${stringify(query)}` : url
    if (typeof query === 'string') {
      requestUrl = `${url}${query}`
    }
    console.log('domainUrl', domainUrl)
    const response = await axios.get(domainUrl + requestUrl, {
      params,
      headers: await this.getHeaders(),
      data: {}
    })
    return response
  }

  static async getNoHeader(
    url: string,
    params: object,
    query?: undefined | { [key: string]: string | boolean | null } | string
  ): Promise<AxiosResponse> {
    let requestUrl = query ? `${url}?${stringify(query)}` : url
    if (typeof query === 'string') {
      requestUrl = `${url}${query}`
    }
    const response = await axios.get(domainUrl + requestUrl, {
      params,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {}
    })
    return response
  }

  static async getHeaders(contentType = 'application/x-www-form-urlencoded') {
    return {
      'Content-Type': contentType,
      authorization: await this.getToken()
    }
  }

  private static async getToken() {
    const timeClear = 5 // as minutes
    const timeNow = moment()
    //get Token from user info
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    if (!accessToken) {
      // await logOut();// function logout user
      return ''
    }
    //access token get from API login
    const expiredTokenAPI = decodeJwt(accessToken)?.exp
    const isCountExpiredAPITime = moment.duration(moment.unix(expiredTokenAPI ?? 0).diff(timeNow)).asMinutes()
    if (isCountExpiredAPITime > timeClear) {
      return `Bearer ${accessToken}`
    } else {
      //await logOut();// function logout user
      return ''
    }
  }

  private static convertToPostData(obj: any, form: any, namespace: any) {
    const fd = form || new URLSearchParams()
    let formKey

    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (namespace) {
          if (!isNaN(Number(property))) {
            formKey = `${namespace}[${property}]`
          } else {
            formKey = `${namespace}.${property}`
          }
        } else {
          formKey = property
        }

        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString())
        } else if (obj[property] instanceof Array<File>) {
          for (const i of Object.keys(obj[property])) {
            fd.append(formKey, obj[property][i])
          }
        } else if (
          typeof obj[property] === 'object' &&
          !(obj[property] instanceof File) &&
          !(obj[property] instanceof Blob)
        ) {
          this.convertToPostData(obj[property], fd, formKey)
        } else {
          fd.append(formKey, obj[property])
        }
      }
    }

    return fd
  }

  static async post(url: string, query: QueryObject, params: any, appendUrl?: string): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}${appendUrl || ''}`

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders()
    }

    const param = this.convertToPostData(params, undefined, undefined)
    const response = await axios.post(domainUrl + requestUrl, param, config)
    return response
  }

  static async getJsonData(
    url: string,
    params: object,
    query?: undefined | { [key: string]: string | boolean } | string
  ): Promise<AxiosResponse> {
    let requestUrl = query ? `${url}?${stringify(query)}` : url
    if (typeof query === 'string') {
      requestUrl = `${url}${query}`
    }
    const response = await axios.get(domainUrl + requestUrl, {
      params,
      headers: await this.getHeaders('application/json'),
      data: {}
    })
    return response
  }

  static async postJsonData(
    url: string,
    query: QueryObject,
    params: any,
    extraConfig?: Partial<AxiosRequestConfig>
  ): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
      ...extraConfig
    }

    const response = await axios.post(domainUrl + requestUrl, params, config)
    return response
  }

  static async postJsonDataNoHeader(
    url: string,
    query: QueryObject,
    params: any,
    extraConfig?: Partial<AxiosRequestConfig>
  ): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json'
      },
      ...extraConfig
    }

    const response = await axios.post(domainUrl + requestUrl, params, config)
    return response
  }

  static async putJsonData(url: string, query: QueryObject, params: any): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json')
    }

    const response = await axios.put(domainUrl + requestUrl, params, config)
    return response
  }

  static async delete(url: string, params: any): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(params)}`
    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json')
    }
    const response = await axios.delete(domainUrl + requestUrl, config)
    return response
  }

  static async postMutipartData(url: string, query: QueryObject, params: any): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`
    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('multipart/form-data')
    }
    const form = new FormData()
    const param = this.convertToPostData(params, form, undefined)

    const response = await axios.post(domainUrl + requestUrl, param, config)

    return response
  }

  static async downloadExcelPost(
    url: string,
    query: undefined | { [key: string]: string | boolean } | string,
    params: object,
    fileName = 'excel_table',
    isFinished = true
  ): Promise<AxiosResponse> {
    let requestUrl = query ? `${url}?${stringify(query)}` : url
    if (typeof query === 'string') {
      requestUrl = `${url}${query}`
    }
    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
      responseType: 'blob'
    }

    const response = await axios.post(domainUrl + requestUrl, params, config)
    if (isFinished) {
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      // saveAs(blob, fileName)
    }
    return response
  }

  static async downloadExcelGet(
    url: string,
    params: object,
    query?: undefined | { [key: string]: string | boolean } | string,
    fileName?: string
  ) {
    let requestUrl = query ? `${url}?${stringify(query)}` : url
    if (typeof query === 'string') {
      requestUrl = `${url}${query}`
    }
    const response = await axios.get(domainUrl + requestUrl, {
      params,
      headers: await this.getHeaders('application/xlsx'),
      responseType: 'blob',
      data: {}
    })

    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    // saveAs(blob, fileName)
    return response
  }

  static async downloadExcelGetXlsm(
    url: string,
    params: object,
    query?: undefined | { [key: string]: string | boolean | number } | string,
    fileName?: string
  ) {
    let requestUrl = query ? `${url}?${stringify(query)}` : url
    if (typeof query === 'string') {
      requestUrl = `${url}${query}`
    }
    const response = await axios.get(domainUrl + requestUrl, {
      params,
      headers: await this.getHeaders('application/vnd.ms-excel'),
      responseType: 'blob',
      data: {}
    })

    const blob = new Blob([response.data], {
      type: 'application/vnd.ms-excel'
    })
    // saveAs(blob, fileName)
    return response
  }

  static async uploadFileExcelPostMutipartData(
    url: string,
    query: QueryObject,
    params: any,
    option?: any
  ): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`
    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('multipart/form-data'),
      onUploadProgress: option?.onUploadProgress
    }
    const response = await axios.post(domainUrl + requestUrl, params, config)

    return response
  }
}
