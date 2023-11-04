interface IParamErrorResponse {
  typeError: string;
  paramsError: string[];
}

export interface IResponseData {
  success: boolean;
  message: string;
  error: IParamErrorResponse | null;
}
