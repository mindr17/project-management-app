export interface IResponseUser {
  _id: string;
  name: string;
  login: string;
}

export interface IFormData {
  name: string;
  login: string;
  password: string;
}

export interface IUpdateUser {
  token: string;
  id: string;
  formData: IFormData;
}

export interface ICreateToken {
  login: string;
  password: string;
}

export interface IKnownError {
  message: string;
  statusCode: number;
}

export interface ITokenAndId {
  token: string;
  id: string;
}

export interface IinitialStateAuth {
  user: IResponseUser | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  isDelete: boolean;
  token: string;
}
